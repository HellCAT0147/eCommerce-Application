import { ErrorObject } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import { LoginErrors, InputTypeLogin, MailErrors, PasswordErrors } from '../../../models/validation';
import FormViewLogin from '../view/form';
import { Pages, Routes } from '../../../models/router';
import basicRoutes from '../../router/model/routes';

export default class ValidationModel {
  protected mail: string;

  protected password: string;

  protected isValid: boolean;

  protected formView: FormViewLogin;

  protected eCommerceApi: ECommerceApi;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.mail = '';
    this.password = '';
    this.isValid = false;
    this.formView = new FormViewLogin('login');
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

  protected setErrors(inputType: InputTypeLogin, errors: LoginErrors[]): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    inputs.forEach((input) => {
      if (input.classList.contains(`login__input_${inputType}`)) {
        this.formView.showErrors(input.parentElement, errors, inputType);
      }
    });
    this.checkSendable();
  }

  public switchPasswordView(button: HTMLButtonElement | null, pageName?: string): void {
    if (button) {
      if (pageName) {
        this.formView.switchPasswordView(button, pageName);
        return;
      }
      this.formView.switchPasswordView(button);
    }
  }

  protected checkSendable(): boolean {
    if (this.mail !== '' && this.password !== '') this.isValid = true;
    else this.isValid = false;
    return this.isValid;
  }

  public async send(): Promise<void> {
    if (this.checkSendable()) {
      this.formView.setSendButtonDisableState(true);
      try {
        const response: ErrorObject | true = await this.eCommerceApi.login(this.mail, this.password);
        if (response === true) {
          const route: Routes | undefined = basicRoutes.find((routeExisting) => routeExisting.path === Pages.MAIN);
          window.history.pushState(null, '', `/${Pages.MAIN}`);
          this.formView.showSuccessLoginMessage();
          if (route) route.callback(true);
        } else {
          this.formView.reminder(response.message);
        }
      } catch (error) {
        if (error instanceof Error) this.formView.reminder(error.message);
      }
      this.formView.setSendButtonDisableState(false);
    } else {
      this.formView.reminder();
    }
  }
}
