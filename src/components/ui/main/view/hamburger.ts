import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import Builder from '../../builder/html-builder';

export default function createHamburger(): HTMLElement {
  const hamburger: HTMLElement = new Builder('div', Base.burger, Blocks.header, Elem.burger, '').element();
  hamburger.setAttribute('id', 'burger');
  const hamburgerLineFirst: HTMLElement = new Builder('span', '', Elem.burger, Elem.line, Mode.cross).element();
  const hamburgerLineHidden: HTMLElement = new Builder('span', '', Elem.burger, Elem.line, Mode.hidden).element();
  const hamburgerLineLast: HTMLElement = new Builder('span', '', Elem.burger, Elem.line, Mode.cross).element();

  hamburger.append(hamburgerLineFirst, hamburgerLineHidden, hamburgerLineLast);

  return hamburger;
}
