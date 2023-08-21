import { Base, Blocks, Elem, Titles } from '../../../models/builder';
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
  title.textContent = `eCommerce - ${Titles.LOGIN} Page`;
  const formView: FormViewLogin = new FormViewLogin(Blocks.login);
  const form: HTMLFormElement = formView.getForm();

  if (main) {
    main.append(title, form);
    main.append(form);
  }

  formView.addTabAndFocus();
}
