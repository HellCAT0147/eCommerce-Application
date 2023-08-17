import { Base, Buttons, Elem, Mode } from '../../../models/builder';
import FormView from '../../builder/form';
import Builder from '../../builder/html-builder';

export default class FormViewLogin extends FormView {
  public form: HTMLFormElement;

  constructor(pageName: string) {
    super(pageName);
    const form: HTMLFormElement = this.getForm();
    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.sign).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.SIGN;

    form.append(buttonForm);

    this.form = form;
  }

  public reminder(customMsg: string | null = null): void {
    const reminder: HTMLElement = new Builder('p', '', 'login', Elem.err, '').element();
    const errorsHolder: HTMLElement = new Builder('div', '', this.pageName, Elem.errs, Mode.response).element();
    const form: HTMLFormElement | null = document.querySelector('.login__form');

    setTimeout(() => {
      errorsHolder.outerHTML = '';
    }, 2500);

    if (customMsg === null) reminder.textContent = 'Please fill in the required fields correctly';
    else reminder.textContent = customMsg;

    if (!form) return;
    errorsHolder.appendChild(reminder);
    form.appendChild(errorsHolder);
  }
}
