import ValidationModel from '../model/validation';
import ECommerceApi from '../../../api/e-commerce-api';
import eCommerceAPIConfig from '../../../api/e-commerce-api-config-realization';

class ControllerLogin {
  private eCommerceApi: ECommerceApi;

  protected validationModel: ValidationModel;

  public constructor() {
    this.eCommerceApi = new ECommerceApi(
      eCommerceAPIConfig.projectKey,
      eCommerceAPIConfig.clientId,
      eCommerceAPIConfig.clientSecret,
      eCommerceAPIConfig.region
    );
    this.validationModel = new ValidationModel(this.eCommerceApi);
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
