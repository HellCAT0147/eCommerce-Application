import ECommerceApi from '../../../api/e-commerce-api';
import CartModel from '../model/cart';

class ControllerCart {
  protected model: CartModel;

  protected eCommerceApi: ECommerceApi;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.model = new CartModel(this.eCommerceApi);
  }

  public mouseEvent(e: MouseEvent): void {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    e.preventDefault();
  }

  public async loadCart(): Promise<void> {
    // TODO add method for getting cart await this.model.getCart();
    this.model.getCart();
  }
}

export default ControllerCart;
