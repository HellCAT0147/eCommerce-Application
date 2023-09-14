import { ErrorObject } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import MainView from '../view/view';

export default class MainModel {
  protected view: MainView;

  protected eCommerceApi: ECommerceApi;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new MainView();
  }

  public async getPromoCode(): Promise<void> {
    try {
      // const response: Main | ErrorObject = await this.eCommerceApi.getActiveCart();
      // if ('message' in response && 'code' in response) {
      // TODO this.view.showError(response.message);
      // } else
      this.view.showPromo();
    } catch (error) {
      if (error instanceof Error) {
        // TODO call the view method to display the error message
      }
    }
  }
}
