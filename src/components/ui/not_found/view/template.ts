import createHeader from '../../main/view/header';
import createMainForNotFound from './main';

export default function createTemplateNotFound(): HTMLBodyElement | null {
  const body: HTMLBodyElement | null = document.querySelector('body');
  if (body) {
    body.className = 'body';
    body.innerHTML = '';
  }
  const header: HTMLElement = createHeader();
  header.className = 'header';
  const main: HTMLElement = createMainForNotFound();
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';

  if (body) {
    body.append(header, main, footer);
  }

  return body || null;
}
