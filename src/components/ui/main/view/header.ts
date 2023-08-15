import { Pages } from '../../../models/router';

export default function createHeader(): HTMLElement {
  const header: HTMLElement = document.createElement('header');
  header.className = 'header';
  const logo: HTMLElement = document.createElement('div');
  logo.className = 'header__logo redirect__buttons';
  logo.setAttribute('id', `${Pages.MAIN}`);
  const navigation: HTMLElement = document.createElement('nav');
  navigation.className = 'header__nav';
  const signButton: HTMLElement = document.createElement('button');
  signButton.className = 'buttons buttons_empty header__buttons header__buttons_sign redirect__buttons';
  signButton.textContent = 'SIGN IN';
  signButton.setAttribute('id', `${Pages.LOGIN}`);
  const createButton: HTMLElement = document.createElement('button');
  createButton.className = 'buttons buttons_empty header__buttons header__buttons_create redirect__buttons';
  createButton.textContent = 'CREATE AN ACCOUNT';
  createButton.setAttribute('id', `${Pages.REGISTRATION}`);
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';
  navigation.append(signButton);
  navigation.append(createButton);
  header.append(logo);
  header.append(navigation);

  return header;
}
