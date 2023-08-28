import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import createHamburger from './hamburger';

export default function createNavigation(isloggedIn?: boolean): HTMLElement {
  const navigation: HTMLElement = new Builder('nav', '', Blocks.header, Elem.nav, '').element();
  const catalogButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.catalog).button();
  const signButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.sign).button();
  const signOutButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.sign_out).button();
  const createButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.create).button();
  const hamburger: HTMLElement = createHamburger();

  navigation.append(hamburger, catalogButton);
  if (isloggedIn) {
    navigation.append(signOutButton);
  } else {
    navigation.append(signButton, createButton);
  }

  return navigation;
}
