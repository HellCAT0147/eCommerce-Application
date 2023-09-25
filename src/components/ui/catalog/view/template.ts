import { Blocks, Elem } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import createHeader from '../../main/view/header';

export default function createTemplateCatalog(isLoggedIn?: boolean): HTMLElement {
  const body: HTMLBodyElement | null = document.querySelector('body');
  const header: HTMLElement | null = document.querySelector('header');
  const newHeader: HTMLElement = createHeader(isLoggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector('main');
  const loader: HTMLElement = new Builder('span', '', Blocks.main, Elem.loader, '').element();

  if (main) {
    main.className = `main main__${Pages.CATALOG}`;
    main.innerHTML = '';
    main.appendChild(loader);
  }

  return newHeader;
}
