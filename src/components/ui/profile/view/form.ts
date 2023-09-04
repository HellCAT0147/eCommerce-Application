import { Address, Customer } from '@commercetools/platform-sdk';
import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import FormViewReg from '../../registration/view/form';
import { InputType } from '../../../models/validation';

export default class FormViewProfile extends FormViewReg {
  public constructor(pageName: string = Pages.PROFILE) {
    super(pageName);
    this.pageName = pageName;
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

  public createPasswordUpdateForm(): HTMLFieldSetElement {
    const page: string = this.pageName;
    const passwordField: HTMLFieldSetElement = new Builder('', Base.subform, page, Elem.pass, '').field();
    passwordField.setAttribute('id', `${Elem.modal}-${Mode.pass}`);
    const formTitle: HTMLElement = new Builder('', Base.form_title, Blocks.form, Elem.title, '').h(2);
    formTitle.textContent = `${Titles.UPDATE} ${Titles.PASSWORD} `;
    const currentPassword: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', Mode.pass).field();
    const labelPassword: HTMLLabelElement = this.createLabel(page, Mode.pass);
    const inputPassword: HTMLInputElement = this.createInput(page, Mode.pass);
    const newPassword: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', Mode.pass_new).field();
    const showPassword: HTMLButtonElement = this.createShowPassword();
    const labelNewPassword: HTMLLabelElement = this.createLabel(page, Mode.pass_new);
    const inputNewPassword: HTMLInputElement = this.createInput(page, Mode.pass_new);
    const showNewPassword: HTMLButtonElement = this.createShowPassword(Mode.new);
    const formFieldControl: HTMLFieldSetElement = new Builder('', Base.field, page, Elem.field, Mode.control).field();
    const buttonSave: HTMLButtonElement = new Builder('', Base.btns_colored, page, Elem.btn, Mode.save).button();
    buttonSave.classList.add(`${Base.btns_modal}`);
    buttonSave.textContent = Buttons.SAVE;
    const buttonBack: HTMLButtonElement = new Builder('', Base.btns_empty, page, Elem.btn, Mode.back).button();
    buttonBack.classList.add(`${Base.btns_modal}`);
    buttonBack.textContent = Buttons.BACK;

    currentPassword.append(labelPassword, inputPassword, showPassword);
    newPassword.append(labelNewPassword, inputNewPassword, showNewPassword);
    formFieldControl.append(buttonSave, buttonBack);
    passwordField.append(formTitle, currentPassword, newPassword, formFieldControl);

    return passwordField;
  }

  public createAccountInfoUpdateForm(): HTMLFieldSetElement {
    const page: string = this.pageName;
    const accountInfoField: HTMLFieldSetElement = new Builder('', Base.subform, page, Elem.account, '').field();
    accountInfoField.setAttribute('id', `${Elem.modal}-${Mode.account}`);
    const formTitle: HTMLElement = new Builder('', Base.form_title, Blocks.form, Elem.title, '').h(2);
    formTitle.textContent = `${Titles.UPDATE} ${Titles.CONTACT_INFO} `;
    const firstName: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', Mode.f_name).field();
    const labelFirstName: HTMLLabelElement = this.createLabel(page, Mode.f_name);
    const inputFirstName: HTMLInputElement = this.createInput(page, Mode.f_name);
    const lastName: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', Mode.l_name).field();
    const labelLastName: HTMLLabelElement = this.createLabel(page, Mode.l_name);
    const inputLastName: HTMLInputElement = this.createInput(page, Mode.l_name);
    const formFieldDate: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', Mode.date).field();
    const labelDate: HTMLLabelElement = this.createLabel(page, Mode.date);
    const inputDate: HTMLInputElement = this.createInput(page, Mode.date);
    const formFieldEmail: HTMLFieldSetElement = new Builder('', Base.field, page, Elem.field, Mode.email).field();
    const labelEmail: HTMLLabelElement = this.createLabel(page, Mode.email);
    const inputEmail: HTMLInputElement = this.createInput(page, Mode.email);
    const formFieldControl: HTMLFieldSetElement = new Builder('', Base.field, page, Elem.field, Mode.control).field();
    const buttonSave: HTMLButtonElement = new Builder('', Base.btns_colored, page, Elem.btn, Mode.save).button();
    buttonSave.classList.add(`${Base.btns_modal}`);
    buttonSave.textContent = Buttons.SAVE;
    const buttonBack: HTMLButtonElement = new Builder('', Base.btns_empty, page, Elem.btn, Mode.back).button();
    buttonBack.classList.add(`${Base.btns_modal}`);
    buttonBack.textContent = Buttons.BACK;

    firstName.append(labelFirstName, inputFirstName);
    lastName.append(labelLastName, inputLastName);
    formFieldDate.append(labelDate, inputDate);
    formFieldEmail.append(labelEmail, inputEmail);
    formFieldControl.append(buttonSave, buttonBack);
    accountInfoField.append(formTitle, firstName, lastName, formFieldDate, formFieldEmail, formFieldControl);

    return accountInfoField;
  }

  public createAccountInfo(customer: Customer): HTMLFieldSetElement {
    const page: string = this.pageName;
    const accountInfoField: HTMLFieldSetElement = new Builder('', Base.prof_f, page, Elem.account, '').field();
    accountInfoField.classList.add(`${page}__${Elem.wrapper}_${Mode.account}`);
    const formTitle: HTMLElement = new Builder('', '', page, Elem.subtitle, '').h(2);
    formTitle.textContent = `${Titles.CONTACT_INFO}`.toUpperCase();
    const content: HTMLElement = new Builder('div', '', page, Elem.content, '').element();
    const firstName: HTMLParagraphElement = new Builder('', '', page, Elem.text, Mode.f_name).p();
    const lastName: HTMLParagraphElement = new Builder('', '', page, Elem.text, Mode.l_name).p();
    const date: HTMLParagraphElement = new Builder('', '', page, Elem.text, Mode.date).p();
    const email: HTMLParagraphElement = new Builder('', '', page, Elem.text, Mode.email).p();
    const formFieldControl: HTMLFieldSetElement = new Builder('', Base.field, page, Elem.field, Mode.control).field();
    formFieldControl.classList.add(`${page}__${Elem.wrapper}_${Mode.control}`);
    const buttonEdit: HTMLButtonElement = new Builder('', Base.btns_edit, page, Elem.btn, Mode.account).button();
    buttonEdit.textContent = Buttons.EDIT;
    const buttonEditPassword: HTMLButtonElement = new Builder('', Base.btns_edit, page, Elem.btn, Mode.pass).button();
    buttonEditPassword.textContent = Buttons.CHANGE_PASS;

    firstName.textContent = `${customer.firstName || ''}`;
    lastName.textContent = `${customer.lastName || ''}`;
    date.textContent = customer.dateOfBirth || '';
    email.textContent = customer.email || '';

    content.append(firstName, lastName);
    formFieldControl.append(buttonEdit, buttonEditPassword);
    accountInfoField.append(formTitle, content, date, email, formFieldControl);

    return accountInfoField;
  }

  public createCheckBoxes(checkBoxes: HTMLFieldSetElement): void {
    const checkBilling: HTMLElement = new Builder('div', Base.check, this.pageName, Elem.field, Mode.bill).element();
    const inputBilling: HTMLInputElement = this.createInput(this.pageName, Mode.bill);
    const labelBilling: HTMLLabelElement = this.createLabel(this.pageName, Mode.bill, Titles.BILLING, true);
    checkBilling.append(inputBilling, labelBilling);
    const checkShipping: HTMLElement = new Builder('div', Base.check, this.pageName, Elem.field, Mode.ship).element();
    const inputShipping: HTMLInputElement = this.createInput(this.pageName, Mode.ship);
    const labelShipping: HTMLLabelElement = this.createLabel(this.pageName, Mode.ship, Titles.SHIPPING, true);
    checkShipping.append(inputShipping, labelShipping);
    const checkBillDef: HTMLElement = new Builder(
      'div',
      Base.check,
      this.pageName,
      Elem.field,
      Mode.bill_def
    ).element();
    const inputBillDef: HTMLInputElement = this.createInput(this.pageName, Mode.bill_def);
    const labelBillDef: HTMLLabelElement = this.createLabel(this.pageName, Mode.bill_def, Titles.DEFAULT_BILL, true);
    checkBillDef.append(inputBillDef, labelBillDef);
    const checkBillShip: HTMLElement = new Builder(
      'div',
      Base.check,
      this.pageName,
      Elem.field,
      Mode.ship_def
    ).element();
    const inputShipDef: HTMLInputElement = this.createInput(this.pageName, Mode.ship_def);
    const labelShipDef: HTMLLabelElement = this.createLabel(this.pageName, Mode.ship_def, Titles.DEFAULT_SHIP, true);
    checkBillShip.append(inputShipDef, labelShipDef);

    checkBoxes.append(checkBilling, checkShipping, checkBillDef, checkBillShip);
  }

  public createAddressField(type: string, defAddress: string, address?: Address): HTMLFieldSetElement {
    const page: string = this.pageName;
    let mode: string = type;
    if (defAddress) {
      mode = `${type}-${defAddress}`;
    }
    const addressField: HTMLFieldSetElement = new Builder('', Base.prof_f, page, Elem.address, mode).field();
    const formTitle: HTMLElement = new Builder('', '', page, Elem.subtitle, '').h(2);
    formTitle.textContent = `${defAddress} ${type} ${Titles.ADDRESS}`.toUpperCase().trim();
    const content: HTMLElement = new Builder('div', '', page, Elem.content, '').element();
    const info: HTMLElement = new Builder('', '', page, Elem.text, Mode.info).p();
    const street: HTMLElement = new Builder('', '', page, Elem.text, Mode.street).p();
    const postal: HTMLElement = new Builder('', '', page, Elem.text, Mode.postal).p();
    const city: HTMLElement = new Builder('', '', page, Elem.text, Mode.city).p();
    const country: HTMLElement = new Builder('', '', page, Elem.text, Mode.country).p();
    const formFieldControl: HTMLFieldSetElement = new Builder('', Base.field, page, Elem.field, Mode.control).field();
    formFieldControl.classList.add(`${page}__${Elem.wrapper}_${Mode.control}`);
    if (address && address.id) {
      const buttonEdit: HTMLButtonElement = new Builder('', Base.btns_edit, page, Elem.btn, Mode.address).button();
      buttonEdit.textContent = Buttons.EDIT_ADDRESS;
      buttonEdit.setAttribute('data-id', `${address.id}`);
      const buttonDelete: HTMLButtonElement = new Builder('', Base.btns_edit, page, Elem.btn, Mode.del).button();
      buttonDelete.textContent = Buttons.DEL_ADDRESS;
      buttonDelete.setAttribute('data-id', `${address.id}`);
      formFieldControl.append(buttonEdit, buttonDelete);
    } else {
      const buttonAdd: HTMLButtonElement = new Builder('', Base.btns_edit, page, Elem.btn, Mode.add).button();
      buttonAdd.textContent = Buttons.ADD_ADDRESS;
      formFieldControl.appendChild(buttonAdd);
    }

    if (address) {
      street.textContent = `${address.streetName},`;
      postal.textContent = `${address.postalCode},`;
      city.textContent = `${address.city},`;
      country.textContent = `${address.country}.`;
    } else {
      info.textContent = `${Titles.HAVE_NOT} ${defAddress} ${type} ${Elem.address}`;
    }

    content.append(street, postal, city, country);
    addressField.append(formTitle, info, content, formFieldControl);

    return addressField;
  }

  public createAddressUpdateForm(
    street: InputType,
    city: InputType,
    postal: InputType,
    country: InputType,
    title: string,
    mode: string,
    check?: HTMLElement
  ): HTMLFieldSetElement {
    const page: string = this.pageName;
    const formFieldAddress: HTMLFieldSetElement = new Builder(
      '',
      Base.subform,
      Blocks.modal,
      Elem.address,
      mode
    ).field();
    const formTitleShip: HTMLElement = new Builder('h2', Base.form_title, Blocks.form, Elem.title, '').element();
    formTitleShip.textContent = `${title} ${Titles.ADDRESS}`;
    const formFieldCountry: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', country).field();
    const labelCountry: HTMLLabelElement = this.createLabel(page, country);
    const inputCountry: HTMLSelectElement = this.createSelectMenu(page, country);
    const formFieldPostal: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', postal).field();
    const labelPostal: HTMLLabelElement = this.createLabel(page, postal);
    const inputPostal: HTMLInputElement = this.createInput(page, postal);
    const formFieldCity: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', city).field();
    const labelCity: HTMLLabelElement = this.createLabel(page, city);
    const inputCity: HTMLInputElement = this.createInput(page, city);
    const formFieldStreet: HTMLFieldSetElement = new Builder('', Base.field, page, 'field', street).field();
    const labelStreet: HTMLLabelElement = this.createLabel(page, street);
    const inputStreet: HTMLInputElement = this.createInput(page, street);
    const box: HTMLFieldSetElement = new Builder('', Base.field, page, Elem.field, Mode.check).field();
    this.createCheckBoxes(box);
    const formFieldControl: HTMLFieldSetElement = new Builder('', Base.field, page, Elem.field, Mode.control).field();
    const buttonSave: HTMLButtonElement = new Builder('', Base.btns_colored, page, Elem.btn, Mode.save).button();
    buttonSave.classList.add(`${Base.btns_modal}`);
    buttonSave.textContent = Buttons.SAVE;
    const buttonBack: HTMLButtonElement = new Builder('', Base.btns_empty, page, Elem.btn, Mode.back).button();
    buttonBack.classList.add(`${Base.btns_modal}`);
    buttonBack.textContent = Buttons.BACK;
    formFieldStreet.append(labelStreet, inputStreet);
    formFieldCity.append(labelCity, inputCity);
    formFieldPostal.append(labelPostal, inputPostal);
    formFieldCountry.append(labelCountry, inputCountry);
    formFieldAddress.appendChild(formTitleShip);
    if (check) formFieldAddress.appendChild(check);
    formFieldControl.append(buttonSave, buttonBack);
    formFieldAddress.append(formFieldCountry, formFieldPostal, formFieldCity, formFieldStreet, box, formFieldControl);
    return formFieldAddress;
  }
}
