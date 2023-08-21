import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import FormView from '../../builder/form';
import FormViewReg from './form';
import createHeader from '../../main/view/header';

export default function createTemplateRegistration(isloggedIn?: boolean): void {
  const body: HTMLBodyElement | null = document.querySelector('body');
  const header: HTMLElement | null = document.querySelector('header');
  const newHeader: HTMLElement = createHeader(isloggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector('main');

  if (main) {
    main.className = `main main__${Pages.REGISTRATION}`;
    main.innerHTML = '';
  }

  const title: HTMLElement = new Builder('h1', Base.titles, Blocks.main, Elem.title, '').element();
  title.textContent = `${Titles.CREATE_ACCOUNT}`;
  const formView: FormView = new FormViewReg(Blocks.reg);
  const form: HTMLFormElement = formView.getForm();
  const linkWrapper: HTMLElement = new Builder('span', '', Blocks.reg, Elem.wrapper, '').element();
  linkWrapper.textContent = `${Titles.HAVE_ACCOUNT} `;
  const linkLogin: HTMLAnchorElement = new Builder('', Base.links, Blocks.reg, Elem.link, Mode.login).a();
  linkLogin.textContent = `${Titles.LOGIN}!`;

  if (main) {
    linkWrapper.appendChild(linkLogin);
    form.appendChild(linkWrapper);
    main.append(title, form);
  }
}
