import { Base, Blocks, Elem, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import FormView from './form';

export default function createTemplateLogin(): void {
  const main: HTMLElement | null = document.querySelector('main');
  if (main) {
    main.className = `main main__${Pages.LOGIN}`;
    main.innerHTML = '';
  }
  const title: HTMLElement = new Builder('h1', Base.titles, Blocks.main, Elem.title, '').element();
  title.textContent = `eCommerce - ${Titles.LOGIN} Page`;
  const formView: FormView = new FormView(Blocks.login);
  const form: HTMLFormElement = formView.getForm();

  if (main) {
    main.append(title, form);
    main.append(form);
  }
}
