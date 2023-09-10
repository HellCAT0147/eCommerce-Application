import { Blocks } from '../../../models/builder';
import { Pages } from '../../../models/router';
import createHeader from '../../main/view/header';

export default function createTemplateAboutUS(isLoggedIn?: boolean): HTMLElement {
  const body: HTMLBodyElement | null = document.querySelector(`${Blocks.body}`);
  const header: HTMLElement | null = document.querySelector(`${Blocks.header}`);
  const newHeader: HTMLElement = createHeader(isLoggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector(`${Blocks.main}`);

  if (main) {
    main.className = `${Blocks.main} ${Blocks.main}__${Pages.ABOUT_US}`;
    main.innerHTML = '';
  }

  return newHeader;
}
