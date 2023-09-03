import { Customer, ErrorObject } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ViewProfile from '../view/view';
import RegistrationValidationModel from '../../registration/model/validation';
import { Blocks, Elem, Mode } from '../../../models/builder';

class ModelProfile extends RegistrationValidationModel {
  protected eCommerceApi: ECommerceApi;

  protected view: ViewProfile;

  public constructor(eCommerceApi: ECommerceApi) {
    super(eCommerceApi);
    this.eCommerceApi = eCommerceApi;
    this.view = new ViewProfile();
  }

  public openEditMode(target: HTMLElement): void {
    if (target.classList.contains(`${Blocks.prof}__${Elem.btn}_${Mode.account}`)) {
      this.view.toggleDisplayModal(`${Mode.account}`, true);
    }
  }

  public modalEvent(target: HTMLElement): void {
    if (target.classList.contains(`${Blocks.prof}__${Elem.btn}_${Mode.back}`)) {
      if (target.closest(`.${Blocks.prof}__${Elem.modal}_${Mode.account}`))
        this.view.toggleDisplayModal(`${Mode.account}`, false);
    }
  }

  public async getProfile(): Promise<void> {
    try {
      const response: Customer | ErrorObject = await this.eCommerceApi.getCustomer();
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else this.view.showProfile(response);
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }
}

export default ModelProfile;
