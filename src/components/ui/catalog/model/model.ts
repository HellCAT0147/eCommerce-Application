import { Cart, ErrorObject, Price, Product, ProductData, ProductProjection } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ViewCatalog from '../view/view';
import ResultPagination from '../../../models/result-pagination';
import Pagination from '../../../models/pagination';
import createQueryStringFromCatalogViewState from '../../../api/products-search-attribute';

export default class ModelCatalog {
  protected eCommerceApi: ECommerceApi;

  protected view: ViewCatalog;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new ViewCatalog();
  }

  private async changeQuantity(): Promise<number> {
    let quantity: number = 0;
    try {
      const response: number | ErrorObject = await this.eCommerceApi.getCartItemsQuantity();
      if (typeof response === 'number') quantity = response;
      else if ('message' in response && 'code' in response) {
        this.view.showMessage(false, response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.view.showMessage(false, error.message);
      }
    }

    this.view.showQuantity(quantity);

    return quantity;
  }

  public async fetchProduct(key: string, preResponse: Product | ErrorObject): Promise<void> {
    const carted = await this.eCommerceApi.isInCart(key);
    if (preResponse && typeof carted === 'boolean') {
      this.prepareProduct(preResponse.masterData.current, carted);
      return;
    }
    try {
      const response: Product | ErrorObject = await this.eCommerceApi.getProduct(key);
      if ('message' in response && 'code' in response) this.view.showMessage(false, response.message);
      else if (typeof carted === 'boolean') this.prepareProduct(response.masterData.current, carted);
    } catch (error) {
      if (error instanceof Error) this.view.showMessage(false, error.message);
    }
  }

  private prepareProduct(data: ProductData, carted: boolean): void {
    const name: string = data.name['en-US'].toString().toUpperCase();
    const prices: Price | undefined = data.masterVariant.prices?.[0];
    const description: string = data.description?.['en-US'].toString() ?? '';

    let basePrice: number;
    let discountPrice: number;
    let basePriceFormatted: string = '';
    let discountPriceFormatted: string = '';

    if (prices !== undefined) {
      basePrice = prices.value.centAmount / 10 ** prices.value.fractionDigits;
      basePriceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(basePrice);

      if (prices.discounted !== undefined) {
        discountPrice = prices.discounted.value.centAmount / 10 ** prices.discounted.value.fractionDigits;
        discountPriceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
          discountPrice
        );
      }
    }

    this.view.showProduct(
      data,
      name,
      basePriceFormatted,
      discountPriceFormatted,
      description,
      carted,
      data.masterVariant.images
    );
  }

  public async fetchProducts(pagination: Pagination = new Pagination(), justFill: boolean = false): Promise<void> {
    try {
      const viewState = this.view.collectData();
      const response: ResultPagination<ProductProjection> | ErrorObject = await this.eCommerceApi.getProducts(
        viewState.sortParameters,
        pagination,
        createQueryStringFromCatalogViewState(viewState),
        viewState.query
      );
      const cartResponse: Cart | ErrorObject = await this.eCommerceApi.getActiveCart();
      this.eCommerceApi.getCategoriesTree().then((categoriesMap) => {
        if (categoriesMap instanceof Map) {
          this.view.fillCategories(categoriesMap);
        }
      });
      if ('message' in cartResponse && 'code' in cartResponse) {
        this.view.showMessage(false, cartResponse.message);
        return;
      }
      if ('message' in response && 'code' in response) {
        this.view.showMessage(false, response.message);
      } else {
        if (justFill) {
          this.view.fillCatalogPage(response, cartResponse);
          this.view.fillPaginationButtons(response);
          this.view.fillSearchInput();
          return;
        }
        this.view.constructCatalogPage(response, cartResponse);
        this.view.fillSearchInput();
      }
    } catch (error) {
      if (error instanceof Error) this.view.showMessage(false, error.message);
    }
  }

  public async resetProducts(): Promise<void> {
    this.view.resetState();
  }

  public createModal(img: EventTarget): void {
    if (img instanceof HTMLImageElement) {
      const slides: HTMLCollection | undefined = img.parentElement?.parentElement?.children;
      if (!slides) return;

      let images: HTMLImageElement[] = Array.from(slides).map((slide) => {
        if (slide.children[0] instanceof HTMLImageElement) return slide.children[0];
        return new Image();
      });
      let clickedImgID: number = 0;
      images = images.filter((image, id) => {
        if (img.src === image.src) clickedImgID = id;
        return image.src !== '';
      });

      this.view.showModal(clickedImgID, images);
      this.view.switchScroll(false);
    }
  }

  public destroyModal(closeBtn: HTMLElement | null): void {
    if (closeBtn) {
      const modal: HTMLElement | null | undefined = closeBtn.parentElement?.parentElement;
      if (modal) this.view.hideModal(modal);
      this.view.switchScroll(true);
    }
  }

  public async addToCart(id: string): Promise<void> {
    try {
      this.view.showAddSpinner(id);
      const result = await this.eCommerceApi.addNewProduct(id);
      if ('message' in result && 'code' in result) {
        this.view.showMessage(false, result.message);
      } else {
        const isSuccessful = result.lineItems !== undefined;
        this.view.hideAddSpinner(id, isSuccessful);
        this.view.updateCartButtons(id, false, true);
        await this.changeQuantity();
      }
    } catch (error) {
      if (error instanceof Error) {
        this.view.showMessage(false, error.message);
      }
    }
  }

  public async removeFromCart(id: string): Promise<void> {
    try {
      this.view.showRemoveSpinner(id);
      const result = await this.eCommerceApi.removeCartItem(id);
      if ('message' in result && 'code' in result) {
        this.view.showMessage(false, result.message);
      } else {
        const isSuccessful = result.lineItems !== undefined;
        this.view.hideRemoveSpinner(id, isSuccessful);
        this.view.updateCartButtons(id, true, false);
        await this.changeQuantity();
      }
    } catch (error) {
      if (error instanceof Error) {
        this.view.showMessage(false, error.message);
      }
    }
  }
}
