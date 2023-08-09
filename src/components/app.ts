import Controller from './ui/main/controller/controller';
import createTemplate from './ui/main/view/template';

class App {
  private controller: Controller = new Controller();

  public start(): void {
    createTemplate();

    const body: HTMLElement | null = document.querySelector('.body');
    if (body) {
      body.addEventListener('click', (e: MouseEvent): void => this.controller.getTest(e));
    }
  }
}
export default App;
