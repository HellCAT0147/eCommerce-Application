import { Buttons } from '../../../models/builder';
import { toggleBurgerMenu } from '../view/hamburger';

class ControllerMain {
  public checkField(e: Event): void {
    e.preventDefault();
    // TODO create controller for Main page;
  }

  public mouseEvent(e: MouseEvent): void {
    const { target } = e;
    const burgerButtom: HTMLElement | null = document.querySelector(`#${Buttons.BURGER}`);

    if (target instanceof HTMLElement) {
      const targetHtmlElement: HTMLElement | null = target;
      if (targetHtmlElement.closest(`#${Buttons.BURGER}`) && burgerButtom) toggleBurgerMenu(burgerButtom);
    }
  }
}

export default ControllerMain;
