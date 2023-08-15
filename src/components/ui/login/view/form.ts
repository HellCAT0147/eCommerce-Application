import { Base, Blocks, Buttons, Elem, Mode } from '../../../models/builder';
import { InputType } from '../../../models/login';
import { Errors } from '../../../models/validation';
import Builder from '../../builder/html-builder';
import createInput from './input';
import createLabel from './label';

export default class FormView {
  private form: HTMLFormElement;

  constructor(pageName: string = 'login') {
    const form: HTMLFormElement = new Builder('', Base.form, pageName, Blocks.form, '').form();
    const formFieldEmail: HTMLFieldSetElement = new Builder('', Base.field, pageName, Elem.field, Mode.email).field();
    const labelEmail: HTMLLabelElement = createLabel(pageName, Mode.email);
    const inputEmail: HTMLInputElement = createInput(pageName, Mode.email);
    const formFieldPassword: HTMLFieldSetElement = new Builder('', Base.field, pageName, Elem.field, Mode.pass).field();
    const labelPassword: HTMLLabelElement = createLabel(pageName, Mode.pass);
    const inputPassword: HTMLInputElement = createInput(pageName, Mode.pass);
    const showPassword: HTMLButtonElement = this.createShowPassword();
    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.sign).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.SIGN;

    formFieldEmail.append(labelEmail, inputEmail);
    formFieldPassword.append(labelPassword, inputPassword, showPassword);
    form.append(formFieldEmail, formFieldPassword, buttonForm);

    this.form = form;
  }

  public getForm(): HTMLFormElement {
    return this.form;
  }

  private createShowPassword(): HTMLButtonElement {
    const showPassword: HTMLButtonElement = new Builder('', '', Blocks.form, Elem.btn, Mode.eye_closed).button();
    showPassword.id = 'show-password';
    return showPassword;
  }

  private highlightInput(input: HTMLInputElement | null, isValid: boolean): void {
    if (input) {
      if (isValid) {
        input.classList.add(Mode.valid);
        input.classList.remove(Mode.invalid);
      } else {
        input.classList.remove(Mode.valid);
        input.classList.add(Mode.invalid);
      }
    }
  }

  public showErrors(place: HTMLElement | null, errors: Errors[], inputType: InputType): void {
    if (place) {
      const prevErrorsHolder: HTMLDivElement | null = document.querySelector(`.login__errors_${inputType}`);

      if (prevErrorsHolder) prevErrorsHolder.outerHTML = '';
      const errorsHolder: HTMLElement = new Builder('div', '', Blocks.login, Elem.errs, inputType).element();

      errors.forEach((error) => {
        const p: HTMLElement = new Builder('p', '', Blocks.login, Elem.err, '').element();
        p.textContent = error;
        errorsHolder.append(p);
      });
      const input: HTMLInputElement | null = document.querySelector(`.login__input_${inputType}`);

      if (errors.length) {
        place.after(errorsHolder);
        this.highlightInput(input, false);
      } else {
        this.highlightInput(input, true);
      }
    }
  }

  public switchPasswordView(icon: HTMLButtonElement): void {
    const input: HTMLInputElement | null = document.querySelector('#login-password');
    icon.classList.toggle(`form__button_${Mode.eye_opened}`);
    icon.classList.toggle(`form__button_${Mode.eye_closed}`);

    if (!input) return;
    if (icon.classList.contains(`form__button_${Mode.eye_opened}`)) input.type = 'text';
    else input.type = 'password';
    input.focus();
  }
}
