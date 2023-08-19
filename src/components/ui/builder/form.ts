import { Base, Blocks, Elem, Mode, Titles } from '../../models/builder';
import { Countries, Errors, InputType, PostalErrors } from '../../models/validation';
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
    } else if (inputName === Mode.both) input.setAttribute('type', 'checkbox');

    input.setAttribute('id', `${pageName}-${inputName}`);

    return input;
  }

  protected createSelectMenu(pageName: string, inputName: InputType): HTMLSelectElement {
    const select: HTMLSelectElement = new Builder('', Base.select, pageName, Elem.select, inputName).select();

    if (inputName === Mode.country) {
      const defaultOption: HTMLOptionElement = new Builder(
        '',
        Base.options,
        Blocks.select,
        Elem.option,
        Mode.default
      ).option();
      defaultOption.value = '';
      defaultOption.textContent = PostalErrors.notSelected;
      select.appendChild(defaultOption);
      Object.values(Countries).forEach((country) => {
        const option: HTMLOptionElement = new Builder(
          '',
          Base.options,
          Blocks.select,
          Elem.option,
          country.toLowerCase()
        ).option();
        option.value = country;
        option.textContent = country;
        select.appendChild(option);
      });
    }

    select.setAttribute('id', `${pageName}-${inputName}`);

    return select;
  }

  protected createLabel(pageName: string, labelName: string, labelText?: string): HTMLLabelElement {
    const label: HTMLLabelElement = new Builder('', Base.labels, pageName, Elem.label, labelName).label();
    label.setAttribute('for', `${pageName}-${labelName}`);
    const asterisk: HTMLElement = new Builder('span', '', 'required', '', '').element();
    asterisk.textContent = ' *';
    let labelTitle: string = labelName;
    if (labelText) {
      labelTitle = labelText;
    }
    const prettyLabelName: string = `${labelTitle
      .split('-')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ')}`;
    label.textContent = prettyLabelName;
    label.appendChild(asterisk);

    return label;
  }

  protected createAddress(
    street: InputType,
    city: InputType,
    postal: InputType,
    country: InputType,
    title: string,
    check?: HTMLElement
  ): HTMLFieldSetElement {
    const page: string = this.pageName;
    const formFieldAddress: HTMLFieldSetElement = new Builder('', Base.subform, page, Elem.address, '').field();
    const formTitleShip: HTMLElement = new Builder('h2', Base.form_title, Blocks.form, Elem.title, Mode.ship).element();
    formTitleShip.textContent = `${title} ${Titles.ADDRESS}`;
    const formFieldCountry: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', country).field();
    const labelCountry: HTMLLabelElement = this.createLabel(page, country, Mode.country);
    const inputCountry: HTMLSelectElement = this.createSelectMenu(page, country);
    const formFieldPostal: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', postal).field();
    const labelPostal: HTMLLabelElement = this.createLabel(page, postal, Mode.postal);
    const inputPostal: HTMLInputElement = this.createInput(page, postal);
    const formFieldCity: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', city).field();
    const labelCity: HTMLLabelElement = this.createLabel(page, city, Mode.city);
    const inputCity: HTMLInputElement = this.createInput(page, city);
    const formFieldStreet: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', street).field();
    const labelStreet: HTMLLabelElement = this.createLabel(page, street, Mode.street);
    const inputStreet: HTMLInputElement = this.createInput(page, street);

    formFieldStreet.append(labelStreet, inputStreet);
    formFieldCity.append(labelCity, inputCity);
    formFieldPostal.append(labelPostal, inputPostal);
    formFieldCountry.append(labelCountry, inputCountry);
    formFieldAddress.appendChild(formTitleShip);
    if (check) formFieldAddress.appendChild(check);
    formFieldAddress.append(formFieldCountry, formFieldPostal, formFieldCity, formFieldStreet);

    return formFieldAddress;
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
      let input: HTMLInputElement | null = document.querySelector(`.${this.pageName}__input_${inputType}`);
      if (inputType === 'country') input = document.querySelector(`.${this.pageName}__select_${inputType}`);

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
