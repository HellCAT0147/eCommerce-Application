import { Blocks, Mode } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import renderBrands from './brands';
import { createFooter } from './footer';
import createHeader from './header';
import createPromo from './promo';

function createTemplate(): HTMLBodyElement | null {
  const body: HTMLBodyElement | null = document.querySelector('body');
  if (body) {
    body.className = 'body';
    body.innerHTML = '';
  }
  const header: HTMLElement = new Builder('header', '', Blocks.header, '', '').element();
  const main: HTMLElement = new Builder('main', Blocks.main, Blocks.main, Blocks.main, '').element();
  const footer: HTMLElement = createFooter();

  if (body) {
    body.append(header, main, footer);
  }

  return body || null;
}

function createTemplateMain(isLoggedIn?: boolean): HTMLBodyElement | null {
  const body: HTMLBodyElement | null = document.querySelector('body');
  const header: HTMLElement | null = document.querySelector('header');
  const newHeader: HTMLElement = createHeader(isLoggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector('main');

  if (main) {
    main.className = `${Blocks.main} ${Blocks.main}__${Pages.MAIN}`;
    main.innerHTML = '';
  }

  const promo: HTMLElement = createPromo(Mode.promo);
  const brands: HTMLElement = renderBrands();
  const banner: HTMLElement = createPromo(Mode.banner);

  if (main) {
    main.append(promo, brands, banner);
  }

  return body || null;
}

export { createTemplate, createTemplateMain };
