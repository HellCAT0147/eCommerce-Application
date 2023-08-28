import TokenCachesStore from '../../../api/token-caches-store';
import { Pages } from '../../../models/router';
import Router from '../model/router';

class MainController {
  public router: Router;

  private readonly tokenCachesStore: TokenCachesStore;

  constructor(router: Router) {
    this.router = router;
    this.tokenCachesStore = new TokenCachesStore();
  }

  private RedirectButton(target: HTMLElement): HTMLElement | null {
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
      if (url === Pages.GO_TO_MAIN || url === Pages.SIGN_OUT) {
        url = Pages.MAIN;
      } else if (url === Pages.GO_TO_LOGIN) {
        url = Pages.LOGIN;
      } else if (url === Pages.GO_TO_REG) {
        url = Pages.REGISTRATION;
      }
    }

    return url;
  }

  public delegateMouseEvent(e: MouseEvent): void {
    const { target } = e;

    if (target instanceof HTMLElement) {
      const targetHtmlElement: HTMLElement | null = target;
      const navButton: HTMLElement | null = this.RedirectButton(targetHtmlElement);
      const signOutButton: HTMLElement | null = document.querySelector(`#${Pages.SIGN_OUT}`);

      if (navButton) {
        e.preventDefault();
        if (navButton === signOutButton) {
          this.tokenCachesStore.unset();
        }
        const urlButton: string = this.getUrlElement(navButton);
        window.history.pushState(null, '', `/${urlButton}`);
        this.router.navigate(urlButton);
      }

      this.router.controllerMain.mouseEvent(e);

      if (targetHtmlElement.closest(`.main__${Pages.MAIN}`)) {
        this.router.controllerMain.buttonEvent(e);
      } else if (targetHtmlElement.closest(`.main__${Pages.LOGIN}`)) {
        this.router.controllerLogin.buttonEvent(e);
      } else if (targetHtmlElement.closest(`.main__${Pages.REGISTRATION}`)) {
        this.router.controllerRegistration.buttonEvent(e);
      }
    }
  }
}

export default MainController;
