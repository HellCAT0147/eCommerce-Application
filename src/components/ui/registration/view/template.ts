import { Base, Blocks, Elem, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import FormView from '../../builder/form';
import FormViewReg from './form';
import createHeader from '../../main/view/header';

export default function createTemplateRegistration(isloggedIn?: boolean): HTMLElement {
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
  title.textContent = `eCommerce - ${Titles.REGISTRATION} Page`;
  const formView: FormView = new FormViewReg(Blocks.reg);
  const form: HTMLFormElement = formView.getForm();

  if (main) {
    main.append(title, form);
    main.append(form);
  }

  return newHeader;
}
