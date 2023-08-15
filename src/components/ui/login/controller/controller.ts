import ValidationModel from '../model/validation';

class ControllerLogin {
  private validationModel: ValidationModel;

  constructor() {
    this.validationModel = new ValidationModel();
  }

  public checkField(e: Event): void {
    const { target } = e;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.id.includes('email')) this.validationModel.checkMail(target.value);
    else this.validationModel.checkPassword(target.value);
  }

  public buttonEvent(e: Event): void {
    e.preventDefault();
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    const showPassword: HTMLButtonElement | null = target.closest('#show-password');
    this.validationModel.switchPasswordView(showPassword);

    const signIn: HTMLButtonElement | null = target.closest('.login__button_sign');
    if (signIn) this.validationModel.send();
  }
}

export default ControllerLogin;
