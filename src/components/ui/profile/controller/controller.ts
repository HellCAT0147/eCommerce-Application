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

  public mouseEvent(e: MouseEvent): void {
    const { target } = e;
    e.preventDefault();
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains(`${Base.btns}_${Mode.edit}`)) {
      this.model.openEditMode(target);
    }
    if (target.classList.contains(`${Base.btns_modal}`)) {
      this.model.modalEvent(target);
    }
  }

  public loadProfile(): void {
    this.model.getProfile();
  }
}

export default ControllerProfile;
