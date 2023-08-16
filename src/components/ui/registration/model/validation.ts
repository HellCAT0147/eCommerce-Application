// TODO adapt setErrors
// import { Errors, RegistrationInputType } from '../../../models/validation';
import ValidationModel from '../../login/model/validation';

export default class RegistrationValidationModel extends ValidationModel {
  private firstName: string = '';

  public testCheck(name: string): boolean {
    const regexp: RegExp = /^[^\d\s~`!@№#$%^&*()\-_=+[{\]};:'",<.>/?\\|]+$/;
    if (name.match(regexp)) {
      this.firstName = name;
      // TODO adapt setErrors
      // this.setErrors('first-name', []);
      return true;
    }
    this.firstName = '';
    return false;
  }

  // TODO adapt setErrors
  /* protected setErrors(inputType: RegistrationInputType, errors: Errors[]): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    inputs.forEach((input) => {
      if (input.classList.contains(`login__input_${inputType}`)) {
        this.formView.showErrors(input.parentElement, errors, inputType);
      }
    });
    this.checkSendable();
  } */
}
