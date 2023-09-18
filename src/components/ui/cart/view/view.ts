import { Cart, LineItem, Price, TypedMoney } from '@commercetools/platform-sdk';
import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { Pages } from '../../../models/router';
import { DataOrder } from '../../../models/commerce';

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

  private createProductsList(listItem: LineItem[]): HTMLElement {
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
    if (!listItem.length) {
      const linkCatalog: HTMLAnchorElement = new Builder('', Base.links, Blocks.cart, Elem.link, Mode.catalog).a();
      linkCatalog.textContent = `${Titles.GO_CATALOG} ${Buttons.CATALOG.toLocaleLowerCase()}.`;
      productsList.textContent = Titles.EMPTY_CART;
      productsList.append(linkCatalog);
    } else {
      this.fillProductsList(productsList, listItem);
    }
    control.appendChild(buttonClear);
    article.append(listHeader, productsList, control);

    return article;
  }

  private createOrderField(order: HTMLElement, orderData: DataOrder): void {
    const fieldsMode: string[] = [Mode.subtotal, Mode.sale, Mode.total];

    fieldsMode.forEach((mode) => {
      const field: HTMLElement = new Builder('div', '', Blocks.order, Elem.field, mode).element();
      const text: HTMLElement = new Builder('div', '', Blocks.order, Elem.text, mode).element();
      const amount: HTMLElement = new Builder('div', '', Blocks.order, Elem.amount, mode).element();
      if (mode === Mode.subtotal) {
        text.textContent = `${Titles.SUBTOTAL}`;
        amount.textContent = orderData.subtotal;
      } else if (mode === Mode.sale) {
        text.textContent = `${Titles.SALE}`;
        amount.textContent = `${orderData.sale}`;
      } else if (mode === Mode.total) {
        text.textContent = `${Titles.ORDER}`;
        amount.textContent = orderData.total;
      }

      field.append(text, amount);
      order.appendChild(field);
    });
  }

  private createAside(orderData: DataOrder): HTMLElement {
    const aside: HTMLElement = new Builder('aside', '', Blocks.cart, Elem.aside, '').element();
    const promo: HTMLElement = new Builder('div', '', Blocks.cart, Elem.promo, '').element();
    const fieldPromo: HTMLElement = new Builder('div', '', Blocks.cart, Elem.field, '').element();
    const label: HTMLLabelElement = new Builder('', '', Blocks.cart, Elem.label, Mode.promo).label();
    const input: HTMLInputElement = new Builder('', Base.inputs, Blocks.cart, Elem.input, Mode.promo).input();
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
    this.createOrderField(fieldOrder, orderData);
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

  private fillPrice(lineItem: LineItem): HTMLElement {
    const prices: Price | undefined = lineItem.variant.prices?.[0];
    let basePrice: number;
    let basePriceFormatted: string = '';
    if (prices !== undefined) {
      basePrice = prices.value.centAmount / 10 ** prices.value.fractionDigits;
      basePriceFormatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(basePrice);
    }
    const price: HTMLElement = new Builder('div', '', Blocks.cart, Elem.price, Mode.item).element();
    const basePice: HTMLElement = new Builder('', '', Blocks.cart, Elem.price, Mode.base).p();
    const promoPrice: HTMLElement = new Builder('', '', Blocks.cart, Elem.price, Mode.promo).p();

    basePice.textContent = basePriceFormatted;

    const { length } = lineItem.discountedPricePerQuantity;
    if (length) {
      const discount: TypedMoney = lineItem.discountedPricePerQuantity[0].discountedPrice.value;

      if (discount !== undefined) {
        let discPrice: number;
        let discPriceFormatted: string = '';
        if (prices !== undefined) {
          discPrice = discount.centAmount / 10 ** discount.fractionDigits;
          discPriceFormatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(discPrice);

          promoPrice.textContent = discPriceFormatted;
          basePice.classList.add(Mode.cross);
        }
      }
    }

    price.append(basePice, promoPrice);

    return price;
  }

  private renderItem(productsList: HTMLElement, lineItem: LineItem): void {
    const key: string | undefined = lineItem.productKey?.split(`-`)[1];
    const item: HTMLElement = new Builder('section', '', Blocks.cart, Elem.item, '').element();
    if (key) item.setAttribute('data-key', key);

    const totalPrice: number = lineItem.totalPrice.centAmount / 10 ** lineItem.totalPrice.fractionDigits;
    let src: string = '';
    let title: string = '';

    let totalPriceFormatted: string = '';
    if (!lineItem) return;
    if (lineItem.variant.images) src = lineItem.variant.images[0].url;
    if (lineItem.name) title = lineItem.name['en-US'].toString();

    if (totalPrice !== undefined) {
      totalPriceFormatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalPrice);
    }
    const product: HTMLElement = new Builder('div', '', Blocks.cart, Elem.product, Mode.item).element();
    const img: HTMLElement = new Builder('', '', Blocks.cart, Elem.image, Mode.item).img(src, title);
    const name: HTMLElement = new Builder('', '', Blocks.cart, Elem.name, Mode.item).p();

    const quantity: HTMLElement = new Builder('div', '', Blocks.cart, Elem.quantity, Mode.item).element();
    const buttonDec: HTMLButtonElement = new Builder('', Base.btns_quant, Blocks.cart, Elem.btn, Mode.dec).button();
    const amount: HTMLInputElement = new Builder('', '', Blocks.cart, Elem.amount, Mode.edit).input();
    const buttonInc: HTMLButtonElement = new Builder('', Base.btns_quant, Blocks.cart, Elem.btn, Mode.inc).button();
    const total: HTMLElement = new Builder('', '', Blocks.cart, Elem.total, Mode.item).p();
    const edit: HTMLElement = new Builder('span', '', Blocks.cart, Elem.edit, Mode.del).element();

    name.textContent = title;
    buttonDec.textContent = '-';

    if (lineItem.quantity > 1) buttonDec.classList.add(`${Base.btns}__${Elem.quantity}_${Mode.available}`);
    amount.value = `${lineItem.quantity}`;
    amount.type = 'number';
    buttonInc.textContent = '+';
    buttonInc.classList.add(`${Base.btns}__${Elem.quantity}_${Mode.available}`);
    total.textContent = totalPriceFormatted;

    const price: HTMLElement = this.fillPrice(lineItem);

    product.append(img, name);
    quantity.append(buttonDec, amount, buttonInc);
    item.append(product, price, quantity, total, edit);

    productsList.appendChild(item);
  }

  private fillProductsList(productsList: HTMLElement, listItem: LineItem[]): void {
    listItem.forEach((lineItem: LineItem) => {
      this.renderItem(productsList, lineItem);
    });
  }

  public showCart(cart: Cart, order: DataOrder): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.CART}`);
    if (main) {
      main.innerHTML = '';
      const wrapper: HTMLElement = new Builder('div', '', Blocks.cart, Elem.wrapper, '').element();
      const productsList: HTMLElement = this.createProductsList(cart.lineItems);
      const aside: HTMLElement = this.createAside(order);

      wrapper.append(productsList, aside);
      main.append(wrapper);
    }
  }

  public changeCursor(target: HTMLElement, isLoading: boolean): void {
    const localTarget: HTMLElement = target;
    if (isLoading) localTarget.style.cursor = 'wait';
    else localTarget.style.cursor = '';
  }

  public toggleOverlay(): void {
    const body: HTMLFormElement | null = document.querySelector(`.${Blocks.body}`);
    if (body) body.classList.toggle(`${Blocks.body}_${Mode.overlay}`);
  }

  public createPopup(): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.CART}`);
    if (main) {
      const popup: HTMLElement = new Builder('div', '', Blocks.cart, Elem.popup, '').element();
      const info: HTMLParagraphElement = new Builder('', '', Blocks.popup, Elem.info, '').p();
      const control: HTMLElement = new Builder('div', '', Blocks.popup, Elem.control, '').element();
      const yesBtn: HTMLButtonElement = new Builder('', Base.btns_colored, Blocks.popup, Elem.btn, Mode.yes).button();
      const noBtn: HTMLButtonElement = new Builder('', Base.btns_empty, Blocks.popup, Elem.btn, Mode.no).button();

      info.textContent = '- "Are you sure about that?", (c) John Cena';
      yesBtn.textContent = 'Yeah!';
      noBtn.textContent = 'Nope';

      control.append(yesBtn, noBtn);
      popup.append(info, control);
      main.appendChild(popup);
    }
  }
}
