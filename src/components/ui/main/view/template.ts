import { Base, Blocks, Elem, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import createHeader from './header';

export default function createTemplate(isloggedIn?: boolean): HTMLBodyElement | null {
  const body: HTMLBodyElement | null = document.querySelector('body');
  if (body) {
    body.className = 'body';
    body.innerHTML = '';
  }
  const header: HTMLElement = createHeader(isloggedIn);
  const main: HTMLElement = new Builder('main', Blocks.main, Blocks.main, Blocks.main, '').element();
  const title: HTMLElement = new Builder('h1', Base.titles, Blocks.main, Elem.title, '').element();
  title.textContent = `eCommerce - ${Titles.MAIN} Page`;
  const footer: HTMLElement = new Builder('footer', '', Blocks.footer, '', '').element();
  if (body) {
    main.append(title);
    body.append(header, main, footer);
  }

  return body || null;
}
