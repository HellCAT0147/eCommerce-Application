import Controller from './ui/login/controller/controller';
import createTemplate from './ui/login/view/template';

class App {
  private controller: Controller = new Controller();

  public start(): void {
    createTemplate();

    const body: HTMLElement | null = document.querySelector('.body');
    if (body) {
      body.addEventListener('click', (e: MouseEvent): void => this.controller.getTest(e));
    }

    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
    inputs.forEach((input) => input.addEventListener('input', (e) => this.controller.checkField(e)));
  }
}
export default App;
