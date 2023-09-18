import { Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';

function showQuantity(quantity: number): void {
  const quantityParagraph: HTMLElement | null = document.querySelector(`.${Blocks.header}__${Elem.quantity}`);
  if (quantityParagraph) {
    quantityParagraph.textContent = `${quantity} ${Titles.PCS}`;
  }
}

function showMessage(isSuccess?: boolean, message?: string): void {
  const body: HTMLElement | null = document.querySelector(`${Blocks.body}`);
  const oldMessageHolder: HTMLElement | null = document.querySelector(`.${Blocks.main}__${Elem.mess}`);
  if (oldMessageHolder) {
    oldMessageHolder.classList.remove(`${Blocks.main}__${Elem.mess}_${Mode.hidden}`);
    const messageText: HTMLElement | null = oldMessageHolder.querySelector(`.${Elem.mess}__${Elem.text}`);
    if (messageText) {
      if (message) messageText.textContent = `${message}`;
      else messageText.textContent = `${Titles.FAILED_UPDATE_CATALOG}`;
    }
    if (!isSuccess) oldMessageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
  } else {
    const messageHolder: HTMLElement = new Builder('div', '', Blocks.main, Elem.mess, '').element();
    const messageIcon: HTMLElement = new Builder('div', '', Elem.mess, Elem.image, '').element();
    const messageText: HTMLElement = new Builder('div', '', Elem.mess, Elem.text, '').element();
    if (message) {
      messageText.textContent = `${message}`;
      messageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
    } else {
      messageText.textContent = `${Titles.FAILED_UPDATE_CATALOG}`;
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

export { showQuantity, showMessage };
