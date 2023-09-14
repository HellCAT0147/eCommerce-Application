import { Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';

export default class MainView {
  private pageName: string;

  public constructor(pageName: string = Pages.MAIN) {
    this.pageName = pageName;
  }

  public showPromo(): void {
    const buttonPromo: HTMLElement | null = document.querySelector(`#${Mode.get_promo}`);
    if (buttonPromo) {
      buttonPromo.classList.add(`${Mode.dis}`);
      const timer = setTimeout(() => {
        buttonPromo.textContent = Titles.PROMO_CODE;
      }, 250);
    }
  }
}
