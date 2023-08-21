import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';

export default function createMainForNotFound(main: HTMLElement): void {
  const numberFour: string = '4';
  const notFound: HTMLElement = new Builder('div', '', Blocks.not_found, '', '').element();
  const numberFirst: HTMLElement = new Builder('span', '', Blocks.not_found, Elem.number, Mode.first).element();
  numberFirst.textContent = numberFour;
  const numberLast: HTMLElement = new Builder('span', '', Blocks.not_found, Elem.number, Mode.last).element();
  numberLast.textContent = numberFour;
  const circleBig: HTMLElement = new Builder('div', '', Blocks.not_found, Elem.circle, Mode.big).element();
  const circleSmall: HTMLElement = new Builder('div', '', Blocks.not_found, Elem.circle, Mode.small).element();
  const eye: HTMLElement = new Builder('div', '', Blocks.not_found, 'eye', '').element();
  const title: HTMLElement = new Builder('h1', Base.titles, Blocks.not_found, Elem.title, '').element();
  title.textContent = Titles.PAGE_NOT_FOUND.toUpperCase();
  const goToMainButton: HTMLButtonElement = new Builder(
    '',
    Base.btns_colored,
    Blocks.not_found,
    Elem.go_home,
    ''
  ).button();
  goToMainButton.classList.add('redirect__buttons');
  goToMainButton.setAttribute('id', `${Pages.GO_TO_MAIN}`);
  goToMainButton.textContent = Buttons.GO_HOME;

  circleBig.append(circleSmall, eye);
  notFound.append(numberFirst, circleBig, numberLast);
  main.append(notFound, title, goToMainButton);
}
