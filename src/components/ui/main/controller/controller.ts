import ECommerceApi from '../../../api/e-commerce-api';
import { Buttons, Mode } from '../../../models/builder';
import MainModel from '../model/main';
import { toggleBurgerMenu } from '../view/hamburger';

class ControllerMain {
  protected model: MainModel;

  protected eCommerceApi: ECommerceApi;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.model = new MainModel(this.eCommerceApi);
  }

  public mouseEvent(e: MouseEvent): void {
    const { target } = e;
    const burgerButton: HTMLElement | null = document.querySelector(`#${Buttons.BURGER}`);

    if (target instanceof HTMLElement) {
      const targetHtmlElement: HTMLElement | null = target;
      if (targetHtmlElement.closest(`#${Buttons.BURGER}`) && burgerButton) toggleBurgerMenu(burgerButton);
      if (targetHtmlElement.closest(`#${Mode.get_promo}`)) this.model.getPromoCode(Mode.get_promo);
      if (targetHtmlElement.closest(`#${Mode.get_banner}`)) this.model.getPromoCode(Mode.get_banner);
    }
  }
}

export default ControllerMain;
