import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import { Pages } from '../../../models/router';

export default function selectCurrentPage(url: string): void {
  const headerButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.header__button');
  const bagIcon: HTMLElement | null = document.querySelector(`.${Blocks.header}__${Elem.bag}`);

  if (url === Pages.CART && bagIcon) {
    bagIcon.classList.add(`${Blocks.header}__${Elem.bag}_${Mode.colored}`);
  } else {
    if (bagIcon) bagIcon.classList.remove(`${Blocks.header}__${Elem.bag}_${Mode.colored}`);
    headerButtons.forEach((button: HTMLElement) => {
      button.classList.remove(`${Base.current_page}`);
    });

    headerButtons.forEach((button: HTMLElement) => {
      const id: string | null = button.getAttribute('id');

      if (url === id) {
        button.classList.add(`${Base.current_page}`);
      } else if (url === '' && id === Pages.MAIN) {
        button.classList.add(`${Base.current_page}`);
      }
    });
  }
}
