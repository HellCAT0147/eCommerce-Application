import { ErrorObject, Product } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ViewCatalog from '../view/view';

export default class ModelCatalog {
  protected eCommerceApi: ECommerceApi;

  protected view: ViewCatalog;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new ViewCatalog();
  }

  public async fetchProduct(key: string, preResponse: Product | ErrorObject): Promise<void> {
    if (preResponse) {
      this.view.showProduct(preResponse.masterData.current);
      return;
    }
    try {
      const response: Product | ErrorObject = await this.eCommerceApi.getProduct(key);
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else this.view.showProduct(response.masterData.current);
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }
}
