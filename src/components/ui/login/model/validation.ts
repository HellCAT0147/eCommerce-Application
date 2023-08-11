export default class ValidationModel {
  private mail: string;

  private password: string;

  private isValid: boolean;

  constructor() {
    this.mail = '';
    this.password = '';
    this.isValid = false;
  }

  public checkMail(mail: string): boolean {
    const regexp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.match(regexp)) {
      this.mail = mail;
      return true;
    }
    this.mail = '';
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
