import { Pages, Routes } from './models/types';
import createTemplateLogin from './ui/login/view/template';
import createTemplate from './ui/main/view/template';
import createTemplateNotFound from './ui/not_found/view/template';
import createTemplateRegistration from './ui/registration/view/template';
import MainController from './ui/router/main-controller';
import Router from './ui/router/router';

class App {
  public router: Router;

  public controller: MainController;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.controller = new MainController(this.router);
  }

  public createRoutes(): Routes[] {
    return [
      {
        path: ``,
        callback: (): void => {
          createTemplate();
        },
      },
      {
        path: `${Pages.MAIN}`,
        callback: (): void => {
          createTemplate();
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: (): void => {
          createTemplateLogin();
        },
      },
      {
        path: `${Pages.REGISTRATION}`,
        callback: (): void => {
          createTemplateRegistration();
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: (): void => {
          createTemplateNotFound();
        },
      },
    ];
  }

  public start(): void {
    createTemplate();

    const body: HTMLElement | null = document.querySelector('.body');
    if (body) {
      body.addEventListener('click', (e: MouseEvent): void => this.controller.delegateEvent(e));
    }
  }
}
export default App;
