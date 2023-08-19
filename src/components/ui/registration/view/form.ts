import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import FormView from '../../builder/form';
import Builder from '../../builder/html-builder';

export default class FormViewReg extends FormView {
  public form: HTMLFormElement;

  public constructor(pageName: string = Pages.REGISTRATION) {
    super(pageName);
    const form: HTMLFormElement = this.getForm();
    const formFieldFirstName: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.f_name).field();
    const formTitle: HTMLElement = new Builder('h2', Base.form_title, Blocks.form, Elem.title, Mode.contact).element();
    formTitle.textContent = Titles.FORM_CONTACT;
    const labelFirstName: HTMLLabelElement = this.createLabel(pageName, Mode.f_name);
    const inputFirstName: HTMLInputElement = this.createInput(pageName, Mode.f_name);
    const formFieldLastName: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.l_name).field();
    const labelLastName: HTMLLabelElement = this.createLabel(pageName, Mode.l_name);
    const inputLastName: HTMLInputElement = this.createInput(pageName, Mode.l_name);
    const formFieldDate: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.date).field();
    const labelDate: HTMLLabelElement = this.createLabel(pageName, Mode.date);
    const inputDate: HTMLInputElement = this.createInput(pageName, Mode.date);
    const formFieldCheck: HTMLElement = new Builder('div', Base.check, pageName, Elem.field, Mode.both).element();
    const inputCheckBilling: HTMLInputElement = this.createInput(pageName, Mode.both);
    inputCheckBilling.setAttribute('checked', 'checked');
    const labelCheckBilling: HTMLElement = new Builder('p', '', pageName, Elem.text, Mode.both).element();
    labelCheckBilling.textContent = Titles.CHECK_BOTH;
    formFieldCheck.append(inputCheckBilling, labelCheckBilling);
    const fieldAddress: HTMLFieldSetElement = this.createAddress(
      Mode.street,
      Mode.city,
      Mode.postal,
      Mode.country,
      Titles.BOTH_ADDRESS,
      formFieldCheck
    );
    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.create).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.CREATE;

    formFieldFirstName.append(labelFirstName, inputFirstName);
    formFieldLastName.append(labelLastName, inputLastName);
    formFieldDate.append(labelDate, inputDate);
    form.prepend(formTitle);
    form.append(formFieldFirstName, formFieldLastName, formFieldDate);
    form.append(fieldAddress, buttonForm);
    this.form = form;
  }

  public resetPostal(selectField: HTMLElement | null): void {
    if (!selectField) return;
    const fieldset: Element | null = selectField.nextElementSibling;
    if (!fieldset) return;
    const postal: HTMLElement | null = fieldset.querySelector('.form__input');
    if (!postal) return;
    if (postal instanceof HTMLInputElement) postal.value = '';
  }
}
