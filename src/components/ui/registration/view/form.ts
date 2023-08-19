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
    const inputCheckBoth: HTMLInputElement = this.createInput(pageName, Mode.both);
    inputCheckBoth.setAttribute('checked', 'checked');
    const labelCheckBoth: HTMLElement = new Builder('p', '', pageName, Elem.text, Mode.both).element();
    labelCheckBoth.textContent = Titles.CHECK_BOTH;
    formFieldCheck.append(inputCheckBoth, labelCheckBoth);
    const fieldAddress: HTMLFieldSetElement = this.createAddress(
      Mode.street,
      Mode.city,
      Mode.postal,
      Mode.country,
      Titles.BOTH_ADDRESS,
      Mode.ship,
      formFieldCheck
    );
    const fieldCheckDefault: HTMLFieldSetElement = this.createFieldCheck();
    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.create).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.CREATE;
    formFieldFirstName.append(labelFirstName, inputFirstName);
    formFieldLastName.append(labelLastName, inputLastName);
    formFieldDate.append(labelDate, inputDate);
    form.prepend(formTitle);
    form.append(formFieldFirstName, formFieldLastName, formFieldDate, fieldAddress, fieldCheckDefault, buttonForm);
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

  private createFieldCheck(): HTMLFieldSetElement {
    const fieldCheck: HTMLFieldSetElement = new Builder('', Base.subform, this.pageName, Elem.check, '').field();
    const formFieldCheckShipping: HTMLElement = new Builder(
      'div',
      Base.check,
      this.pageName,
      Elem.field,
      Mode.ship
    ).element();
    const inputCheckShipping: HTMLInputElement = this.createInput(this.pageName, Mode.ship);
    const labelCheckShipping: HTMLElement = new Builder('p', '', this.pageName, Elem.text, Mode.ship).element();
    labelCheckShipping.textContent = Titles.DEFAULT_SHIP;
    const formFieldCheckBilling: HTMLElement = new Builder(
      'div',
      Base.check,
      this.pageName,
      Elem.field,
      Mode.ship
    ).element();
    const inputCheckBilling: HTMLInputElement = this.createInput(this.pageName, Mode.bill);
    const labelCheckBilling: HTMLElement = new Builder('p', '', this.pageName, Elem.text, Mode.bill).element();
    labelCheckBilling.textContent = Titles.DEFAULT_BILL;

    formFieldCheckShipping.append(inputCheckShipping, labelCheckShipping);
    formFieldCheckBilling.append(inputCheckBilling, labelCheckBilling);
    fieldCheck.append(formFieldCheckShipping, formFieldCheckBilling);

    return fieldCheck;
  }

  public showBillingAddress(isChecked: boolean): void {
    const titleShipping: HTMLElement | null = document.querySelector(`.form__title_${Mode.ship}`);
    const addresses: HTMLElement | null = document.querySelector(`.registration__address_${Mode.ship}`);
    const addressBilling: HTMLElement | null = document.querySelector(`.registration__address_${Mode.bill}`);
    if (isChecked) {
      if (titleShipping) {
        titleShipping.textContent = `${Titles.BOTH_ADDRESS} ${Titles.ADDRESS}`;
      }
      if (addresses && addressBilling) addresses.removeChild(addressBilling);
      return;
    }
    if (titleShipping) {
      titleShipping.textContent = `${Titles.SHIPPING} ${Titles.ADDRESS}`;
    }
    const fieldAddressBilling: HTMLFieldSetElement = this.createAddress(
      Mode.street_bill,
      Mode.city_bill,
      Mode.postal_bill,
      Mode.country_bill,
      Titles.BILLING,
      Mode.bill
    );
    if (addresses) addresses.appendChild(fieldAddressBilling);
  }
}
