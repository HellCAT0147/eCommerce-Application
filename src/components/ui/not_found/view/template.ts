import createHeader from './header';

export default function createTemplateNotFound(): HTMLBodyElement | null {
  const body: HTMLBodyElement | null = document.querySelector('body');
  if (body) {
    body.className = 'body';
    body.innerHTML = '';
  }
  const header: HTMLElement = createHeader();
  header.className = 'header';
  const main: HTMLElement = document.createElement('main');
  main.className = 'main';
  const title: HTMLElement = document.createElement('h1');
  title.className = 'title';
  title.textContent = `404 Not found`;
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';
  if (body) {
    main.append(title);
    body.append(header, main, footer);
  }

  return body || null;
}
