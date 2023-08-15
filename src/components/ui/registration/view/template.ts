import { Base, Blocks, Elem, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';

export default function createTemplateRegistration(): void {
  const main: HTMLElement | null = document.querySelector('main');
  if (main) {
    main.className = `main main__${Pages.REGISTRATION}`;
    main.innerHTML = '';
  }
  const title: HTMLElement = new Builder('h1', Base.titles, Blocks.main, Elem.title, '').element();
  title.textContent = `eCommerce - ${Titles.REGISTRATION} Page`;

  if (main) {
    main.append(title);
  }
}
