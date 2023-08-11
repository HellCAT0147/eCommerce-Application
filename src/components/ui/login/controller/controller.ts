import ValidationModel from '../model/validation';
import FormView from '../view/form';

class Controller {
  private validationModel: ValidationModel;

  private formView: FormView;

  constructor() {
    this.validationModel = new ValidationModel();
    this.formView = new FormView();
  }

  public checkField(e: Event): void {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    let isValid: boolean;
    if (target.id.includes('email')) {
      isValid = this.validationModel.checkMail(target.value);
    } else {
      isValid = this.validationModel.checkPassword(target.value);
    }
    this.formView.highlightInput(target, isValid);
  }
}

export default Controller;
