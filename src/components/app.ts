import Controller from './ui/login/controller/controller';
import createTemplate from './ui/login/view/template';

class App {
  private controller: Controller = new Controller();

  public start(): void {
    createTemplate();

    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
    inputs.forEach((input) => input.addEventListener('input', (e) => this.controller.checkField(e)));
  }
}
export default App;
