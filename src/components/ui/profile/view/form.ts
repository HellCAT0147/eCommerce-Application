import { Address, Customer } from '@commercetools/platform-sdk';
import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import FormViewReg from '../../registration/view/form';
import { InputType } from '../../../models/validation';

export default class FormViewProfile extends FormViewReg {
  public constructor(pageName: string = Pages.PROFILE) {
    super(pageName);
    const form: HTMLFormElement = new Builder('', Base.form, pageName, Blocks.form, '').form();
    this.form = form;
  }

  public generateAddress(): HTMLFieldSetElement {
    const addresses: HTMLFieldSetElement = this.createAddress(
      Mode.street,
      Mode.city,
      Mode.postal,
      Mode.country,
      Titles.BOTH_ADDRESS,
      Mode.ship
    );

    return addresses;
  }

  public createAccountInfoUpdateForm(customer: Customer): HTMLFieldSetElement {
    const page: string = this.pageName;
    const accountInfoField: HTMLFieldSetElement = new Builder('', Base.subform, page, Elem.account, '').field();
    const formTitle: HTMLElement = new Builder('', Base.form_title, Blocks.form, Elem.title, Mode.ship).h(2);
    formTitle.textContent = `${Titles.ACCOUNT_INFO}`;
    const firstName: HTMLFieldSetElement = new Builder('', Base.field, this.pageName, 'field', Mode.f_name).field();
    const labelFirstName: HTMLLabelElement = this.createLabel(this.pageName, Mode.f_name);
    const inputFirstName: HTMLInputElement = this.createInput(this.pageName, Mode.f_name);
    const lastName: HTMLFieldSetElement = new Builder('', Base.field, this.pageName, 'field', Mode.l_name).field();
    const labelLastName: HTMLLabelElement = this.createLabel(this.pageName, Mode.l_name);
    const inputLastName: HTMLInputElement = this.createInput(this.pageName, Mode.l_name);
    const formFieldDate: HTMLFieldSetElement = new Builder('', Base.field, this.pageName, 'field', Mode.date).field();
    const labelDate: HTMLLabelElement = this.createLabel(this.pageName, Mode.date);
    const inputDate: HTMLInputElement = this.createInput(this.pageName, Mode.date);

    inputFirstName.value = customer.firstName || '';
    inputLastName.value = customer.lastName || '';
    inputDate.value = customer.dateOfBirth || '';

    firstName.append(labelFirstName, inputFirstName);
    lastName.append(labelLastName, inputLastName);
    formFieldDate.append(labelDate, inputDate);
    accountInfoField.append(formTitle, firstName, lastName, formFieldDate);

    return accountInfoField;
  }

  public createAccountInfo(customer: Customer): HTMLFieldSetElement {
    const page: string = this.pageName;
    const accountInfoField: HTMLFieldSetElement = new Builder('', Base.prof_f, page, Elem.account, '').field();
    const formTitle: HTMLElement = new Builder('', '', page, Elem.subtitle, '').h(2);
    formTitle.textContent = `${Titles.CONTACT_INFO}`.toUpperCase();
    const content: HTMLElement = new Builder('div', '', page, Elem.content, '').element();
    const firstName: HTMLParagraphElement = new Builder('', '', page, Elem.text, Mode.f_name).p();
    const lastName: HTMLParagraphElement = new Builder('', '', page, Elem.text, Mode.l_name).p();
    const date: HTMLParagraphElement = new Builder('', '', page, Elem.text, Mode.date).p();
    const buttonEdit: HTMLButtonElement = new Builder('', Base.btns_edit, page, Elem.btn, Mode.account).button();
    buttonEdit.textContent = Buttons.EDIT;

    firstName.textContent = `${customer.firstName || ''}`;
    lastName.textContent = `${customer.lastName || ''}`;
    date.textContent = customer.dateOfBirth || '';

    content.append(firstName, lastName);
    accountInfoField.append(formTitle, content, date, buttonEdit);

    return accountInfoField;
  }

  public createAddressField(address: Address, type: string, defAddress: string): HTMLFieldSetElement {
    const page: string = this.pageName;
    let mode: string = type;
    if (defAddress) {
      mode = `${type}-${defAddress}`;
    }
    const addressField: HTMLFieldSetElement = new Builder('', Base.prof_f, page, Elem.address, mode).field();
    const formTitle: HTMLElement = new Builder('', '', page, Elem.subtitle, '').h(2);
    formTitle.textContent = `${defAddress} ${type} ${Titles.ADDRESS}`.toUpperCase().trim();
    const content: HTMLElement = new Builder('div', '', page, Elem.content, '').element();
    const street: HTMLElement = new Builder('', '', page, Elem.text, Mode.street).p();
    const postal: HTMLElement = new Builder('', '', page, Elem.text, Mode.postal).p();
    const city: HTMLElement = new Builder('', '', page, Elem.text, Mode.city).p();
    const country: HTMLElement = new Builder('', '', page, Elem.text, Mode.country).p();
    const buttonEdit: HTMLButtonElement = new Builder('', Base.btns_edit, page, Elem.btn, Mode.address).button();
    buttonEdit.textContent = Buttons.ADDRESS;

    street.textContent = `${address.streetName}`;
    postal.textContent = `${address.postalCode}`;
    city.textContent = `${address.city}`;
    country.textContent = `${address.country}`;

    content.append(street, postal, city, country);
    addressField.append(formTitle, content, buttonEdit);

    return addressField;
  }

  public createAddressUpdateForm(
    street: InputType,
    city: InputType,
    postal: InputType,
    country: InputType,
    title: string,
    mode: InputType,
    check?: HTMLElement
  ): HTMLFieldSetElement {
    const page: string = this.pageName;
    const formFieldAddress: HTMLFieldSetElement = new Builder('', Base.subform, page, Elem.address, mode).field();
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
}
