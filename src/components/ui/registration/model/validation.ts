// TODO adapt setErrors
// import { Errors, RegistrationInputType } from '../../../models/validation';
import ECommerceApi from '../../../api/e-commerce-api';
import { Errors, InputType, NameErrors } from '../../../models/validation';
import ValidationModel from '../../login/model/validation';
import FormViewReg from '../view/form';

export default class RegistrationValidationModel extends ValidationModel {
  private firstName: string = '';

  private lastName: string = '';

  private city: string = '';

  protected formViewReg: FormViewReg;

  public constructor(eCommerceApi: ECommerceApi) {
    super(eCommerceApi);
    this.formViewReg = new FormViewReg();
  }

  public checkName(name: string, target: string): boolean {
    const regexp: RegExp = /^[a-zA-Zа-яА-ЯёЁғҒиИйЙкКқҚлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШъЪьЬэЭюЮяЯ\s'-]+$/u;
    if (name.match(regexp)) {
      if (target.includes('city')) {
        this.city = name;
        this.setErrors('city', []);
      } else if (target.includes('first')) {
        this.firstName = name;
        this.setErrors('first-name', []);
      } else {
        this.lastName = name;
        this.setErrors('last-name', []);
      }
      return true;
    }

    this.getNameErrors(target, name);

    return false;
  }

  private getNameErrors(target: string, name: string): string[] {
    const errors: string[] = [];

    function errorsHandling(textName: string): void {
      if (!name.length) errors.push(`${textName} ${NameErrors.short}`);
      else if (name.match(/\d/)) errors.push(`${textName} ${NameErrors.noDigit}`);
      else errors.push(`${textName} ${NameErrors.noChar}`);
    }

    if (target.includes('city')) {
      this.city = '';
      errorsHandling('City');
      this.setErrors('city', errors);
    } else if (target.includes('first')) {
      this.firstName = '';
      errorsHandling('First');
      this.setErrors('first-name', errors);
    } else {
      this.lastName = '';
      errorsHandling('Last');
      this.setErrors('last-name', errors);
    }

    return errors;
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

  protected setErrors(inputType: InputType, errors: Errors[] | string[]): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    inputs.forEach((input) => {
      if (input.classList.contains(`registration__input_${inputType}`)) {
        this.formViewReg.showErrors(input.parentElement, errors, inputType);
      }
    });
    this.checkSendable();
  }
}
