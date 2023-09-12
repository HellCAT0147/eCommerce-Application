import { ErrorObject, Price, Product, ProductData, ProductProjection } from '@commercetools/platform-sdk';
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

  public async fetchProduct(key: string, preResponse: Product | ErrorObject): Promise<void> {
    if (preResponse) {
      this.prepareProduct(preResponse.masterData.current);
      return;
    }
    try {
      const response: Product | ErrorObject = await this.eCommerceApi.getProduct(key);
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else this.prepareProduct(response.masterData.current);
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }

  private prepareProduct(data: ProductData): void {
    const name: string = data.name['en-US'].toString().toUpperCase();
    const prices: Price | undefined = data.masterVariant.prices?.[0];
    const description: string = data.description?.['en-US'].toString() ?? '';

    let basePrice: number;
    let discountPrice: number;
    let basePriceFormatted: string = '';
    let discountPriceFormatted: string = '';

    if (prices !== undefined) {
      basePrice = prices.value.centAmount / 10 ** prices.value.fractionDigits;
      basePriceFormatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(basePrice);

      if (prices.discounted !== undefined) {
        discountPrice = prices.discounted.value.centAmount / 10 ** prices.discounted.value.fractionDigits;
        discountPriceFormatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
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
      this.eCommerceApi.getCategoriesTree().then((categoriesMap) => {
        if (categoriesMap instanceof Map) {
          this.view.fillCategories(categoriesMap);
        }
      });
      if ('message' in response && 'code' in response) {
        this.view.showError(response.message);
      } else {
        if (justFill) {
          this.view.fillCatalogPage(response);
          this.view.fillPaginationButtons(response);
          return;
        }
        this.view.constructCatalogPage(response);
      }
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
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
}
