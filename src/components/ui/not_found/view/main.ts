import { Pages } from '../../../models/types';

export default function createMainForNotFound(): HTMLElement {
  const main: HTMLElement = document.createElement('main');
  main.className = 'main main__not-found';
  const notFound: HTMLElement = document.createElement('div');
  notFound.className = 'not-found';
  const numberFirst: HTMLElement = document.createElement('span');
  numberFirst.className = 'not-found__number number_first';
  numberFirst.textContent = `4`;
  const numberLast: HTMLElement = document.createElement('span');
  numberLast.className = 'number number_last';
  numberLast.textContent = `4`;
  const circleBig: HTMLElement = document.createElement('div');
  circleBig.className = 'not-found__circle not-found__circle_big';
  const circleSmall: HTMLElement = document.createElement('div');
  circleSmall.className = 'not-found__circle not-found__circle_small';
  const eye: HTMLElement = document.createElement('div');
  eye.className = 'not-found__eye';
  const title: HTMLElement = document.createElement('h1');
  title.className = 'title not-found__title';
  title.textContent = `PAGE NOT FOUND`;
  const goToMainButton: HTMLElement = document.createElement('button');
  goToMainButton.className = 'buttons buttons_colored not-found__go-home header__buttons';
  goToMainButton.setAttribute('id', `${Pages.GO_TO_MAIN_PAGE}`);
  goToMainButton.textContent = `GO TO MAIN PAGE`;
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';

  circleBig.append(circleSmall, eye);
  notFound.append(numberFirst, circleBig, numberLast);
  main.append(notFound, title, goToMainButton);

  return main;
}
