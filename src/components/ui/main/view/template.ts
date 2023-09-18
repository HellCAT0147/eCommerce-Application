import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
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
  const footer: HTMLElement = new Builder('footer', '', Blocks.footer, '', '').element();
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
    main.className = `main main__${Pages.MAIN}`;
    main.innerHTML = '';
  }

  const promo: HTMLElement = createPromo(Mode.promo);
  const banner: HTMLElement = createPromo(Mode.banner);
  const linksContainer: HTMLElement = new Builder('section', '', Blocks.main, Elem.container, Mode.link).element();
  const linkLogin: HTMLAnchorElement = new Builder('', Base.links, Blocks.main, Elem.link, Mode.login).a();
  const linkRegistration: HTMLElement = new Builder('', Base.links, Blocks.main, Elem.link, Mode.reg).a();
  const linkProfile: HTMLElement = new Builder('', Base.links, Blocks.main, Elem.link, Mode.prof).a();

  if (main) {
    linksContainer.append(linkLogin, linkRegistration, linkProfile);
    main.append(promo, banner, linksContainer);
  }

  return body || null;
}

export { createTemplate, createTemplateMain };
