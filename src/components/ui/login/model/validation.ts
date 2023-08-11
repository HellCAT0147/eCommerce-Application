import { MailErrors } from '../../../models/validation';
import type Controller from '../controller/controller';

export default class ValidationModel {
  private mail: string;

  private password: string;

  private isValid: boolean;

  private controller: Controller;

  constructor(controller: Controller) {
    this.mail = '';
    this.password = '';
    this.isValid = false;
    this.controller = controller;
  }

  public checkMail(mail: string): boolean {
    const regexp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.match(regexp)) {
      this.mail = mail;
      this.controller.setErrors('email', []);
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
    this.controller.setErrors('email', errors);

    return false;
  }

  public checkPassword(password: string): boolean {
    const regexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,}$/;
    if (password.match(regexp)) {
      this.password = password;
      return true;
    }
    this.password = '';
    return false;
  }
}
