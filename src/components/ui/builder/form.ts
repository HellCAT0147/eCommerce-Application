import { Base, Blocks, Elem, Mode } from '../../models/builder';
import { Errors, InputType } from '../../models/validation';
import Builder from './html-builder';

export default class FormView {
  protected form: HTMLFormElement;

  protected pageName: string;

  public constructor(pageName: string) {
    this.pageName = pageName;
    const form: HTMLFormElement = new Builder('', Base.form, pageName, Blocks.form, '').form();
    const formFieldEmail: HTMLFieldSetElement = new Builder('', Base.field, pageName, Elem.field, Mode.email).field();
    const labelEmail: HTMLLabelElement = this.createLabel(pageName, Mode.email);
    const inputEmail: HTMLInputElement = this.createInput(pageName, Mode.email);
    const formFieldPassword: HTMLFieldSetElement = new Builder('', Base.field, pageName, Elem.field, Mode.pass).field();
    const labelPassword: HTMLLabelElement = this.createLabel(pageName, Mode.pass);
    const inputPassword: HTMLInputElement = this.createInput(pageName, Mode.pass);
    const showPassword: HTMLButtonElement = this.createShowPassword();

    formFieldEmail.append(labelEmail, inputEmail);
    formFieldPassword.append(labelPassword, inputPassword, showPassword);
    form.append(formFieldEmail, formFieldPassword);

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

  protected createInput(pageName: string, inputName: InputType): HTMLInputElement {
    const input: HTMLInputElement = new Builder('', Base.inputs, pageName, Elem.input, inputName).input();

    if (inputName === Mode.email) input.setAttribute('type', 'text');
    else if (inputName === Mode.pass) input.setAttribute('type', 'password');
    else if (inputName === Mode.date) {
      const currentDate: Date = new Date();
      const yearMin: number = currentDate.getFullYear() - 150;
      const yearMax: number = currentDate.getFullYear() - 13;
      const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day: string = String(currentDate.getDate()).padStart(2, '0');
      const formattedMinDate: string = `${yearMin}-${month}-${day}`;
      const formattedMaxDate: string = `${yearMax}-${month}-${day}`;

      input.setAttribute('type', 'date');
      input.setAttribute('min', formattedMinDate);
      input.setAttribute('max', formattedMaxDate);
    }

    input.setAttribute('id', `${pageName}-${inputName}`);

    return input;
  }

  protected createLabel(pageName: string, labelName: string): HTMLLabelElement {
    const label: HTMLLabelElement = new Builder('', Base.labels, pageName, Elem.label, labelName).label();
    label.setAttribute('for', `${pageName}-${labelName}`);
    const asterisk: HTMLElement = new Builder('span', '', 'required', '', '').element();
    asterisk.textContent = ' *';
    const prettyLabelName: string = `${labelName
      .split('-')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ')}`;
    label.textContent = prettyLabelName;
    label.appendChild(asterisk);

    return label;
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

  public showErrors(place: HTMLElement | null, errors: Errors[] | string[], inputType: InputType): void {
    if (place) {
      const prevErrorsHolder: HTMLDivElement | null = document.querySelector(`.${this.pageName}__errors_${inputType}`);

      if (prevErrorsHolder) prevErrorsHolder.outerHTML = '';
      const errorsHolder: HTMLElement = new Builder('div', '', this.pageName, Elem.errs, inputType).element();

      errors.forEach((error) => {
        const p: HTMLElement = new Builder('p', '', this.pageName, Elem.err, '').element();
        p.textContent = error;
        errorsHolder.append(p);
      });
      const input: HTMLInputElement | null = document.querySelector(`.${this.pageName}__input_${inputType}`);

      if (errors.length) {
        place.after(errorsHolder);
        this.highlightInput(input, false);
      } else {
        this.highlightInput(input, true);
      }
    }
  }

  public switchPasswordView(icon: HTMLButtonElement, pageName?: string): void {
    let input: HTMLInputElement | null;
    input = document.querySelector(`#${this.pageName}-password`);
    if (pageName) input = document.querySelector(`#${pageName}-password`);
    icon.classList.toggle(`form__button_${Mode.eye_opened}`);
    icon.classList.toggle(`form__button_${Mode.eye_closed}`);

    if (!input) return;
    if (icon.classList.contains(`form__button_${Mode.eye_opened}`)) input.type = 'text';
    else input.type = 'password';
    input.focus();
  }
}
