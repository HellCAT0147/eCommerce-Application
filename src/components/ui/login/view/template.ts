import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import createHeader from '../../main/view/header';
import FormViewLogin from './form';

export default function createTemplateLogin(isloggedIn?: boolean): void {
  const body: HTMLBodyElement | null = document.querySelector('body');
  const header: HTMLElement | null = document.querySelector('header');
  const newHeader: HTMLElement = createHeader(isloggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector('main');

  if (main) {
    main.className = `main main__${Pages.LOGIN}`;
    main.innerHTML = '';
  }

  const title: HTMLElement = new Builder('h1', Base.titles, Blocks.main, Elem.title, '').element();
  title.textContent = `${Titles.LOGIN_ACCOUNT}`;
  const formView: FormViewLogin = new FormViewLogin(Blocks.login);
  const form: HTMLFormElement = formView.getForm();
  const linkWrapper: HTMLElement = new Builder('span', '', Blocks.reg, Elem.wrapper, '').element();
  linkWrapper.textContent = `${Titles.NOT_HAVE_ACCOUNT} `;
  const linkLogin: HTMLAnchorElement = new Builder('', Base.links, Blocks.reg, Elem.link, Mode.reg).a();
  linkLogin.textContent = `${Buttons.CREATE[0]}${Buttons.CREATE.toLocaleLowerCase().slice(1)}!`;

  if (main) {
    linkWrapper.appendChild(linkLogin);
    form.appendChild(linkWrapper);
    main.append(title, form);
  }
}
