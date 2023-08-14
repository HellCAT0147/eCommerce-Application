import Controller from './ui/login/controller/controller';
import createTemplate from './ui/login/view/template';

class App {
  private controller: Controller = new Controller();

  public start(): void {
    createTemplate();

    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    inputs.forEach((input) => input.addEventListener('input', (e: Event) => this.controller.checkField(e)));

    const form: HTMLFormElement | null = document.querySelector('.form');
    if (form) form.addEventListener('click', (e: Event) => this.controller.buttonEvent(e));
  }
}
export default App;
