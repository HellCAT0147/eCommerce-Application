import { Cart, ErrorObject } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import CartView from '../view/view';

export default class CartModel {
  protected view: CartView;

  protected eCommerceApi: ECommerceApi;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new CartView();
  }

  public async getCart(): Promise<void> {
    try {
      const response: Cart | ErrorObject = await this.eCommerceApi.getActiveCart();
      if ('message' in response && 'code' in response) {
        // TODO this.view.showError(response.message);
      } else this.view.showCart(response);
    } catch (error) {
      if (error instanceof Error) {
        // TODO call the view method to display the error message
      }
    }
  }
}
