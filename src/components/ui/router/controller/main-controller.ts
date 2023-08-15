import { Pages } from '../../../models/router';
import Router from '../model/router';

class MainController {
  public router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  private isRedirectButton(target: HTMLElement): HTMLElement | null {
    let navButton: HTMLElement | null = null;
    const navButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.redirect__buttons');

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

  public delegateMouseEvent(e: MouseEvent): void {
    const { target } = e;

    if (target instanceof HTMLElement) {
      const targetHtmlElement: HTMLElement | null = target;
      const navButton: HTMLElement | null = this.isRedirectButton(targetHtmlElement);

      if (navButton) {
        const urlButton: string = this.getUrlElement(navButton);
        window.history.pushState(null, '', `/${urlButton}`);
        this.router.navigate(urlButton);
      }
    }

    this.router.controllerLogin.buttonEvent(e);
  }
}

export default MainController;
