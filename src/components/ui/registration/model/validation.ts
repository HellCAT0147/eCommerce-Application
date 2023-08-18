// TODO adapt setErrors
// import { Errors, RegistrationInputType } from '../../../models/validation';
import ValidationModel from '../../login/model/validation';

export default class RegistrationValidationModel extends ValidationModel {
  private firstName: string = '';

  public checkName(name: string): boolean {
    const regexp: RegExp = /^[a-zA-Zа-яА-ЯёЁғҒиИйЙкКқҚлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШъЪьЬэЭюЮяЯ]+$/u;
    if (name.match(regexp)) {
      this.firstName = name;
      // TODO adapt setErrors
      // this.setErrors('first-name', []);
      return true;
    }
    this.firstName = '';
    return false;
  }

  public checkBirthDate(date: string): boolean {
    const regexp: RegExp = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(regexp)) return false;

    const minDate = new Date();
    const maxDate = new Date();
    const inputDate = new Date(date);

    minDate.setFullYear(minDate.getFullYear() - 150);
    maxDate.setFullYear(maxDate.getFullYear() - 13);
    if (inputDate < minDate || inputDate > maxDate) return false;

    return true;
  }

  public checkStreet(street: string): boolean {
    return true;
  }

  public checkPostal(postal: string): boolean {
    return true;
  }

  public checkCountry(country: string): boolean {
    return true;
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
