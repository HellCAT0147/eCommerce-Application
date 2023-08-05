export default function createTemplate(): HTMLBodyElement | null {
  const body: HTMLBodyElement | null = document.querySelector('body');
  if (body) body.className = 'body';
  const header: HTMLElement = document.createElement('header');
  header.className = 'header';
  const main: HTMLElement = document.createElement('main');
  main.className = 'main';
  const title: HTMLElement = document.createElement('h1');
  title.className = 'title';
  title.textContent = `eCommerce`;
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';
  if (body) {
    body.append(header);
    main.append(title);
    body.append(main);
    body.append(footer);
  }
  console.log('Template connected');

  return body || null;
}
