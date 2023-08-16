import ControllerLogin from '../../login/controller/controller';
import RegistrationValidationModel from '../model/validation';

class ControllerRegistration extends ControllerLogin {
  protected validationModel: RegistrationValidationModel;

  constructor() {
    super();
    this.validationModel = new RegistrationValidationModel();
  }

  public checkField(e: Event): void {
    e.preventDefault();
    this.validationModel.testCheck('Name');
  }
}

export default ControllerRegistration;
