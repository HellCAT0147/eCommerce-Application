import { Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { Pages } from '../../../models/router';

export default class CartView {
  private pageName: string;

  public constructor(pageName: string = Pages.CART) {
    this.pageName = pageName;
  }

  public showMessage(isSuccess?: boolean, message?: string): void {
    const body: HTMLElement | null = document.querySelector(`${Blocks.body}`);
    const oldMessageHolder: HTMLElement | null = document.querySelector(`.${Blocks.prof}__${Elem.mess}`);
    if (oldMessageHolder) {
      oldMessageHolder.classList.remove(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
      const messageText: HTMLElement | null = oldMessageHolder.querySelector(`.${Elem.mess}__${Elem.text}`);
      if (messageText) {
        if (isSuccess) messageText.textContent = `${Titles.SUCCESS_UPDATE}`;
        else if (message) messageText.textContent = `${message}`;
        else messageText.textContent = `${Titles.FAILED_UPDATE}`;
      }
      if (!isSuccess) oldMessageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
    } else {
      const messageHolder: HTMLElement = new Builder('div', '', Blocks.prof, Elem.mess, '').element();
      const messageIcon: HTMLElement = new Builder('div', '', Elem.mess, Elem.image, '').element();
      const messageText: HTMLElement = new Builder('div', '', Elem.mess, Elem.text, '').element();
      if (isSuccess) {
        messageText.textContent = `${Titles.SUCCESS_UPDATE}`;
      } else if (message) {
        messageText.textContent = `${message}`;
        messageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
      } else {
        messageText.textContent = `${Titles.FAILED_UPDATE}`;
        messageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
      }

      messageHolder.append(messageIcon, messageText);
      if (body) body.appendChild(messageHolder);
      if (messageHolder) {
        setTimeout(() => {
          messageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
          messageHolder.classList.remove(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
        }, 1500);
      }
    }

    setTimeout(() => {
      if (oldMessageHolder) {
        oldMessageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
        oldMessageHolder.classList.remove(`${Blocks.prof}__${Elem.mess}_${Mode.fail}`);
      }
    }, 1500);
  }

  public showCart(): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.CART}`);
    if (main) {
      main.innerHTML = '';
      // TODO implement a cart display method
    }
  }
}
