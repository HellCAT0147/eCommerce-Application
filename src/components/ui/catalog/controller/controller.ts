import { ErrorObject, Product } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ModelCatalog from '../model/model';

class ControllerCatalog {
  protected eCommerceApi: ECommerceApi;

  protected model: ModelCatalog;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.model = new ModelCatalog(this.eCommerceApi);
  }

  public mouseEvent(e: MouseEvent): void {
    e.preventDefault();
    // TODO connect specific card mouseClick.
    // TODO Determine whether event.target is a product card, if so, execute the fetchProduct(key) method.
  }

  public loadProduct(key: string, response: Product | ErrorObject): void {
    // TODO load a specific product card when navigating through the browser bar.
    this.model.fetchProduct(key, response);
  }
}

export default ControllerCatalog;
