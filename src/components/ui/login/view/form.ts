import { InputType } from '../../../models/login';
import { Errors } from '../../../models/validation';
import createInput from './input';
import createLabel from './label';

export default class FormView {
  private form: HTMLFormElement;

  constructor(pageName: string = 'login') {
    const form: HTMLFormElement = document.createElement('form');
    form.className = `form ${pageName}__form`;
    const formFieldEmail: HTMLFieldSetElement = document.createElement('fieldset');
    formFieldEmail.className = `form__field ${pageName}__field ${pageName}__field_email`;
    const labelEmail: HTMLLabelElement = createLabel(pageName, 'email');
    const inputEmail: HTMLInputElement = createInput(pageName, 'email');
    const formFieldPassword: HTMLFieldSetElement = document.createElement('fieldset');
    formFieldPassword.className = `form__field ${pageName}__field ${pageName}__field_password`;
    const labelPassword: HTMLLabelElement = createLabel(pageName, 'password');
    const inputPassword: HTMLInputElement = createInput(pageName, 'password');
    const showPassword: HTMLButtonElement = this.createShowPassword();
    const buttonForm: HTMLButtonElement = document.createElement('button');
    buttonForm.className = `buttons buttons_colored form__button ${pageName}__button ${pageName}__button_sign`;
    buttonForm.textContent = 'sign in'.toUpperCase();

    formFieldEmail.append(labelEmail);
    formFieldEmail.append(inputEmail);
    form.append(formFieldEmail);
    formFieldPassword.append(labelPassword);
    formFieldPassword.append(inputPassword);
    formFieldPassword.append(showPassword);
    form.append(formFieldPassword);
    form.append(buttonForm);

    this.form = form;
  }

  public getForm(): HTMLFormElement {
    return this.form;
  }

  private createShowPassword(): HTMLButtonElement {
    const showPassword: HTMLButtonElement = document.createElement('button');
    showPassword.className = 'form__button form__button_eye_closed';
    showPassword.id = 'show-password';
    return showPassword;
  }

  private highlightInput(input: HTMLInputElement | null, isValid: boolean): void {
    if (input) {
      if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
      }
    }
  }

  public showErrors(place: HTMLElement | null, errors: Errors[], inputType: InputType): void {
    if (place) {
      const prevErrorsHolder: HTMLDivElement | null = document.querySelector(`.login__errors_${inputType}`);
      if (prevErrorsHolder) prevErrorsHolder.outerHTML = '';
      const errorsHolder: HTMLDivElement = document.createElement('div');
      errorsHolder.className = `login__errors login__errors_${inputType}`;
      errors.forEach((error) => {
        const p: HTMLParagraphElement = document.createElement('p');
        p.className = 'login__error';
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

  public switchPasswordView(icon: HTMLButtonElement, passwordInput: HTMLInputElement): void {
    const input: HTMLInputElement = passwordInput;
    icon.classList.toggle('form__button_eye_opened');
    icon.classList.toggle('form__button_eye_closed');
    if (icon.classList.contains('form__button_eye_opened')) input.type = 'text';
    else input.type = 'password';
    input.focus();
  }
}
