import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import { createHamburger } from './hamburger';
import createNavigation from './navigation';

export default function createHeader(isLoggedIn?: boolean): HTMLElement {
  const header: HTMLElement = new Builder('header', '', Blocks.header, '', '').element();
  const logo: HTMLElement = new Builder('a', '', Blocks.header, Elem.logo, '').element();
  logo.setAttribute('href', '/main');
  logo.classList.add('redirect__buttons');
  logo.setAttribute('id', `${Pages.LOGO_MAIN}`);
  const navigationStatic: HTMLElement = new Builder('nav', '', Blocks.header, Elem.nav, Mode.static).element();
  const homeButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.main).redirect();
  const catalogButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.catalog).redirect();
  const aboutUsButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.about).redirect();
  const navigation: HTMLElement = createNavigation(isLoggedIn);
  const hamburger: HTMLElement = createHamburger();

  navigationStatic.append(homeButton, catalogButton, aboutUsButton);
  header.append(logo, navigationStatic, navigation, hamburger);

  return header;
}
