import { Pages, Routes, UrlParsed } from '../../../models/router';
import selectCurrentPage from '../view/viewPage';

class Router {
  public routes: Routes[];

  constructor(routes: Routes[]) {
    this.routes = routes;

    document.addEventListener('DOMContentLoaded', () => {
      this.browserChangePath();
    });

    window.addEventListener('popstate', this.browserChangePath.bind(this));
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
      route.callback();
      selectCurrentPage(url);
    }
  }

  private getBrowserPath(): string {
    const positionFirstSymbol: number = 1;
    return window.location.pathname.slice(positionFirstSymbol);
  }

  private browserChangePath(): void {
    const path: string = this.getBrowserPath();
    this.navigate(path);
  }
}

export default Router;
