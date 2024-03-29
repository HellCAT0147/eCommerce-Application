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
          break;
        }
        if (target.id === ViewCatalog.prevPageButtonId) {
          this.currentPagination = this.currentPagination.prevPage();
          this.loadProducts();
          break;
        }
        if (target.id === ViewCatalog.nextPageButtonId) {
          this.currentPagination = this.currentPagination.nextPage();
          this.loadProducts();
          break;
        }
        if (target.classList.contains('catalog__button-cart_add')) {
          let id: string | undefined;
          if (target.parentElement?.id) id = target.parentElement?.id;
          else {
            const wrapper = target.closest('.product__wrapper_body');
            if (wrapper) id = wrapper.id;
          }
          if (id) this.model.addToCart(id);
        }
        if (target.classList.contains('catalog__button-cart_remove')) {
          let id: string | undefined;
          if (target.parentElement?.id) id = target.parentElement?.id;
          else {
            const wrapper = target.closest('.product__wrapper_body');
            if (wrapper) id = wrapper.id;
          }
          if (id) this.model.removeFromCart(id);
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
    this.model.fetchProduct(key, response);
  }

  public loadProducts(): void {
    this.model.fetchProducts(this.currentPagination);
  }

  public reloadProducts(): void {
    this.currentPagination = new Pagination();
    this.model.fetchProducts(this.currentPagination, true);
  }
}

export default ControllerCatalog;
