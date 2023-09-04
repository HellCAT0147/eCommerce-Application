import ECommerceApi from '../../../api/e-commerce-api';
import { Base, Mode } from '../../../models/builder';
import ControllerRegistration from '../../registration/controller/controller';
import ModelProfile from '../model/model';

class ControllerProfile extends ControllerRegistration {
  protected model: ModelProfile;

  public constructor(eCommerceApi: ECommerceApi) {
    super(eCommerceApi);
    this.model = new ModelProfile(this.eCommerceApi);
  }

  public checkField(e: Event): void {
    const { target } = e;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.id.includes('email')) {
      this.model.checkMail(target.value);
    } else if (target.id.includes('password-new')) this.model.checkNewPassword(target.value);
    else if (target.id.includes('password')) this.model.checkPassword(target.value);
    else if (target.id.includes('name') || target.id.includes('city')) this.model.checkName(target.value, target.id);
    else if (target.id.includes('date-of-birth')) this.model.checkBirthDate(target.value);
  }

  public mouseEvent(e: MouseEvent): void {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains(`${Base.btns}_${Mode.edit}`)) {
      e.preventDefault();
      this.model.openEditMode(target);
    }
    if (target.classList.contains(`${Base.btns_modal}`)) {
      e.preventDefault();
      this.model.modalEvent(target);
    }
  }

  public async loadProfile(): Promise<void> {
    await this.model.getProfile();
  }
}

export default ControllerProfile;
