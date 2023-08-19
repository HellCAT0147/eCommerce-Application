import { Base, Blocks, Buttons, Elem, Mode } from '../../../models/builder';
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

    if (customMsg === null) reminder.textContent = 'Please fill in the required fields correctly';
    else reminder.textContent = customMsg;

    if (!form) return;
    errorsHolder.appendChild(reminder);
    form.appendChild(errorsHolder);
  }
}
