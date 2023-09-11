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
      // TODO add method for getting cart
      // const response: ErrorObject | true = await this.eCommerceApi.login(this.mail, this.password);
      // if (response === true) {
      // TODO this.view.showCart();
      // } else {
      //   this.formView.reminder(response.message);
      // }
    } catch (error) {
      if (error instanceof Error) {
        // TODO call the view method to display the error message
      }
    }
  }
}
