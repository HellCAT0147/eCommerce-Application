import TokenCachesStore from '../../../api/token-caches-store';
import { Base, Blocks, Elem, Mode } from '../../../models/builder';
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
    const navButtons: NodeListOf<HTMLElement> = document.querySelectorAll(`.${Base.btns_redirect}`);
    const cartButton: HTMLElement | null = target.closest(`.${Blocks.header}__${Elem.btn}_${Mode.cart}`);

    if (cartButton) {
      navButton = cartButton;
    }

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
      if (url === Pages.GO_TO_MAIN || url === Pages.SIGN_OUT || url === Pages.LOGO_MAIN) {
        url = Pages.MAIN;
      } else if (url === Pages.GO_TO_LOGIN) {
        url = Pages.LOGIN;
      } else if (url === Pages.GO_TO_REG) {
        url = Pages.REGISTRATION;
      } else if (url === Pages.GO_TO_PROF) {
        url = Pages.PROFILE;
      } else if (url === Pages.GO_TO_CATALOG) {
        url = Pages.CATALOG;
      }
    }

    return url;
  }

  public delegateKeyboardEvent(e: KeyboardEvent): void {
    this.router.controllerCatalog.keyboardEnterEvent(e);
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
        this.router.navigate(urlButton);
      }

      this.router.controllerMain.mouseEvent(e);

      if (targetHtmlElement.closest(`.${Blocks.main}__${Pages.MAIN}`)) {
        this.router.controllerMain.mouseEvent(e);
      } else if (targetHtmlElement.closest(`.${Blocks.main}__${Pages.LOGIN}`)) {
        this.router.controllerLogin.buttonEvent(e);
      } else if (targetHtmlElement.closest(`.${Blocks.main}__${Pages.REGISTRATION}`)) {
        this.router.controllerRegistration.buttonEvent(e);
      } else if (targetHtmlElement.closest(`.${Blocks.main}__${Pages.CATALOG}`)) {
        const card: HTMLElement | null = targetHtmlElement.closest(`.${Base.cards}`);
        if (
          card &&
          !targetHtmlElement.classList.contains(`${Blocks.catalog}__${Elem.btn_cart}_${Mode.add}`) &&
          !targetHtmlElement.classList.contains(`${Blocks.catalog}__${Elem.btn_cart}_${Mode.remove}`)
        ) {
          const id: string = this.getUrlElement(card);
          this.router.navigate(`${Pages.CATALOG}/${id}`);
        } else {
          this.router.controllerCatalog.mouseEvent(e);
        }
      } else if (targetHtmlElement.closest(`.${Blocks.main}__${Pages.PROFILE}`)) {
        this.router.controllerProfile.mouseEvent(e);
      } else if (targetHtmlElement.closest(`.${Blocks.main}__${Pages.CART}`)) {
        this.router.controllerCart.mouseEvent(e);
      }
    }
  }
}

export default MainController;
