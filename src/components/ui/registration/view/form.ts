import { Base, Buttons, Elem, Mode } from '../../../models/builder';
import FormView from '../../builder/form';
import Builder from '../../builder/html-builder';

export default class FormViewReg extends FormView {
  public form: HTMLFormElement;

  constructor(pageName: string) {
    super(pageName);
    const form: HTMLFormElement = this.getForm();
    const formFieldFirstName: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.f_name).field();
    const labelFirstName: HTMLLabelElement = this.createLabel(pageName, Mode.f_name);
    const inputFirstName: HTMLInputElement = this.createInput(pageName, Mode.f_name);
    const formFieldLastName: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.l_name).field();
    const labelLastName: HTMLLabelElement = this.createLabel(pageName, Mode.l_name);
    const inputLastName: HTMLInputElement = this.createInput(pageName, Mode.l_name);
    const formFieldDate: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.date).field();
    const labelDate: HTMLLabelElement = this.createLabel(pageName, Mode.date);
    const inputDate: HTMLInputElement = this.createInput(pageName, Mode.date);
    const formFieldStreet: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.street).field();
    const labelStreet: HTMLLabelElement = this.createLabel(pageName, Mode.street);
    const inputStreet: HTMLInputElement = this.createInput(pageName, Mode.street);
    const formFieldCity: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.city).field();
    const labelCity: HTMLLabelElement = this.createLabel(pageName, Mode.city);
    const inputCity: HTMLInputElement = this.createInput(pageName, Mode.city);
    const formFieldPostal: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.postal).field();
    const labelPostal: HTMLLabelElement = this.createLabel(pageName, Mode.postal);
    const inputPostal: HTMLInputElement = this.createInput(pageName, Mode.postal);
    const formFieldCountry: HTMLFieldSetElement = new Builder('', Base.field, pageName, 'field', Mode.country).field();
    const labelCountry: HTMLLabelElement = this.createLabel(pageName, Mode.country);
    const inputCountry: HTMLInputElement = this.createInput(pageName, Mode.country);

    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.create).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.CREATE;

    formFieldFirstName.append(labelFirstName, inputFirstName);
    formFieldLastName.append(labelLastName, inputLastName);
    formFieldDate.append(labelDate, inputDate);
    formFieldStreet.append(labelStreet, inputStreet);
    formFieldCity.append(labelCity, inputCity);
    formFieldPostal.append(labelPostal, inputPostal);
    formFieldCountry.append(labelCountry, inputCountry);
    form.append(formFieldFirstName, formFieldLastName, formFieldDate, formFieldStreet, formFieldCity, formFieldPostal);
    form.append(formFieldCountry, buttonForm);
    this.form = form;
  }
}
