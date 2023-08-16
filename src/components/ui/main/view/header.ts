import { Base, Blocks, Buttons, Elem, Mode } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';

export default function createHeader(): HTMLElement {
  const header: HTMLElement = new Builder('header', '', Blocks.header, '', '').element();
  const logo: HTMLElement = new Builder('div', '', Blocks.header, Elem.logo, '').element();
  logo.classList.add('redirect__buttons');
  logo.setAttribute('id', `${Pages.MAIN}`);
  const navigation: HTMLElement = new Builder('nav', '', Blocks.header, Elem.nav, '').element();
  const signButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.sign).button();
  signButton.classList.add('redirect__buttons');
  signButton.textContent = `${Buttons.SIGN}`;
  signButton.setAttribute('id', `${Pages.LOGIN}`);
  const createButton: HTMLElement = new Builder('', Base.btns_empty, Blocks.header, Elem.btn, Mode.create).button();
  createButton.classList.add('redirect__buttons');
  createButton.textContent = `${Buttons.CREATE}`;
  createButton.setAttribute('id', `${Pages.REGISTRATION}`);
  navigation.append(signButton, createButton);
  header.append(logo, navigation);

  return header;
}