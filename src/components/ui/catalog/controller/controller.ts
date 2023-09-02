import { ErrorObject, Product } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ModelCatalog from '../model/model';
import Pagination from '../../../models/pagination';
import { Base, Blocks, Elem } from '../../../models/builder';

class ControllerCatalog {
  protected eCommerceApi: ECommerceApi;

  private currentPagination: Pagination = new Pagination();

  protected model: ModelCatalog;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.model = new ModelCatalog(this.eCommerceApi);
  }

  public mouseEvent(e: MouseEvent): void {
    e.preventDefault();

    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    const img: HTMLImageElement | null = target.closest(`.${Blocks.product}__${Base.img}`);
    if (img) this.model.createModal(target);

    const closeBtn: HTMLDivElement | null = target.closest(`.${Blocks.modal}__${Elem.close}`);
    if (closeBtn) this.model.destroyModal(closeBtn);

    // TODO any mouse events other than clicking on the product card
  }

  public loadProduct(key: string, response: Product | ErrorObject): void {
    // TODO load a specific product card when navigating through the browser bar.
    this.model.fetchProduct(key, response);
  }

  public loadProducts(): void {
    this.model.fetchProducts(this.currentPagination);
  }
}

export default ControllerCatalog;
