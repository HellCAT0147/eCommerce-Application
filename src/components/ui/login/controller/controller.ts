import { InputType } from '../../../models/login';
import ValidationModel from '../model/validation';
import FormView from '../view/form';
import { MailErrors, PasswordErrors } from '../../../models/validation';

class Controller {
  private validationModel: ValidationModel;

  private formView: FormView;

  constructor() {
    this.validationModel = new ValidationModel(this);
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

  public setErrors(inputType: InputType, errors: MailErrors[]): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    inputs.forEach((input) => {
      if (input.classList.contains(`login__input_${inputType}`)) {
        this.formView.showErrors(input.parentElement, errors, inputType);
      }
    });
  }
}

export default Controller;
