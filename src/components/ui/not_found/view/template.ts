import { Pages } from '../../../models/router';
import createHeader from '../../main/view/header';
import createMainForNotFound from './main';

export default function createTemplateNotFound(isloggedIn?: boolean): void {
  const body: HTMLBodyElement | null = document.querySelector('body');
  const header: HTMLElement | null = document.querySelector('header');
  const newHeader: HTMLElement = createHeader(isloggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector('main');

  if (main) {
    main.className = `main main__${Pages.NOT_FOUND}`;
    main.innerHTML = '';
    createMainForNotFound(main);
  }
}
