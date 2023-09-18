import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';

export default function createPromo(mode: string): HTMLElement {
  let position: string = '';
  if (mode === Mode.promo) position = Mode.left;
  if (mode === Mode.banner) position = Mode.right;
  const promoWrapper: HTMLElement = new Builder('section', Base.promo, Blocks.main, Elem.wrapper, mode).element();
  const promoContent: HTMLElement = new Builder('div', '', Blocks.promo, Elem.content, position).element();
  const promoTitle: HTMLElement = new Builder('div', '', Blocks.promo, Elem.title, Mode.main).element();
  const promoTitleFirst: HTMLHeadingElement = new Builder('', '', Blocks.promo, Elem.title, Mode.first).h(1);
  const promoTitleSecond: HTMLHeadingElement = new Builder('', '', Blocks.promo, Elem.title, Mode.second).h(2);
  const promoTitleLast: HTMLHeadingElement = new Builder('', '', Blocks.promo, Elem.title, Mode.last).h(2);
  const promoButton: HTMLElement = new Builder('', Base.btns_bordered, Blocks.promo, Elem.btn, Mode.get_promo).button();

  if (mode === Mode.promo) {
    promoTitleFirst.textContent = Titles.PROMO_FIRST;
    promoTitleSecond.textContent = Titles.PROMO_SECOND;
    promoTitleLast.textContent = Titles.PROMO_LAST;
    promoButton.textContent = Buttons.GET_PROMO;
    promoButton.setAttribute('id', Mode.get_promo);
  } else if (mode === Mode.banner) {
    promoTitleFirst.textContent = Titles.BANNER_FIRST;
    promoTitleSecond.textContent = Titles.BANNER_SECOND;
    promoTitleLast.textContent = Titles.BANNER_LAST;
    promoButton.textContent = Buttons.GET_PROMO;
    promoButton.setAttribute('id', Mode.get_banner);
  }

  promoTitle.append(promoTitleFirst, promoTitleSecond, promoTitleLast);
  promoContent.append(promoTitle, promoButton);
  promoWrapper.append(promoContent);

  return promoWrapper;
}
