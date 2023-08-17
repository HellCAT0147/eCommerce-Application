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
    const sendButton: HTMLButtonElement | null = document.querySelector('.login__button_sign');

    if (customMsg === null) reminder.textContent = 'Please fill in the required fields correctly';
    else reminder.textContent = customMsg;

    if (!sendButton) return;
    errorsHolder.appendChild(reminder);
    sendButton.after(errorsHolder);
  }
}
