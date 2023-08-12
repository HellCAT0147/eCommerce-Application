import { Routes } from './models/types';
import createTemplateLogin from './ui/login/view/template';
import createTemplate from './ui/main/view/template';
import createTemplateNotFound from './ui/not_found/view/template';
import createTemplateRegistration from './ui/registration/view/template';
import { Pages } from './ui/router/pages';
import Router from './ui/router/router';

class App {
  public router: Router;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
  }

  // eslint-disable-next-line max-lines-per-function
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
          // const currentLocation: string = window.location.origin;
          // const newLocation: string = `${currentLocation}/login`;
          // const obj = {
          //   Title: 'title',
          //   Url: newLocation,
          // };
          // window.history.pushState(obj, obj.Title, obj.Url);
          // // window.history.pushState(currentLocation, );
          // console.log(window.location);
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
      body.addEventListener('click', (e: MouseEvent): void => this.router.delegateEvent(e));
    }
  }
}
export default App;
