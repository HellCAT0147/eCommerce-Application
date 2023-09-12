import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { Pages } from '../../../models/router';

export default class CartView {
  private pageName: string;

  public constructor(pageName: string = Pages.CART) {
    this.pageName = pageName;
  }

  public showMessage(isSuccess?: boolean, message?: string): void {
    const body: HTMLElement | null = document.querySelector(`${Blocks.body}`);
    const oldMessageHolder: HTMLElement | null = document.querySelector(`.${Blocks.prof}__${Elem.mess}`);
    if (oldMessageHolder) {
      oldMessageHolder.classList.remove(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
      const messageText: HTMLElement | null = oldMessageHolder.querySelector(`.${Elem.mess}__${Elem.text}`);
      if (messageText) {
        if (isSuccess) messageText.textContent = `${Titles.SUCCESS_UPDATE}`;
        else if (message) messageText.textContent = `${message}`;
        else messageText.textContent = `${Titles.FAILED_UPDATE}`;
      }
      if (!isSuccess) oldMessageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
    } else {
      const messageHolder: HTMLElement = new Builder('div', '', Blocks.prof, Elem.mess, '').element();
      const messageIcon: HTMLElement = new Builder('div', '', Elem.mess, Elem.image, '').element();
      const messageText: HTMLElement = new Builder('div', '', Elem.mess, Elem.text, '').element();
      if (isSuccess) {
        messageText.textContent = `${Titles.SUCCESS_UPDATE}`;
      } else if (message) {
        messageText.textContent = `${message}`;
        messageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
      } else {
        messageText.textContent = `${Titles.FAILED_UPDATE}`;
        messageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
      }

      messageHolder.append(messageIcon, messageText);
      if (body) body.appendChild(messageHolder);
      if (messageHolder) {
        setTimeout(() => {
          messageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
          messageHolder.classList.remove(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
        }, 1500);
      }
    }

    setTimeout(() => {
      if (oldMessageHolder) {
        oldMessageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
        oldMessageHolder.classList.remove(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
      }
    }, 1500);
  }

  private createProductsList(): HTMLElement {
    const article: HTMLElement = new Builder('article', '', Blocks.cart, Elem.article, '').element();
    const productsList: HTMLElement = new Builder('div', '', Blocks.cart, Elem.list, '').element();
    const listHeader: HTMLElement = new Builder('div', '', Blocks.cart, Elem.header, '').element();
    const product: HTMLElement = new Builder('', '', Blocks.cart, Elem.product, '').p();
    const price: HTMLElement = new Builder('', '', Blocks.cart, Elem.price, '').p();
    const quantity: HTMLElement = new Builder('', '', Blocks.cart, Elem.quantity, '').p();
    const total: HTMLElement = new Builder('', '', Blocks.cart, Elem.total, '').p();

    product.textContent = `${Elem.product}`.toUpperCase();
    price.textContent = `${Elem.price}`.toUpperCase();
    quantity.textContent = `${Elem.quantity}`.toUpperCase();
    total.textContent = `${Elem.total}`.toUpperCase();

    listHeader.append(product, price, quantity, total);
    productsList.appendChild(listHeader);
    article.appendChild(productsList);

    return article;
  }

  private createOrderField(order: HTMLElement): void {
    const fieldsMode: string[] = [Mode.subtotal, Mode.tax, Mode.total];

    fieldsMode.forEach((mode) => {
      const field: HTMLElement = new Builder('div', '', Blocks.order, Elem.field, mode).element();
      const text: HTMLElement = new Builder('div', '', Blocks.order, Elem.text, mode).element();
      const amount: HTMLElement = new Builder('div', '', Blocks.order, Elem.amount, mode).element();
      // TODO get amount from API;
      text.textContent = `${mode}`;
      amount.textContent = `0.00 ${Titles.CURRENCY}`;

      field.append(text, amount);
      order.appendChild(field);
    });
  }

  private createAside(): HTMLElement {
    const aside: HTMLElement = new Builder('aside', '', Blocks.cart, Elem.aside, '').element();
    const promo: HTMLElement = new Builder('div', '', Blocks.cart, Elem.promo, '').element();
    const fieldPromo: HTMLFieldSetElement = new Builder('', '', Blocks.cart, Elem.field, '').field();
    const label: HTMLLabelElement = new Builder('', '', Blocks.cart, Elem.label, '').label();
    const input: HTMLInputElement = new Builder('', '', Blocks.cart, Elem.input, '').input();
    const buttonPromo: HTMLButtonElement = new Builder(
      '',
      Base.btns_colored,
      Blocks.cart,
      Elem.btn,
      Mode.promo
    ).button();
    label.textContent = `${Titles.PROMO}`;
    input.setAttribute('placeholder', `${Titles.INPUT_PROMO}`);

    const order: HTMLElement = new Builder('div', '', Blocks.cart, Elem.order, '').element();
    this.createOrderField(order);
    const buttonOrder: HTMLButtonElement = new Builder(
      '',
      Base.btns_colored,
      Blocks.cart,
      Elem.btn,
      Mode.order
    ).button();

    fieldPromo.append(label, input, buttonPromo);
    promo.appendChild(fieldPromo);
    order.appendChild(buttonOrder);
    aside.append(promo, order);

    return aside;
  }

  private fillProductsList(productsList: HTMLElement): void {
    const item: HTMLElement = new Builder('section', '', Blocks.cart, Elem.item, '').element();
    // TODO implement method for adding products to list;

    productsList.appendChild(item);
  }

  public showCart(): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.CART}`);
    if (main) {
      const productsList: HTMLElement = this.createProductsList();
      this.fillProductsList(productsList);
      const aside: HTMLElement = this.createAside();

      main.append(productsList, aside);
    }
  }
}
