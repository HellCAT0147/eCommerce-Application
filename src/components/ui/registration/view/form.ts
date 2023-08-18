import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import FormView from '../../builder/form';
import Builder from '../../builder/html-builder';

export default class FormViewReg extends FormView {
  public form: HTMLFormElement;

  constructor(pageName: string = Pages.REGISTRATION) {
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
    const inputCheckBilling: HTMLInputElement = this.createInput(pageName, Mode.check_bill);
    const fieldAddress: HTMLFieldSetElement = this.createAddress(Mode.street, Mode.city, Mode.postal, Mode.country);
    const fieldAddressBilling: HTMLFieldSetElement = this.createAddress(
      Mode.street_bill,
      Mode.city_bill,
      Mode.postal_bill,
      Mode.country_bill
    );
    const inputDate: HTMLInputElement = this.createInput(pageName, Mode.date);
    const formTitleShip: HTMLElement = new Builder('h2', Base.form_title, Blocks.form, Elem.title, Mode.ship).element();
    formTitleShip.textContent = `${Titles.SHIPPING} ${Titles.ADDRESS}`;
    const formTitleBill: HTMLElement = new Builder('h2', Base.form_title, Blocks.form, Elem.title, Mode.bill).element();
    formTitleBill.textContent = `${Titles.BILLING} ${Titles.ADDRESS}`;
    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.create).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.CREATE;

    formFieldFirstName.append(labelFirstName, inputFirstName);
    formFieldLastName.append(labelLastName, inputLastName);
    formFieldDate.append(labelDate, inputDate);
    fieldAddress.prepend(formTitleShip);
    fieldAddressBilling.prepend(formTitleBill);
    form.prepend(formTitle);
    form.append(formFieldFirstName, formFieldLastName, formFieldDate);
    form.append(fieldAddress, inputCheckBilling, fieldAddressBilling, buttonForm);
    this.form = form;
  }
}
