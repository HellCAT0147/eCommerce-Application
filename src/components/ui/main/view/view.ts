import { Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';

export default class MainView {
  private pageName: string;

  public constructor(pageName: string = Pages.MAIN) {
    this.pageName = pageName;
  }

  public showPromo(mode: string): void {
    const buttonPromo: HTMLElement | null = document.querySelector(`#${mode}`);
    if (buttonPromo) {
      buttonPromo.classList.add(`${Mode.dis}`);
      setTimeout((): void => {
        if (mode === Mode.get_promo) buttonPromo.textContent = Titles.PROMO_CODE;
        else if (mode === Mode.get_banner) buttonPromo.textContent = Titles.BANNER_CODE;
      }, 250);
    }
  }
}
