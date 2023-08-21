import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import FormView from '../../builder/form';
import Builder from '../../builder/html-builder';

export default class FormViewLogin extends FormView {
  protected form: HTMLFormElement;

  public constructor(pageName: string = Pages.LOGIN) {
    super(pageName);
    const form: HTMLFormElement = this.getForm();
    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.sign).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.SIGN;

    form.append(buttonForm);

    this.form = form;
  }

  public reminder(customMsg: string | null = null, block: Blocks = Blocks.login): void {
    const reminder: HTMLElement = new Builder('p', '', block, Elem.err, '').element();
    const errorsHolder: HTMLElement = new Builder('div', '', block, Elem.errs, Mode.response).element();
    const form: HTMLFormElement | null = document.querySelector('.form');

    setTimeout(() => {
      errorsHolder.outerHTML = '';
    }, 5000);

    if (customMsg === null) {
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.${Base.inputs}`);
      const select: HTMLSelectElement | null = document.querySelector(`.${Base.select}`);

      inputs.forEach((el) => {
        if (el instanceof HTMLInputElement && !el.value.length) this.highlightInput(el, false);
      });
      if (select instanceof HTMLSelectElement && select.value === '') this.highlightInput(select, false);

      reminder.textContent = 'Please fill in the required fields correctly';
    } else reminder.textContent = customMsg;

    if (!form) return;
    errorsHolder.appendChild(reminder);
    form.appendChild(errorsHolder);
  }

  public showSuccessLoginMessage(): void {
    const body: HTMLElement | null = document.querySelector(`.body`);
    const oldMessageHolder: HTMLElement | null = document.querySelector(`.login__message`);
    if (oldMessageHolder) {
      body?.removeChild(oldMessageHolder);
    }
    const messageHolder: HTMLElement = new Builder('div', '', Blocks.login, Elem.mess, '').element();
    const messageIcon: HTMLElement = new Builder('div', '', Elem.mess, Elem.image, '').element();
    const messageText: HTMLElement = new Builder('div', '', Elem.mess, Elem.text, '').element();
    messageText.textContent = `${Titles.SUCCESS_LOGIN}`;

    messageHolder.append(messageIcon, messageText);
    if (body) body.append(messageHolder);

    setTimeout(() => {
      body?.removeChild(messageHolder);
    }, 1500);
  }
}
