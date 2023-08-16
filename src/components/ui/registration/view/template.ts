import createHeader from '../../main/view/header';
import RegistrationFormView from './form';

export default function createTemplateRegistration(): HTMLBodyElement | null {
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
  title.textContent = `eCommerce - Registration Page`;
  const formView: RegistrationFormView = new RegistrationFormView('registration');
  const form: HTMLFormElement = formView.getForm();
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';
  if (body) {
    main.append(title);
    body.append(header, main, footer);
    main.append(form);
    body.append(main);
    body.append(footer);
  }

  return body || null;
}
