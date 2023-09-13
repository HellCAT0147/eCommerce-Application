import { ErrorObject, Product } from '@commercetools/platform-sdk';
import { Pages, Routes, UrlParsed } from '../../../models/router';
import { selectCurrentPage, showQuantity } from '../view/viewPage';
import ControllerLogin from '../../login/controller/controller';
import ControllerRegistration from '../../registration/controller/controller';
import ControllerMain from '../../main/controller/controller';
import ControllerCatalog from '../../catalog/controller/controller';
import ECommerceApi from '../../../api/e-commerce-api';
import { DataBase } from '../../../models/commerce';
import ControllerProfile from '../../profile/controller/controller';
import ControllerCart from '../../cart/controller/controller';

class Router {
  public routes: Routes[];

  public controllerMain: ControllerMain;

  public controllerLogin: ControllerLogin;

  public controllerRegistration: ControllerRegistration;

  public controllerCatalog: ControllerCatalog;

  public controllerProfile: ControllerProfile;

  public controllerCart: ControllerCart;

  public inputs: NodeListOf<HTMLInputElement>;

  private eCommerceApi: ECommerceApi;

  constructor(routes: Routes[], eCommerceApi: ECommerceApi) {
    this.routes = routes;
    this.eCommerceApi = eCommerceApi;
    this.controllerMain = new ControllerMain();
    this.controllerLogin = new ControllerLogin(this.eCommerceApi);
    this.controllerRegistration = new ControllerRegistration(this.eCommerceApi);
    this.controllerCatalog = new ControllerCatalog(this.eCommerceApi);
    this.controllerProfile = new ControllerProfile(this.eCommerceApi);
    this.controllerCart = new ControllerCart(this.eCommerceApi);
    this.inputs = this.getInputsOnPage();

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
    const selects: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.form__select');

    selects.forEach((select: HTMLSelectElement) => {
      select.addEventListener('change', (e: Event) => this.controllerRegistration.selectMenu(e));
      select.addEventListener('change', (e: Event) => this.controllerProfile.selectMenu(e));
    });

    this.inputs = this.getInputsOnPage();
    this.inputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => this.controllerLogin.checkField(e));
      input.addEventListener('input', (e: Event) => this.controllerRegistration.checkField(e));
      input.addEventListener('input', (e: Event) => this.controllerProfile.checkField(e));
      input.addEventListener('keydown', (e: Event) => this.controllerLogin.sendLogin(e));
      input.addEventListener('keydown', (e: Event) => this.controllerRegistration.sendReg(e));
    });
  }

  public parseUrl(url: string): UrlParsed {
    const urlParsed: UrlParsed = {
      path: '',
      resource: '',
      details: '',
    };
    const path: string[] = url.split('/');
    [urlParsed.path = '', urlParsed.resource = '', urlParsed.details = ''] = path;

    return urlParsed;
  }

  private async redirectToProduct(isLoggedIn: boolean, id: string, route: Routes, isPopState?: boolean): Promise<void> {
    const response: Product | ErrorObject = await this.eCommerceApi.getProduct(id);
    const key: string = `${DataBase.key_prefix}-${id}`;
    if (key === response.key) {
      if (!isPopState) window.history.pushState(null, '', `/${Pages.CATALOG}/${id}`);
      route.callback(isLoggedIn);
      this.controllerCatalog.loadProduct(id, response);
      await this.setQuantity();
      selectCurrentPage(Pages.CATALOG);
    } else {
      this.navigate(Pages.NOT_FOUND);
    }
  }

  private async redirectToProducts(isLoggedIn: boolean, route: Routes, isPopState?: boolean): Promise<void> {
    if (!isPopState) window.history.pushState(null, '', `/${Pages.CATALOG}`);
    route.callback(isLoggedIn);
    this.controllerCatalog.loadProducts();
    await this.setQuantity();
    selectCurrentPage(Pages.CATALOG);
  }

  private async redirectToProfile(isLoggedIn: boolean, route: Routes, isPopState?: boolean): Promise<void> {
    if (!isPopState) window.history.pushState(null, '', `/${Pages.PROFILE}`);
    route.callback(isLoggedIn);
    await this.controllerProfile.loadProfile();
    await this.setQuantity();
    selectCurrentPage(Pages.PROFILE);
    this.setInputsOnPage();
  }

  private async redirectToCart(isLoggedIn: boolean, route: Routes, isPopState?: boolean): Promise<void> {
    if (!isPopState) window.history.pushState(null, '', `/${Pages.CART}`);
    route.callback(isLoggedIn);
    await this.controllerCart.loadCart();
    await this.setQuantity();
    selectCurrentPage(Pages.CART);
    this.setInputsOnPage();
  }

  private async setQuantity(): Promise<number> {
    let quantity: number = 0;
    try {
      const response: number | ErrorObject = await this.eCommerceApi.getCartItemsQuantity();
      if (typeof response === 'number') quantity = response;
    } catch (error) {
      if (error instanceof Error) {
        // TODO implement method showError();
      }
    }

    showQuantity(quantity);

    return quantity;
  }

  public async navigate(url: string, isPopState?: boolean): Promise<void> {
    const urlParsed: UrlParsed = this.parseUrl(url);
    let pathForFind: string = urlParsed.resource === '' ? urlParsed.path : `${urlParsed.path}/${Pages.ID}`;
    if (urlParsed.details) {
      pathForFind += `/${urlParsed.details}`;
    }
    const route: Routes | undefined = this.routes.find((routeExisting) => routeExisting.path === pathForFind);
    if (!route) {
      window.history.replaceState(null, '', `/${url}`);
      this.navigate(Pages.NOT_FOUND);
    } else {
      if (await this.eCommerceApi.isLoggedIn()) {
        if (urlParsed.resource && !urlParsed.details) {
          await this.redirectToProduct(true, urlParsed.resource, route, isPopState);
          return;
        }
        if (route.path === Pages.CATALOG || route.path === Pages.PROFILE || route.path === Pages.CART) {
          if (route.path === Pages.CATALOG) this.redirectToProducts(true, route, isPopState);
          else if (route.path === Pages.PROFILE) this.redirectToProfile(true, route, isPopState);
          else if (route.path === Pages.CART) this.redirectToCart(true, route, isPopState);
          return;
        }
        if (route.path === Pages.LOGIN || route.path === Pages.REGISTRATION) {
          this.navigate(Pages.MAIN, isPopState);
          return;
        }
        route.callback(true);
      } else {
        if (urlParsed.resource && !urlParsed.details) {
          await this.redirectToProduct(false, urlParsed.resource, route, isPopState);
          return;
        }
        if (route.path === Pages.CATALOG || route.path === Pages.PROFILE || route.path === Pages.CART) {
          if (route.path === Pages.CATALOG) this.redirectToProducts(false, route, isPopState);
          else if (route.path === Pages.PROFILE) this.navigate(Pages.LOGIN, isPopState);
          else if (route.path === Pages.CART) this.redirectToCart(false, route, isPopState);
          return;
        }
        route.callback();
      }
      if (!isPopState && Pages.NOT_FOUND !== pathForFind) window.history.pushState(null, '', `/${pathForFind}`);
      else if (Pages.NOT_FOUND !== pathForFind) window.history.replaceState(null, '', `/${pathForFind}`);
      await this.setQuantity();
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
    this.navigate(path, true);
  }
}

export default Router;
