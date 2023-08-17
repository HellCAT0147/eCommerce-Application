import { Pages, Routes, UrlParsed } from '../../../models/router';
import selectCurrentPage from '../view/viewPage';
import ControllerLogin from '../../login/controller/controller';
import ControllerRegistration from '../../registration/controller/controller';
import ControllerMain from '../../main/controller/controller';
import TokenCachesStore from '../../../api/token-caches-store';

class Router {
  public routes: Routes[];

  public controllerMain: ControllerMain;

  public controllerLogin: ControllerLogin;

  public controllerRegistration: ControllerRegistration;

  public inputs: NodeListOf<HTMLInputElement>;

  private readonly tokenCachesStore: TokenCachesStore;

  constructor(routes: Routes[]) {
    this.routes = routes;
    this.controllerMain = new ControllerMain();
    this.controllerLogin = new ControllerLogin();
    this.controllerRegistration = new ControllerRegistration();
    this.inputs = this.getInputsOnPage();
    this.tokenCachesStore = new TokenCachesStore();

    document.addEventListener('DOMContentLoaded', () => {
      this.browserChangePath();
    });

    window.addEventListener('popstate', this.browserChangePath.bind(this));
  }

  public getInputsOnPage(): NodeListOf<HTMLInputElement> {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form__input');
    return inputs;
  }

  private setInputsOnPage(): void {
    this.inputs = this.getInputsOnPage();
    this.inputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => this.controllerLogin.checkField(e));
      input.addEventListener('input', (e: Event) => this.controllerRegistration.checkField(e));
    });
  }

  public parseUrl(url: string): UrlParsed {
    const urlParsed: UrlParsed = {
      path: '',
      resource: '',
    };
    const path: string[] = url.split('/');
    [urlParsed.path = '', urlParsed.resource = ''] = path;

    return urlParsed;
  }

  public navigate(url: string): void {
    const urlParsed: UrlParsed = this.parseUrl(url);
    const pathForFind: string = urlParsed.resource === '' ? urlParsed.path : `${urlParsed.path}/${urlParsed.resource}`;
    const route: Routes | undefined = this.routes.find((routeExisting) => routeExisting.path === pathForFind);

    if (!route) {
      this.navigate(Pages.NOT_FOUND);
    } else {
      const token = this.tokenCachesStore.getDefault();
      if (token.token) {
        if (route.path === Pages.LOGIN) {
          this.navigate(Pages.MAIN);
          window.history.pushState(null, '', `/${Pages.MAIN}`);
          selectCurrentPage(Pages.MAIN);
          return;
        }
        route.callback(true);
      } else {
        route.callback();
      }
      selectCurrentPage(url);
      this.setInputsOnPage();
    }
  }

  private getBrowserPath(): string {
    const positionFirstSymbol: number = 1;
    return window.location.pathname.slice(positionFirstSymbol);
  }

  public browserChangePath(): void {
    const path: string = this.getBrowserPath();
    this.navigate(path);
  }
}

export default Router;
