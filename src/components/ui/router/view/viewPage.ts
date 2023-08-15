export default function selectCurrentPage(url: string): void {
  const headerButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.header__buttons');

  headerButtons.forEach((button: HTMLElement) => {
    button.classList.remove('current-page');
  });

  headerButtons.forEach((button: HTMLElement) => {
    const id: string | null = button.getAttribute('id');

    if (id === url) {
      button.classList.add('current-page');
    }
  });
}
