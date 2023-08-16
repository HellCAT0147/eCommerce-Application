import { Pages } from '../../../models/router';
import createMainForNotFound from './main';

export default function createTemplateNotFound(): void {
  const main: HTMLElement | null = document.querySelector('main');
  if (main) {
    main.className = `main main__${Pages.NOT_FOUND}`;
    main.innerHTML = '';
    createMainForNotFound(main);
  }
}
