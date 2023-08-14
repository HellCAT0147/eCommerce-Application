import { Pages } from '../../models/router';
import Router from './router';

class MainController {
  public router: Router;

  constructor(router: Router) {
    this.router = router;
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
      if (url === Pages.GO_TO_MAIN_PAGE) {
        url = Pages.MAIN;
      }
    }

    return url;
  }

  public delegateEvent(event: MouseEvent): void {
    const { target } = event;

    if (target instanceof HTMLElement) {
      const targetHtmlElement: HTMLElement | null = target;
      const navButton: HTMLElement | null = this.isNavigation(targetHtmlElement);

      if (navButton) {
        const urlButton: string = this.getUrlElement(navButton);
        window.history.pushState(null, '', `/${urlButton}`);
        this.router.navigate(urlButton);
      }
    }
  }
}

export default MainController;
