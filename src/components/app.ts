import { Routes } from './models/router';
import createTemplate from './ui/main/view/template';
import MainController from './ui/router/controller/main-controller';
import Router from './ui/router/model/router';
import basicRoutes from './ui/router/model/routes';

class App {
  public router: Router;

  public controller: MainController;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.controller = new MainController(this.router);
  }

  public createRoutes(): Routes[] {
    return basicRoutes;
  }

  public start(): void {
    createTemplate();

    const body: HTMLElement | null = document.querySelector('.body');
    if (body) {
      body.addEventListener('click', (e: MouseEvent): void => this.controller.delegateMouseEvent(e));
    }
  }
}
export default App;
