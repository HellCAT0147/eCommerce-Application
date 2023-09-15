import { Cart, ErrorObject, LineItem, Price } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import CartView from '../view/view';
import { DataOrder } from '../../../models/commerce';
import { Blocks, Elem, Mode } from '../../../models/builder';

export default class CartModel {
  protected view: CartView;

  protected eCommerceApi: ECommerceApi;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new CartView();
  }

  private getOrderData(cart: Cart): DataOrder {
    const order: DataOrder = {
      subtotal: '',
      sale: '',
      total: '',
    };
    let subtotal: number = 0;
    let sale: number = 0;
    let total: number = 0;
    const listItems: LineItem[] = cart.lineItems;
    const { totalPrice } = cart;

    listItems.forEach((lineItem: LineItem) => {
      const price: Price | undefined = lineItem.variant.prices?.[0];
      const { quantity } = lineItem;
      if (price) {
        const basePrice: number = price.value.centAmount / 10 ** price.value.fractionDigits;
        subtotal += basePrice * quantity;
      }
    });

    total = totalPrice.centAmount / 10 ** totalPrice.fractionDigits;
    sale = total - subtotal;

    if (subtotal !== undefined) {
      order.subtotal = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(subtotal);
    }
    if (sale !== undefined) {
      order.sale = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sale);
    }
    if (total !== undefined) {
      order.total = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(total);
    }

    return order;
  }

  public async setPromoCode(): Promise<void> {
    const inputPromo: HTMLInputElement | null = document.querySelector(`.${Blocks.cart}__${Elem.input}_${Mode.promo}`);
    if (!inputPromo) return;
    try {
      const response: Cart | ErrorObject = await this.eCommerceApi.applyPromo(inputPromo.value);
      if ('message' in response && 'code' in response) {
        // TODO this.view.showError(response.message);
      } else {
        const order: DataOrder = this.getOrderData(response);
        this.view.showCart(response, order);
      }
    } catch (error) {
      if (error instanceof Error) {
        // TODO call the view method to display the error message
      }
    }
  }

  public async getCart(): Promise<void> {
    try {
      const response: Cart | ErrorObject = await this.eCommerceApi.getActiveCart();
      if ('message' in response && 'code' in response) {
        // TODO this.view.showError(response.message);
      } else {
        const order: DataOrder = this.getOrderData(response);
        this.view.showCart(response, order);
      }
    } catch (error) {
      if (error instanceof Error) {
        // TODO call the view method to display the error message
      }
    }
  }

  public async removeItem(item: HTMLElement | null, target: HTMLElement): Promise<void> {
    const dataset: DOMStringMap | undefined = item?.dataset;
    const id: string | undefined = dataset?.key;
    if (id === undefined) return;

    delete dataset?.key;
    this.view.changeCursor(target, true);
    const response: Cart | ErrorObject = await this.eCommerceApi.removeCartItem(id);
    if ('message' in response && 'code' in response) {
      // TODO this.view.showError(response.message);
    } else {
      const order: DataOrder = this.getOrderData(response);
      this.view.showCart(response, order);
    }
    if (item) {
      const itemLocal: HTMLElement = item;
      itemLocal.dataset.key = id;
      this.view.changeCursor(target, false);
    }
  }

  public async increase(item: HTMLElement | null, target: HTMLElement): Promise<void> {
    const dataset: DOMStringMap | undefined = item?.dataset;
    const id: string | undefined = dataset?.key;
    if (id === undefined) return;

    delete dataset?.key;
    this.view.changeCursor(target, true);
    const response: Cart | ErrorObject = await this.eCommerceApi.addNewProduct(id);
    if ('message' in response && 'code' in response) {
      // TODO this.view.showError(response.message);
    } else {
      const order: DataOrder = this.getOrderData(response);
      this.view.showCart(response, order);
      // TODO update header cart icon
    }
    if (item) {
      const itemLocal: HTMLElement = item;
      itemLocal.dataset.key = id;
      this.view.changeCursor(target, false);
    }
  }

  public async decrease(item: HTMLElement | null, target: HTMLElement): Promise<void> {
    const dataset: DOMStringMap | undefined = item?.dataset;
    const id: string | undefined = dataset?.key;
    if (id === undefined) return;

    delete dataset?.key;
    this.view.changeCursor(target, true);
    const input: HTMLInputElement | null | undefined = item?.querySelector(
      `.${Elem.cart}__${Elem.amount}_${Mode.edit}`
    );
    const currentAmount: string | undefined = input?.value;
    if (currentAmount !== undefined && +currentAmount > 1) {
      const response: Cart | ErrorObject = await this.eCommerceApi.removeCartItem(id, true);
      if ('message' in response && 'code' in response) {
        // TODO this.view.showError(response.message);
      } else {
        const order: DataOrder = this.getOrderData(response);
        this.view.showCart(response, order);
        // TODO update header cart icon
      }
    }
    if (item) {
      const itemLocal: HTMLElement = item;
      itemLocal.dataset.key = id;
      this.view.changeCursor(target, false);
    }
  }

  public async setQuantity(item: HTMLElement | null, amount: number): Promise<void> {
    const dataset: DOMStringMap | undefined = item?.dataset;
    const id: string | undefined = dataset?.key;
    if (id === undefined) return;

    delete dataset?.key;
    const response: Cart | ErrorObject = await this.eCommerceApi.setCartItemQuantity(id, amount);
    if ('message' in response && 'code' in response) {
      // TODO this.view.showError(response.message);
    } else {
      const order: DataOrder = this.getOrderData(response);
      this.view.showCart(response, order);
      // TODO update header cart icon
    }
    if (item) {
      const itemLocal: HTMLElement = item;
      itemLocal.dataset.key = id;
    }
  }
}
