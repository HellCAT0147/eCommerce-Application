import { Customer, ErrorObject } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ViewProfile from '../view/view';

class ModelProfile {
  protected eCommerceApi: ECommerceApi;

  protected view: ViewProfile;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new ViewProfile();
  }

  public async getProfile(): Promise<void> {
    try {
      const response: Customer | ErrorObject = await this.eCommerceApi.getCustomer();
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else this.view.showProfile(response);
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }
}

export default ModelProfile;
