import { Base, Buttons, Elem, Mode } from '../../../models/builder';
import FormView from '../../builder/form';
import Builder from '../../builder/html-builder';

export default class FormViewLogin extends FormView {
  public form: HTMLFormElement;

  constructor(pageName: string) {
    super(pageName);
    const form: HTMLFormElement = this.getForm();
    const buttonForm: HTMLButtonElement = new Builder('', Base.btns_colored, pageName, Elem.btn, Mode.sign).button();
    buttonForm.classList.add('form__button');
    buttonForm.textContent = Buttons.SIGN;

    form.append(buttonForm);

    this.form = form;
  }
}
