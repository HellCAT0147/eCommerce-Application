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
    const showPassword: HTMLButtonElement = this.createShowPassword(inputPassword);
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

  private createShowPassword(inputPassword: HTMLInputElement): HTMLButtonElement {
    const showPassword: HTMLButtonElement = document.createElement('button');
    const password: HTMLInputElement = inputPassword;
    showPassword.className = 'form__button form__button_eye_closed';
    showPassword.addEventListener('click', (e) => {
      e.preventDefault();
      showPassword.classList.toggle('form__button_eye_opened');
      showPassword.classList.toggle('form__button_eye_closed');
      if (showPassword.classList.contains('form__button_eye_opened')) password.type = 'text';
      else password.type = 'password';
    });
    return showPassword;
  }

  public highlightInput(input: HTMLInputElement, isValid: boolean): void {
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
}
