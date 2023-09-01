import { Product } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import createHeader from '../../main/view/header';

export default function createTemplateCatalog(isLoggedIn?: boolean, isProduct?: boolean): HTMLElement {
  const body: HTMLBodyElement | null = document.querySelector('body');
  const header: HTMLElement | null = document.querySelector('header');
  const newHeader: HTMLElement = createHeader(isLoggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector('main');

  if (main) {
    main.className = `main main__${Pages.CATALOG}`;
    main.innerHTML = '';
  }

  // if (!isProduct) {
  //   // TODO when you create product cards, assign them an id (key). For example: product2.setAttribute('id', '2');
  //   const product1: HTMLElement = new Builder('span', Base.links, Blocks.catalog, Elem.link, '').element();
  //   product1.textContent = 'Product 1'; // TODO delete this test product
  //   product1.setAttribute('id', '1');
  //   const product2: HTMLElement = new Builder('span', Base.links, Blocks.catalog, Elem.link, '').element();
  //   product2.textContent = 'Product 2'; // TODO delete this test product
  //   product2.setAttribute('id', '2');
  //
  //   const title: HTMLElement = new Builder('h1', Base.titles, Blocks.main, Elem.title, '').element();
  //   title.textContent = `${Titles.CATALOG}`; // TODO remove the id from the title and use it in getProduct via the API
  //
  //   if (main) {
  //     main.append(title, product1, product2);
  //   }
  // }

  return newHeader;
}
