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
    // TODO connect specific card mouseClick
    const key: string = '1';
    this.model.fetchProduct(key);
  }
}

export default ControllerCatalog;
