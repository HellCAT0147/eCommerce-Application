import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';

function showMessage(isSuccess?: boolean, message?: string): void {
  const body: HTMLElement | null = document.querySelector(`${Blocks.body}`);
  const oldMessageHolder: HTMLElement | null = document.querySelector(`.${Blocks.main}__${Elem.mess}`);
  if (oldMessageHolder) {
    oldMessageHolder.classList.remove(`${Blocks.main}__${Elem.mess}_${Mode.hidden}`);
    const messageText: HTMLElement | null = oldMessageHolder.querySelector(`.${Elem.mess}__${Elem.text}`);
    if (messageText) {
      if (message) messageText.textContent = `${message}`;
    }
    if (!isSuccess) oldMessageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
  } else {
    const messageHolder: HTMLElement = new Builder('div', '', Blocks.main, Elem.mess, '').element();
    const messageIcon: HTMLElement = new Builder('div', '', Elem.mess, Elem.image, '').element();
    const messageText: HTMLElement = new Builder('div', '', Elem.mess, Elem.text, '').element();
    if (message) {
      messageText.textContent = `${message}`;
      messageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
    }

    messageHolder.append(messageIcon, messageText);
    if (body) body.appendChild(messageHolder);
    if (messageHolder) {
      setTimeout(() => {
        messageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.hidden}`);
        messageHolder.classList.remove(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
      }, 1500);
    }
  }

  setTimeout(() => {
    if (oldMessageHolder) {
      oldMessageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.hidden}`);
      oldMessageHolder.classList.remove(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
    }
  }, 1500);
}

function selectCurrentPage(url: string): void {
  const headerButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.header__button');
  const bagIcon: HTMLElement | null = document.querySelector(`.${Blocks.header}__${Elem.bag}`);

  if (url === Pages.CART && bagIcon) {
    bagIcon.classList.add(`${Blocks.header}__${Elem.bag}_${Mode.colored}`);
  } else {
    if (bagIcon) bagIcon.classList.remove(`${Blocks.header}__${Elem.bag}_${Mode.colored}`);
    headerButtons.forEach((button: HTMLElement) => {
      button.classList.remove(`${Base.current_page}`);
    });

    headerButtons.forEach((button: HTMLElement) => {
      const id: string | null = button.getAttribute('id');

      if (url === id) {
        button.classList.add(`${Base.current_page}`);
      } else if (url === '' && id === Pages.MAIN) {
        button.classList.add(`${Base.current_page}`);
      }
    });
  }
}

function showQuantity(quantity: number): void {
  const quantityParagraph: HTMLElement | null = document.querySelector(`.${Blocks.header}__${Elem.quantity}`);
  if (quantityParagraph) {
    quantityParagraph.textContent = `${quantity} ${Titles.PCS}`;
  }
}

export { showMessage, selectCurrentPage, showQuantity };
