import { ErrorObject, Product } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ModelCatalog from '../model/model';
import Pagination from '../../../models/pagination';
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
    const target: HTMLElement = e.target as HTMLElement;
    switch (target.tagName) {
      case 'BUTTON':
        if (target.id === ViewCatalog.resetButtonId) {
          this.model.resetProducts();
        }
        return;
      case 'INPUT':
        return;
      default:
        e.preventDefault();
        break;
    }
    // TODO any mouse events other than clicking on the product card
  }

  public loadProduct(key: string, response: Product | ErrorObject): void {
    // TODO load a specific product card when navigating through the browser bar.
    this.model.fetchProduct(key, response);
  }

  public loadProducts(): void {
    this.model.fetchProducts(this.currentPagination);
  }

  public reloadProducts(): void {
    this.model.fetchProducts(this.currentPagination, true);
  }
}

export default ControllerCatalog;
