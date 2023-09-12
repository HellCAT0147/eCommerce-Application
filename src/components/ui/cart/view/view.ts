import { Price, ProductData } from '@commercetools/platform-sdk';
import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
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

  private createProductsList(data: ProductData): HTMLElement {
    const article: HTMLElement = new Builder('article', '', Blocks.cart, Elem.article, '').element();
    const productsList: HTMLElement = new Builder('div', '', Blocks.cart, Elem.list, '').element();
    const listHeader: HTMLElement = new Builder('div', '', Blocks.cart, Elem.header, '').element();
    const product: HTMLElement = new Builder('', '', Blocks.cart, Elem.product, '').p();
    const price: HTMLElement = new Builder('', '', Blocks.cart, Elem.price, '').p();
    const quantity: HTMLElement = new Builder('', '', Blocks.cart, Elem.quantity, '').p();
    const total: HTMLElement = new Builder('', '', Blocks.cart, Elem.total, '').p();
    const edit: HTMLElement = new Builder('', '', Blocks.cart, Elem.edit, '').p();
    const control: HTMLElement = new Builder('div', '', Blocks.cart, Elem.control, '').element();
    const buttonClear: HTMLButtonElement = new Builder(
      '',
      Base.btns_bordered,
      Blocks.cart,
      Elem.btn,
      Mode.clear
    ).button();
    buttonClear.textContent = Buttons.CLEAR_CART;

    product.textContent = `${Elem.product}`.toUpperCase();
    price.textContent = `${Elem.price}`.toUpperCase();
    quantity.textContent = `${Elem.quantity}`.toUpperCase();
    total.textContent = `${Elem.total}`.toUpperCase();

    listHeader.append(product, price, quantity, total, edit);
    this.fillProductsList(productsList, data);
    control.appendChild(buttonClear);
    article.append(listHeader, productsList, control);

    return article;
  }

  private createOrderField(order: HTMLElement): void {
    const fieldsMode: string[] = [Mode.subtotal, Mode.tax, Mode.total];

    fieldsMode.forEach((mode) => {
      const field: HTMLElement = new Builder('div', '', Blocks.order, Elem.field, mode).element();
      const text: HTMLElement = new Builder('div', '', Blocks.order, Elem.text, mode).element();
      const amount: HTMLElement = new Builder('div', '', Blocks.order, Elem.amount, mode).element();
      // TODO get amount from API;
      if (mode === Mode.subtotal) {
        text.textContent = `${Titles.SUBTOTAL}`;
      } else if (mode === Mode.tax) {
        text.textContent = `${Titles.TAX}`;
      } else if (mode === Mode.total) {
        text.textContent = `${Titles.ORDER}`;
      }
      amount.textContent = `0.00 ${Titles.CURRENCY}`;

      field.append(text, amount);
      order.appendChild(field);
    });
  }

  private createAside(): HTMLElement {
    const aside: HTMLElement = new Builder('aside', '', Blocks.cart, Elem.aside, '').element();
    const promo: HTMLElement = new Builder('div', '', Blocks.cart, Elem.promo, '').element();
    const fieldPromo: HTMLElement = new Builder('div', '', Blocks.cart, Elem.field, '').element();
    const label: HTMLLabelElement = new Builder('', '', Blocks.cart, Elem.label, '').label();
    const input: HTMLInputElement = new Builder('', Base.inputs, Blocks.cart, Elem.input, '').input();
    const buttonPromo: HTMLButtonElement = new Builder(
      '',
      Base.btns_colored,
      Blocks.cart,
      Elem.btn,
      Mode.promo
    ).button();

    label.textContent = `${Titles.PROMO}`;
    input.setAttribute('placeholder', `${Titles.INPUT_PROMO}`);
    buttonPromo.textContent = Buttons.PROMO;

    const order: HTMLElement = new Builder('div', '', Blocks.cart, Elem.order, '').element();
    const fieldOrder: HTMLElement = new Builder('div', '', Blocks.cart, Elem.field, '').element();
    this.createOrderField(fieldOrder);
    const buttonOrder: HTMLButtonElement = new Builder(
      '',
      Base.btns_colored,
      Blocks.cart,
      Elem.btn,
      Mode.order
    ).button();

    buttonOrder.textContent = Buttons.ORDER;

    fieldPromo.append(label, input);
    promo.append(fieldPromo, buttonPromo);
    order.append(fieldOrder, buttonOrder);
    aside.append(promo, order);

    return aside;
  }

  private fillProductsList(productsList: HTMLElement, data: ProductData): void {
    const item: HTMLElement = new Builder('section', '', Blocks.cart, Elem.item, '').element();
    const prices: Price | undefined = data.masterVariant.prices?.[0];
    let src: string = '';
    let title: string = '';
    let basePrice: number;
    let basePriceFormatted: string = '';
    if (!data) return;
    if (data.masterVariant.images) {
      src = data.masterVariant.images[0].url;
    }
    if (data.name) {
      title = data.name['en-US'].toString();
    }
    if (prices !== undefined) {
      basePrice = prices.value.centAmount / 10 ** prices.value.fractionDigits;
      basePriceFormatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(basePrice);
    }

    const product: HTMLElement = new Builder('div', '', Blocks.cart, Elem.product, '').element();
    const img: HTMLElement = new Builder('', '', Blocks.cart, Elem.image, '').img(src, title);
    const name: HTMLElement = new Builder('', '', Blocks.cart, Elem.name, '').p();
    const price: HTMLElement = new Builder('', '', Blocks.cart, Elem.price, Mode.item).p();
    const quantity: HTMLElement = new Builder('div', '', Blocks.cart, Elem.quantity, Mode.item).element();
    const buttonDec: HTMLButtonElement = new Builder('', Base.btns_quant, Blocks.cart, Elem.btn, Mode.dec).button();
    const amount: HTMLElement = new Builder('', '', Blocks.cart, Elem.amount, '').p();
    const buttonInc: HTMLButtonElement = new Builder('', Base.btns_quant, Blocks.cart, Elem.btn, Mode.inc).button();
    const total: HTMLElement = new Builder('', '', Blocks.cart, Elem.total, Mode.item).p();
    const edit: HTMLElement = new Builder('span', '', Blocks.cart, Elem.edit, Mode.del).element();

    name.textContent = title;
    price.textContent = basePriceFormatted;
    buttonDec.textContent = '-';
    amount.textContent = '1';
    buttonInc.textContent = '+';
    buttonInc.classList.add(`${Base.btns}__${Elem.quantity}_${Mode.available}`);
    total.textContent = basePriceFormatted;

    product.append(img, name);
    quantity.append(buttonDec, amount, buttonInc);
    item.append(product, price, quantity, total, edit);
    // TODO implement method for adding products to list;

    productsList.appendChild(item);
  }

  public showCart(data: ProductData): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.CART}`);
    if (main) {
      const wrapper: HTMLElement = new Builder('div', '', Blocks.cart, Elem.wrapper, '').element();
      const productsList: HTMLElement = this.createProductsList(data);
      const aside: HTMLElement = this.createAside();

      wrapper.append(productsList, aside);
      main.append(wrapper);
    }
  }
}
