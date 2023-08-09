import createInput from './input';
import createLabel from './label';

export default function createForm(pageName: string): HTMLFormElement {
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
  const buttonForm: HTMLButtonElement = document.createElement('button');
  buttonForm.className = `buttons buttons_colored form__button ${pageName}__button ${pageName}__button_sign`;
  buttonForm.textContent = 'sign in'.toUpperCase();

  formFieldEmail.append(labelEmail);
  formFieldEmail.append(inputEmail);
  form.append(formFieldEmail);
  formFieldPassword.append(labelPassword);
  formFieldPassword.append(inputPassword);
  form.append(formFieldPassword);
  form.append(buttonForm);

  return form;
}
