import { Customer, ErrorObject } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ViewProfile from '../view/view';
import { Blocks, Elem, Mode } from '../../../models/builder';
import { DateErrors, Errors, InputType, MailErrors, NameErrors, PasswordErrors } from '../../../models/validation';

class ModelProfile {
  protected eCommerceApi: ECommerceApi;

  protected view: ViewProfile;

  private mail: string;

  private newPassword: string;

  private password: string;

  private isValid: boolean;

  private firstName: string;

  private lastName: string;

  private date: string;

  private city: string;

  private cityBill: string;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new ViewProfile();
    this.mail = '';
    this.newPassword = '';
    this.password = '';
    this.isValid = false;
    this.firstName = '';
    this.lastName = '';
    this.date = '';
    this.city = '';
    this.cityBill = '';
  }

  protected checkSendableAccount(): boolean {
    if (this.mail !== '' && this.firstName !== '' && this.lastName !== '' && this.date !== '') this.isValid = true;
    else this.isValid = false;

    return this.isValid;
  }

  protected checkSendablePassword(): boolean {
    if (this.password !== '' && this.newPassword) this.isValid = true;
    else this.isValid = false;

    return this.isValid;
  }

  protected setErrors(inputType: InputType, errors: Errors[] | string[], select?: HTMLSelectElement): void {
    if (select) {
      this.view.showErrors(select.parentElement, errors, inputType);
      if (
        inputType === Mode.email ||
        inputType === Mode.f_name ||
        inputType === Mode.l_name ||
        inputType === Mode.date
      ) {
        this.checkSendableAccount();
      }
      return;
    }
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    inputs.forEach((input) => {
      if (input.classList.contains(`${Blocks.prof}__${Elem.input}_${inputType}`)) {
        this.view.showErrors(input.parentElement, errors, inputType);
      }
    });
    if (inputType === Mode.email || inputType === Mode.f_name || inputType === Mode.l_name || inputType === Mode.date) {
      this.checkSendableAccount();
    }
  }

  private setNoErrors(inputTypes: InputType[]): void {
    inputTypes.forEach((inputType) => this.setErrors(inputType, []));
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

  public checkPassword(password: string): boolean {
    const regexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/;
    if (password.match(regexp)) {
      this.password = password;
      this.setErrors('password', []);
      return true;
    }
    this.password = '';

    const errors: PasswordErrors[] = [];
    if (!password.match(/[a-z]/)) errors.push(PasswordErrors.lower);
    if (!password.match(/[A-Z]/)) errors.push(PasswordErrors.upper);
    if (!password.match(/[0-9]/)) errors.push(PasswordErrors.digit);
    if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) errors.push(PasswordErrors.char);
    if (password.length < 8) errors.push(PasswordErrors.short);
    if (password.match(/\s/)) errors.push(PasswordErrors.space);
    this.setErrors('password', errors);

    return false;
  }

  public checkNewPassword(password: string): boolean {
    const regexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/;
    if (password.match(regexp)) {
      this.newPassword = password;
      this.setErrors('password-new', []);
      return true;
    }
    this.newPassword = '';

    const errors: PasswordErrors[] = [];
    if (!password.match(/[a-z]/)) errors.push(PasswordErrors.lower);
    if (!password.match(/[A-Z]/)) errors.push(PasswordErrors.upper);
    if (!password.match(/[0-9]/)) errors.push(PasswordErrors.digit);
    if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) errors.push(PasswordErrors.char);
    if (password.length < 8) errors.push(PasswordErrors.short);
    if (password.match(/\s/)) errors.push(PasswordErrors.space);
    this.setErrors('password-new', errors);

    return false;
  }

  public checkMail(mail: string): boolean {
    const regexp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.match(regexp)) {
      this.mail = mail;
      this.setErrors('email', []);
      return true;
    }
    this.mail = '';

    const errors: MailErrors[] = [];
    if (!mail.includes('@')) {
      errors.push(MailErrors.at);
      errors.push(MailErrors.domain);
    } else if (mail.split('@').pop() === '') errors.push(MailErrors.domain);
    if (mail !== mail.trim()) errors.push(MailErrors.space);
    if (!errors.length) errors.push(MailErrors.format);
    this.setErrors('email', errors);

    return false;
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

  private setCurrentPassword(password: string | undefined): void {
    if (password) this.password = password;
  }

  public async openEditMode(target: HTMLElement): Promise<void> {
    try {
      const response: Customer | ErrorObject = await this.eCommerceApi.getCustomer();
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else {
        if (response.firstName) this.firstName = response.firstName;
        if (response.lastName) this.lastName = response.lastName;
        if (response.email) this.mail = response.email;
        if (response.dateOfBirth) this.date = response.dateOfBirth;
        if (target.classList.contains(`${Blocks.prof}__${Elem.btn}_${Mode.account}`)) {
          this.view.fillAccountModal(target);
          this.view.toggleDisplayModal(`${Mode.account}`, true);
          this.setNoErrors(['first-name', 'last-name', 'date-of-birth', 'email']);
        }
        if (target.classList.contains(`${Blocks.prof}__${Elem.btn}_${Mode.address}`)) {
          this.view.fillAddressModal(target);
          this.view.toggleDisplayModal(`${Mode.address}`, true);
        }
        if (target.classList.contains(`${Blocks.prof}__${Elem.btn}_${Mode.pass}`)) {
          this.setCurrentPassword(response.password);
          this.view.toggleDisplayModal(`${Mode.pass}`, true);
        }
      }
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }

  public modalEvent(target: HTMLElement): void {
    if (target.classList.contains(`${Blocks.prof}__${Elem.btn}_${Mode.back}`)) {
      if (target.closest(`.${Blocks.prof}__${Elem.modal}_${Mode.account}`))
        this.view.toggleDisplayModal(`${Mode.account}`, false);
      if (target.closest(`.${Blocks.prof}__${Elem.modal}_${Mode.address}`))
        this.view.toggleDisplayModal(`${Mode.address}`, false);
      if (target.closest(`.${Blocks.prof}__${Elem.modal}_${Mode.pass}`))
        this.view.toggleDisplayModal(`${Mode.pass}`, false);
    }
    if (target.classList.contains(`${Blocks.prof}__${Elem.btn}_${Mode.save}`)) {
      if (target.closest(`.${Blocks.prof}__${Elem.modal}_${Mode.account}`)) this.updateAccountInfo();
      if (target.closest(`.${Blocks.prof}__${Elem.modal}_${Mode.address}`))
        this.view.toggleDisplayModal(`${Mode.address}`, false);
      if (target.closest(`.${Blocks.prof}__${Elem.modal}_${Mode.pass}`)) this.updatePassword();
    }
  }

  public switchPasswordView(button: HTMLButtonElement | null, id?: string): void {
    if (button) {
      if (id) {
        this.view.switchPasswordView(button, id);
        return;
      }
      this.view.switchPasswordView(button);
    }
  }

  public async updatePassword(): Promise<void> {
    if (this.checkSendablePassword()) {
      try {
        // console.log('Change Password');
        // const response: Customer | ErrorObject = await this.eCommerceApi.updatePersonalData(
        //   this.firstName,
        //   this.lastName,
        //   new Date(this.date),
        //   this.mail
        // );
        // if ('message' in response && 'code' in response) {
        //   this.view.showMessage(false, response.message);
        //   this.view.showError(response.message);
        // } else if (response) {
        //   this.view.toggleDisplayModal(`${Mode.account}`, false);
        //   this.view.showMessage(true);
        //   await this.getProfile(Mode.update);
        // }
      } catch (error) {
        if (error instanceof Error) this.view.showError(error.message);
      }
    } else {
      this.view.reminder();
    }
  }

  public async updateAccountInfo(): Promise<void> {
    if (this.checkSendableAccount()) {
      try {
        const response: Customer | ErrorObject = await this.eCommerceApi.updatePersonalData(
          this.firstName,
          this.lastName,
          new Date(this.date),
          this.mail
        );
        if ('message' in response && 'code' in response) {
          this.view.showMessage(false, response.message);
          this.view.showError(response.message);
        } else if (response) {
          this.view.toggleDisplayModal(`${Mode.account}`, false);
          this.view.showMessage(true);
          await this.getProfile(Mode.update);
        }
      } catch (error) {
        if (error instanceof Error) this.view.showError(error.message);
      }
    } else {
      this.view.reminder();
    }
  }

  public async getProfile(mode?: string): Promise<void> {
    try {
      const response: Customer | ErrorObject = await this.eCommerceApi.getCustomer();
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else this.view.showProfile(response, mode);
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }
}

export default ModelProfile;
