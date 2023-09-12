import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';

export default function createNavigation(isLoggedIn?: boolean): HTMLElement {
  const navigation: HTMLElement = new Builder('nav', '', Blocks.header, Elem.nav, '').element();
  const signButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.sign).redirect();
  const profileButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.prof).redirect();
  const signOutButton: HTMLElement = new Builder(
    '',
    Base.btns_empty,
    Blocks.header,
    Elem.btn,
    Mode.sign_out
  ).redirect();
  const createButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.create).redirect();
  const cartButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.cart).redirect();
  const bag: HTMLElement = new Builder('span', '', Blocks.header, Elem.bag, '').element();
  const shopping: HTMLElement = new Builder('div', '', Blocks.header, Elem.shopping, '').element();
  const shoppingText: HTMLParagraphElement = new Builder('', '', Blocks.header, Elem.text, '').p();
  const quantity: HTMLParagraphElement = new Builder('', '', Blocks.header, Elem.quantity, '').p();

  shoppingText.textContent = Titles.SHOP_CART;

  shopping.append(shoppingText, quantity);
  cartButton.append(bag, shopping);

  if (isLoggedIn) {
    navigation.append(signOutButton, profileButton);
  } else {
    navigation.append(signButton, createButton);
  }

  navigation.appendChild(cartButton);

  return navigation;
}
