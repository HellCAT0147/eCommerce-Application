// TODO adapt setErrors
// import { Errors, RegistrationInputType } from '../../../models/validation';
import ECommerceApi from '../../../api/e-commerce-api';
import { Countries, DateErrors, Errors, InputType, NameErrors, PostalErrors } from '../../../models/validation';
import ValidationModel from '../../login/model/validation';
import FormViewReg from '../view/form';

export default class RegistrationValidationModel extends ValidationModel {
  private firstName: string;

  private lastName: string;

  private city: string;

  private cityBill: string;

  private date: string;

  private country: Countries | string;

  private postal: string;

  private street: string;

  protected formViewReg: FormViewReg;

  public constructor(eCommerceApi: ECommerceApi) {
    super(eCommerceApi);
    this.formViewReg = new FormViewReg();
    this.firstName = '';
    this.lastName = '';
    this.city = '';
    this.cityBill = '';
    this.date = '';
    this.country = '';
    this.postal = '';
    this.street = '';
  }

  public checkName(name: string, target: string): boolean {
    const regexp: RegExp = /^[a-zA-Zа-яА-ЯёЁғҒиИйІіЙкКқҚлЛмМнНоОпПрРсСтТуУЎўфФхХцЦчЧшШъЪьЬэЭюЮяЯ\s'-]+$/u;
    if (name.match(regexp)) {
      if (target.includes('city') && target.includes('bill')) {
        this.cityBill = name;
        this.setErrors('city-bill', []);
      } else if (target.includes('city')) {
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
    const minDate = new Date();
    const maxDate = new Date();
    const inputDate = new Date(date);

    if (date.match(regexp)) {
      minDate.setFullYear(minDate.getFullYear() - 150);
      maxDate.setFullYear(maxDate.getFullYear() - 13);
      if (inputDate >= minDate && inputDate <= maxDate) {
        this.date = date;
        this.setErrors('date-of-birth', []);
        return true;
      }
    }

    this.date = '';
    const errors: DateErrors[] = [];
    if (inputDate < minDate) errors.push(DateErrors.correct);
    else if (inputDate > maxDate) errors.push(DateErrors.noChild);
    else errors.push(DateErrors.invalid);
    this.setErrors('date-of-birth', errors);

    return false;
  }

  public checkCountry(select: HTMLSelectElement): boolean {
    this.postal = '';
    this.formViewReg.resetPostal(select.parentElement);

    const country: string = select.value;
    const countries: string[] = Object.values(Countries);
    if (countries.includes(country)) {
      this.country = country;
      this.setErrors('country', [], select);
      this.checkPostal('');
      return true;
    }
    this.country = '';
    this.checkPostal('');
    this.setErrors('country', [PostalErrors.notSelected], select);
    return false;
  }

  public checkPostal(postal: string): boolean {
    let regexp: RegExp;
    switch (this.country) {
      case Countries.BY:
      case Countries.RU:
      case Countries.UZ:
        regexp = /^\d{6}$/;
        break;
      case Countries.US:
        regexp = /^\d{5}(-\d{4})?$/;
        break;
      default:
        this.setErrors('postal-code', [PostalErrors.notSelected]);
        return false;
    }
    if (postal.match(regexp)) {
      this.postal = postal;
      this.setErrors('postal-code', []);
      return true;
    }
    switch (this.country) {
      case Countries.BY:
        this.setErrors('postal-code', [PostalErrors.BY]);
        break;
      case Countries.RU:
        this.setErrors('postal-code', [PostalErrors.RU]);
        break;
      case Countries.US:
        this.setErrors('postal-code', [PostalErrors.US]);
        break;
      case Countries.UZ:
        this.setErrors('postal-code', [PostalErrors.UZ]);
        break;
      default:
        break;
    }
    return false;
  }

  public checkStreet(street: string): boolean {
    if (street.trim().length) {
      this.street = street;
      this.setErrors('street', []);
      return true;
    }
    this.street = '';
    this.setErrors('street', ['Must contain at least one character']);
    return false;
  }

  protected setErrors(inputType: InputType, errors: Errors[] | string[], select?: HTMLSelectElement): void {
    if (select) {
      this.formViewReg.showErrors(select.parentElement, errors, inputType);
      this.checkSendable();
      return;
    }
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    inputs.forEach((input) => {
      if (input.classList.contains(`registration__input_${inputType}`)) {
        this.formViewReg.showErrors(input.parentElement, errors, inputType);
      }
    });
    this.checkSendable();
  }
}
