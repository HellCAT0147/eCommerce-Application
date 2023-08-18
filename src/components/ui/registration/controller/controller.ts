import ControllerLogin from '../../login/controller/controller';
import RegistrationValidationModel from '../model/validation';

class ControllerRegistration extends ControllerLogin {
  protected validationModel: RegistrationValidationModel;

  public constructor() {
    super();
    this.validationModel = new RegistrationValidationModel(this.getAPI());
  }

  public checkField(e: Event): void {
    const { target } = e;
    if (!(target instanceof HTMLInputElement)) return;

    if (target.id.includes('email')) this.validationModel.checkMail(target.value);
    else if (target.id.includes('password')) this.validationModel.checkPassword(target.value);
    else if (target.id.includes('name') || target.id.includes('city')) this.validationModel.checkName(target.value);
    else if (target.id.includes('date-of-birth')) this.validationModel.checkBirthDate(target.value);
    else if (target.id.includes('street')) this.validationModel.checkStreet(target.value);
    else if (target.id.includes('postal-code')) this.validationModel.checkPostal(target.value);
    else this.validationModel.checkCountry(target.value);
  }

  public buttonEvent(e: Event): void {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    const showPassword: HTMLButtonElement | null = target.closest('#show-password');
    if (showPassword) {
      e.preventDefault();
      // TODO create method for show password;
    }

    const signIn: HTMLButtonElement | null = target.closest('.registration__button_create');
    if (signIn) {
      e.preventDefault();
      // TODO create method for send registration request;
    }
  }
}

export default ControllerRegistration;
