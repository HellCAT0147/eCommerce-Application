import { Pages } from '../../../models/router';

export default function selectCurrentPage(url: string): void {
  const headerButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.header__button');

  headerButtons.forEach((button: HTMLElement) => {
    button.classList.remove('current-page');
  });

  headerButtons.forEach((button: HTMLElement) => {
    const id: string | null = button.getAttribute('id');

    if (url === id) {
      button.classList.add('current-page');
    } else if (url === '' && id === Pages.MAIN) {
      button.classList.add('current-page');
    }
  });
}
