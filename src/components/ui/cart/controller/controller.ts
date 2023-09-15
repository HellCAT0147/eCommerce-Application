import ECommerceApi from '../../../api/e-commerce-api';
import { Elem, Mode } from '../../../models/builder';
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
    const targetHtmlElement: HTMLElement | null = target;
    if (targetHtmlElement.closest(`.${Elem.cart}__${Elem.btn}_${Mode.promo}`)) this.model.setPromoCode();
    if (targetHtmlElement.closest(`.${Elem.cart}__${Elem.edit}_${Mode.del}`))
      this.model.removeItem(targetHtmlElement.closest(`.${Elem.cart}__${Elem.item}`), targetHtmlElement);
    if (targetHtmlElement.closest(`.${Elem.cart}__${Elem.btn}_${Mode.inc}`))
      this.model.increase(targetHtmlElement.closest(`.${Elem.cart}__${Elem.item}`), targetHtmlElement);
    if (targetHtmlElement.closest(`.${Elem.cart}__${Elem.btn}_${Mode.dec}`))
      this.model.decrease(targetHtmlElement.closest(`.${Elem.cart}__${Elem.item}`), targetHtmlElement);
    e.preventDefault();
  }

  public async loadCart(): Promise<void> {
    // TODO add method for getting cart await this.model.getCart();
    this.model.getCart();
  }

  public checkField(input: HTMLInputElement): void {
    const amount: number = +input.value;
    this.model.setQuantity(input.closest('.cart__item'), amount);
  }
}

export default ControllerCart;
