import { Blocks, Elem } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import createNavigation from './navigation';

export default function createHeader(isloggedIn?: boolean): HTMLElement {
  const header: HTMLElement = new Builder('header', '', Blocks.header, '', '').element();
  const logo: HTMLElement = new Builder('a', '', Blocks.header, Elem.logo, '').element();
  logo.setAttribute('href', '/main');
  logo.classList.add('redirect__buttons');
  logo.setAttribute('id', `${Pages.MAIN}`);
  const navigation: HTMLElement = createNavigation(isloggedIn);

  header.append(logo, navigation);

  return header;
}
