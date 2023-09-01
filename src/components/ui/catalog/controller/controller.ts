import ECommerceApi from '../../../api/e-commerce-api';
import eCommerceAPIConfig from '../../../api/e-commerce-api-config-realization';
import ModelCatalog from '../model/model';
import Pagination from '../../../models/pagination';

class ControllerCatalog {
  private eCommerceApi: ECommerceApi;

  private currentPagination: Pagination = new Pagination();

  protected model: ModelCatalog;

  public constructor() {
    this.eCommerceApi = new ECommerceApi(
      eCommerceAPIConfig.projectKey,
      eCommerceAPIConfig.clientId,
      eCommerceAPIConfig.clientSecret,
      eCommerceAPIConfig.region,
      undefined,
      eCommerceAPIConfig.scopes.split(' ')
    );
    this.model = new ModelCatalog(this.eCommerceApi);
  }

  public mouseEvent(e: MouseEvent, key?: string): void {
    // TODO connect specific card mouseClick.
    // TODO Determine whether event.target is a product card, if so, execute the fetchProduct(key) method.
    if (key) this.model.fetchProduct(key);
  }

  public loadProduct(key: string): void {
    // TODO load a specific product card when navigating through the browser bar.
    this.model.fetchProduct(key);
  }

  public loadProducts(): void {
    this.model.fetchProducts(this.currentPagination);
  }
}

export default ControllerCatalog;
