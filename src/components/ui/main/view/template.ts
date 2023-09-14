import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import createHeader from './header';

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

  const promoWrapper: HTMLElement = new Builder('section', Base.promo, Blocks.main, Elem.wrapper, '').element();
  const promoContent: HTMLElement = new Builder('div', '', Blocks.promo, Elem.content, Mode.left).element();
  const promoTitle: HTMLElement = new Builder('div', '', Blocks.promo, Elem.title, Mode.main).element();
  const promoTitleFirst: HTMLHeadingElement = new Builder('', '', Blocks.promo, Elem.title, Mode.first).h(1);
  const promoTitleSecond: HTMLHeadingElement = new Builder('', '', Blocks.promo, Elem.title, Mode.second).h(2);
  const promoTitleLast: HTMLHeadingElement = new Builder('', '', Blocks.promo, Elem.title, Mode.last).h(2);
  const promoButton: HTMLElement = new Builder('', Base.btns_bordered, Blocks.promo, Elem.btn, Mode.get_promo).button();
  const linksContainer: HTMLElement = new Builder('section', '', Blocks.main, Elem.container, Mode.link).element();
  const linkLogin: HTMLAnchorElement = new Builder('', Base.links, Blocks.main, Elem.link, Mode.login).a();
  const linkRegistration: HTMLElement = new Builder('', Base.links, Blocks.main, Elem.link, Mode.reg).a();
  const linkProfile: HTMLElement = new Builder('', Base.links, Blocks.main, Elem.link, Mode.prof).a();

  promoTitleFirst.textContent = Titles.PROMO_FIRST;
  promoTitleSecond.textContent = Titles.PROMO_SECOND;
  promoTitleLast.textContent = Titles.PROMO_LAST;
  promoButton.textContent = Buttons.GET_PROMO;
  promoButton.setAttribute('id', Mode.get_promo);

  promoTitle.append(promoTitleFirst, promoTitleSecond, promoTitleLast);
  promoContent.append(promoTitle, promoButton);
  promoWrapper.append(promoContent);
  linksContainer.append(linkLogin, linkRegistration, linkProfile);

  if (main) {
    main.append(promoWrapper, linksContainer);
  }

  return body || null;
}

export { createTemplate, createTemplateMain };
