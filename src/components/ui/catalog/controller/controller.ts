import ECommerceApi from '../../../api/e-commerce-api';
import eCommerceAPIConfig from '../../../api/e-commerce-api-config-realization';
import ModelCatalog from '../model/model';

class ControllerCatalog {
  private eCommerceApi: ECommerceApi;

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

  public mouseEvent(e: MouseEvent): void {
    // TODO any mouse events other than clicking on the product card
  }

  public loadProduct(key: string): void {
    // TODO load a specific product card when navigating through the browser bar.
    this.model.fetchProduct(key);
  }
}

export default ControllerCatalog;
