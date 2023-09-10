import { Base, Blocks, Elem, Mode } from '../../../models/builder';
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

  if (isLoggedIn) {
    navigation.append(signOutButton, profileButton);
  } else {
    navigation.append(signButton, createButton);
  }

  return navigation;
}
