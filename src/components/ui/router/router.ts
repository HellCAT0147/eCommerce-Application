import { Routes, UrlParsed } from '../../models/types';
import { Pages } from './pages';

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
    }
  }

  private isNavigation(target: HTMLElement): HTMLElement | null {
    let navButton: HTMLElement | null = null;
    const navButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.header__buttons');

    navButtons.forEach((button: HTMLElement) => {
      if (target === button) {
        navButton = button;
      }
    });

    return navButton;
  }

  private getUrlElement(element: HTMLElement): string {
    let url: string = '';
    const idElement: string | null = element.getAttribute('id');

    if (idElement) {
      url = `${idElement}`;
    }

    return url;
  }

  public delegateEvent(event: MouseEvent): void {
    const target: HTMLElement = <HTMLElement>event.target;
    const navButton: HTMLElement | null = this.isNavigation(target);

    if (navButton) {
      this.navigate(this.getUrlElement(navButton));
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
