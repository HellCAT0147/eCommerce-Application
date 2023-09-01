import ECommerceApi from '../../../api/e-commerce-api';
import ControllerRegistration from '../../registration/controller/controller';
import ModelProfile from '../model/model';

class ControllerProfile extends ControllerRegistration {
  protected model: ModelProfile;

  public constructor(eCommerceApi: ECommerceApi) {
    super(eCommerceApi);
    this.model = new ModelProfile(this.eCommerceApi);
  }

  public mouseEvent(e: MouseEvent): void {
    // e.preventDefault();
  }

  public loadProfile(): void {
    this.model.getProfile();
  }
}

export default ControllerProfile;
