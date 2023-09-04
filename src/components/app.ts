import ECommerceApi from './api/e-commerce-api';
import eCommerceAPIConfig from './api/e-commerce-api-config-realization';
import { Routes } from './models/router';
import { createTemplate } from './ui/main/view/template';
import MainController from './ui/router/controller/main-controller';
import Router from './ui/router/model/router';
import basicRoutes from './ui/router/model/routes';

class App {
  public router: Router;

  public controller: MainController;

  protected eCommerceApi: ECommerceApi;

  constructor() {
    const routes = this.createRoutes();
    this.eCommerceApi = new ECommerceApi(
      eCommerceAPIConfig.projectKey,
      eCommerceAPIConfig.clientId,
      eCommerceAPIConfig.clientSecret,
      eCommerceAPIConfig.region,
      undefined,
      eCommerceAPIConfig.scopes.split(' ')
    );
    this.router = new Router(routes, this.eCommerceApi);
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
      body.addEventListener('keyup', (e: KeyboardEvent): void => this.controller.delegateKeyboardEvent(e));
    }
  }
}
export default App;
