import { Address, ErrorObject } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import { Countries, DateErrors, Errors, InputType, NameErrors, PostalErrors } from '../../../models/validation';
import ValidationModel from '../../login/model/validation';
import FormViewReg from '../view/form';
import { Pages, Routes } from '../../../models/router';
import basicRoutes from '../../router/model/routes';
import { Blocks, Elem, Mode } from '../../../models/builder';

export default class RegistrationValidationModel extends ValidationModel {
  private firstName: string;

  private lastName: string;

  private date: string;

  private country: Countries | string;

  private countryBill: Countries | string;

  private postal: string;

  private postalBill: string;

  private city: string;

  private cityBill: string;

  private street: string;

  private streetBill: string;

  private shippingIsBilling: boolean;

  private shippingDefault: 0 | undefined;

  private billingDefault: 0 | 1 | undefined;

  private billingIndexAddress: 0 | 1;

  protected formViewReg: FormViewReg;

  public constructor(eCommerceApi: ECommerceApi) {
    super(eCommerceApi);
    this.eCommerceApi = eCommerceApi;
    this.formViewReg = new FormViewReg();
    this.firstName = '';
    this.lastName = '';
    this.date = '';
    this.country = '';
    this.countryBill = '';
    this.postal = '';
    this.postalBill = '';
    this.city = '';
    this.cityBill = '';
    this.street = '';
    this.streetBill = '';
    this.shippingIsBilling = true;
    this.shippingDefault = 0;
    this.billingDefault = 0;
    this.billingIndexAddress = 0;
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

    if (target.includes('city-bill')) {
      this.cityBill = '';
      errorsHandling('City');
      this.setErrors('city-bill', errors);
    } else if (target.includes('city')) {
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
      const maxRealAge: number = 150;
      const minLimitAge: number = 13;
      const increaseInfelicityDays: number = 1;

      minDate.setFullYear(minDate.getFullYear() - maxRealAge);
      maxDate.setFullYear(maxDate.getFullYear() - minLimitAge);
      maxDate.setDate(maxDate.getDate() + increaseInfelicityDays);
      if (inputDate >= minDate && inputDate <= maxDate) {
        this.date = date;
        this.setErrors(`${Mode.date}`, []);
        return true;
      }
    }

    this.date = '';
    const errors: DateErrors[] = [];
    if (inputDate < minDate) errors.push(DateErrors.correct);
    else if (inputDate > maxDate) errors.push(DateErrors.noChild);
    else errors.push(DateErrors.invalid);
    this.setErrors(`${Mode.date}`, errors);

    return false;
  }

  public checkCountry(select: HTMLSelectElement): boolean {
    let postalCodeInput: HTMLInputElement | null;

    if (select.id.includes('bill')) {
      this.postalBill = '';
      postalCodeInput = document.querySelector(`.${Blocks.reg}__${Elem.input}_${Mode.postal_bill}`);
    } else {
      this.postal = '';
      postalCodeInput = document.querySelector(`.${Blocks.reg}__${Elem.input}_${Mode.postal}`);
    }
    this.formViewReg.resetPostal(select.parentElement);

    const country: string = select.value;
    const countries: string[] = Object.values(Countries);
    if (countries.includes(country)) {
      if (select.id.includes('bill')) {
        this.countryBill = country;
        this.setErrors('country-bill', [], select);
        if (postalCodeInput) this.checkPostal('', postalCodeInput.id);
      } else {
        this.country = country;
        this.setErrors('country', [], select);
        if (postalCodeInput) this.checkPostal('', postalCodeInput.id);
      }
      return true;
    }

    if (select.id.includes('bill')) {
      this.countryBill = '';
      this.setErrors('country-bill', [PostalErrors.notSelected], select);
    } else {
      this.country = '';
      this.setErrors('country', [PostalErrors.notSelected], select);
    }

    if (postalCodeInput) this.checkPostal('', postalCodeInput.id);

    return false;
  }

  public checkPostal(postal: string, target: string): boolean {
    let regexp: RegExp;
    const country: Countries | string = target.includes('bill') ? this.countryBill : this.country;
    switch (country) {
      case Countries.BY:
      case Countries.RU:
      case Countries.UZ:
        regexp = /^\d{6}$/;
        break;
      case Countries.US:
        regexp = /^\d{5}(-\d{4})?$/;
        break;
      default:
        this.setErrors(`postal-code${target.includes('bill') ? '-bill' : ''}`, [PostalErrors.notSelected]);
        return false;
    }
    if (postal.match(regexp)) {
      if (target.includes('bill')) this.postalBill = postal;
      else this.postal = postal;
      this.setErrors(`postal-code${target.includes('bill') ? '-bill' : ''}`, []);
      return true;
    }
    switch (country) {
      case Countries.BY:
        this.setErrors(`postal-code${target.includes('bill') ? '-bill' : ''}`, [PostalErrors.BY]);
        break;
      case Countries.RU:
        this.setErrors(`postal-code${target.includes('bill') ? '-bill' : ''}`, [PostalErrors.RU]);
        break;
      case Countries.US:
        this.setErrors(`postal-code${target.includes('bill') ? '-bill' : ''}`, [PostalErrors.US]);
        break;
      case Countries.UZ:
        this.setErrors(`postal-code${target.includes('bill') ? '-bill' : ''}`, [PostalErrors.UZ]);
        break;
      default:
        break;
    }
    return false;
  }

  public checkStreet(target: HTMLInputElement): boolean {
    const street: string = target.value;
    this.prepareAddress();

    if (street.trim().length) {
      if (target.id.includes('bill')) {
        this.streetBill = street;
        this.setErrors('street-bill', []);
      } else {
        this.street = street;
        this.setErrors('street', []);
      }
      return true;
    }

    const msg: string = 'Must contain at least one character';
    if (target.id.includes('bill')) {
      this.streetBill = '';
      this.setErrors('street-bill', [msg]);
    } else {
      this.street = '';
      this.setErrors('street', [msg]);
    }

    return false;
  }

  public checkBothAddress(): boolean {
    this.shippingIsBilling = !this.shippingIsBilling;
    if (this.billingIndexAddress === 0) this.billingIndexAddress = 1;
    else this.billingIndexAddress = 0;
    this.setBillingDefault();
    this.setBillingDefault();
    this.formViewReg.showBillingAddress(this.shippingIsBilling);
    return this.shippingIsBilling;
  }

  public setBillingDefault(): 0 | 1 | undefined {
    this.billingDefault = this.billingDefault === undefined ? this.billingIndexAddress : undefined;
    return this.billingDefault;
  }

  public setShippingDefault(): 0 | undefined {
    this.shippingDefault = this.shippingDefault === undefined ? 0 : undefined;
    return this.shippingDefault;
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

  protected checkSendable(): boolean {
    if (
      this.mail !== '' &&
      this.password !== '' &&
      this.firstName !== '' &&
      this.lastName !== '' &&
      this.date !== '' &&
      this.country !== '' &&
      this.postal !== '' &&
      this.city !== '' &&
      this.street !== ''
    ) {
      if (this.shippingIsBilling) this.isValid = true;
      else if (this.countryBill !== '' && this.postalBill !== '' && this.cityBill !== '' && this.streetBill !== '')
        this.isValid = true;
      else this.isValid = false;
    } else this.isValid = false;

    return this.isValid;
  }

  private getCountryCode(country: Countries | string): string {
    const fullCountries: string[] = Object.values(Countries);
    const countriesCodes: string[] = Object.keys(Countries);
    let id: number = 0;

    fullCountries.forEach((localCountry, i) => {
      if (localCountry === country) id = i;
    });

    return countriesCodes[id];
  }

  private prepareAddress(): Address[] {
    const addresses: Address[] = [];
    const shippingAddress: Address = {
      country: this.getCountryCode(this.country),
      postalCode: this.postal,
      city: this.city,
      streetName: this.street,
    };
    addresses.push(shippingAddress);

    if (!this.shippingIsBilling) {
      addresses.push({
        country: this.getCountryCode(this.countryBill),
        postalCode: this.postalBill,
        city: this.cityBill,
        streetName: this.streetBill,
      });
    }

    return addresses;
  }

  public async send(): Promise<void> {
    if (this.checkSendable()) {
      this.formViewReg.setSendButtonDisableState(true);
      try {
        const response: ErrorObject | boolean = await this.eCommerceApi.register(
          this.mail,
          this.password,
          this.firstName,
          this.lastName,
          new Date(this.date),
          this.prepareAddress(),
          [this.billingIndexAddress],
          [0],
          this.billingDefault,
          this.shippingDefault
        );
        if (response === true) {
          this.eCommerceApi.logout();
          const responseLogin: ErrorObject | true = await this.eCommerceApi.login(this.mail, this.password);
          if (responseLogin === true) {
            const route: Routes | undefined = basicRoutes.find((routeExisting) => routeExisting.path === Pages.MAIN);
            if (route) route.callback(true);
            this.formView.showSuccessLoginMessage();
            this.resetFields();
            window.history.pushState(null, '', `/${Pages.MAIN}`);
          } else {
            this.formView.reminder(responseLogin.message);
          }
        } else if (response !== false) {
          this.eCommerceApi.logout();
          this.formView.reminder(response.message);
        }
      } catch (error) {
        if (error instanceof Error) this.formView.reminder(error.message);
      }
      this.formViewReg.setSendButtonDisableState(false);
    } else {
      this.formView.reminder(null, Blocks.reg);
    }
  }

  protected resetFields(): void {
    this.mail = '';
    this.password = '';
    this.isValid = false;

    this.firstName = '';
    this.lastName = '';
    this.date = '';
    this.country = '';
    this.countryBill = '';
    this.postal = '';
    this.postalBill = '';
    this.city = '';
    this.cityBill = '';
    this.street = '';
    this.streetBill = '';
    this.shippingIsBilling = true;
    this.shippingDefault = 0;
    this.billingDefault = 0;
    this.billingIndexAddress = 0;
  }
}
