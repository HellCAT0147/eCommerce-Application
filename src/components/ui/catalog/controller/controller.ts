import { ErrorObject, Product } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ModelCatalog from '../model/model';
import Pagination from '../../../models/pagination';
import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import ViewCatalog from '../view/view';

class ControllerCatalog {
  protected eCommerceApi: ECommerceApi;

  private currentPagination: Pagination = new Pagination();

  protected model: ModelCatalog;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.model = new ModelCatalog(this.eCommerceApi);

    document.addEventListener(ViewCatalog.OnViewChangedEvent.type, () => this.reloadProducts());
  }

  public mouseEvent(e: MouseEvent): void {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    switch (target.tagName) {
      case 'BUTTON':
        if (target.id === ViewCatalog.resetButtonId) {
          this.model.resetProducts();
        }
        if (target.id === ViewCatalog.prevPageButtonId) {
          this.currentPagination = this.currentPagination.prevPage();
          this.loadProducts();
        }
        if (target.id === ViewCatalog.nextPageButtonId) {
          this.currentPagination = this.currentPagination.nextPage();
          this.loadProducts();
        }
        if (target.classList.contains('catalog__button_cart')) {
          const id = target.parentElement?.id;
          if (id) {
            this.addToCart(id);
            this.loadProducts();
            target.setAttribute('disabled', '');
          }
        }
        return;
      case 'INPUT':
        return;
      default:
        e.preventDefault();
        break;
    }

    const img: HTMLImageElement | null = target.closest(`.${Blocks.product}__${Base.img}_${Mode.click}`);
    if (img) this.model.createModal(target);

    const closeBtn: HTMLDivElement | null = target.closest(`.${Blocks.modal}__${Elem.close}`);
    if (closeBtn) this.model.destroyModal(closeBtn);
  }

  public keyboardEnterEvent(e: KeyboardEvent): void {
    const searchInput: HTMLElement | null = document.getElementById('search-input');
    if (e.code === 'Enter' && searchInput && searchInput === document.activeElement) {
      document.getElementById('search-button')?.click();
    }
  }

  public loadProduct(key: string, response: Product | ErrorObject): void {
    // TODO load a specific product card when navigating through the browser bar.
    this.model.fetchProduct(key, response);
  }

  public loadProducts(): void {
    this.model.fetchProducts(this.currentPagination);
  }

  public reloadProducts(): void {
    this.currentPagination = new Pagination();
    this.model.fetchProducts(this.currentPagination, true);
  }

  public addToCart(id: string): void {
    this.eCommerceApi.addNewProduct(id);
  }
}

export default ControllerCatalog;
