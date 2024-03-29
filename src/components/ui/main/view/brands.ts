import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';

export default function renderBrands(): HTMLElement {
  const brands: HTMLElement = new Builder('section', Base.brands, Blocks.main, Elem.brands, Mode.catalog).a();
  const brandsTitle: HTMLHeadingElement = new Builder('', '', Blocks.brands, Elem.title, '').h(2);
  const chanel: HTMLElement = new Builder('div', '', Blocks.brands, Elem.brand, '').element();
  const burberry: HTMLElement = new Builder('div', '', Blocks.brands, Elem.brand, '').element();
  const fendi: HTMLElement = new Builder('div', '', Blocks.brands, Elem.brand, '').element();
  const dior: HTMLElement = new Builder('div', '', Blocks.brands, Elem.brand, '').element();
  const versace: HTMLElement = new Builder('div', '', Blocks.brands, Elem.brand, '').element();
  const gucci: HTMLElement = new Builder('div', '', Blocks.brands, Elem.brand, '').element();
  const armani: HTMLElement = new Builder('div', '', Blocks.brands, Elem.brand, '').element();

  brands.textContent = '';
  brandsTitle.textContent = Titles.FASHION.toUpperCase();
  chanel.textContent = Titles.BRAND_CHANEL;
  burberry.textContent = Titles.BRAND_RS;
  fendi.textContent = Titles.BRAND_BOLD;
  dior.textContent = Titles.BRAND_DIOR;
  versace.textContent = Titles.BRAND_HAQ;
  gucci.textContent = Titles.BRAND_GUCCI;
  armani.textContent = Titles.BRAND_ARMANI;

  brands.append(brandsTitle, chanel, dior, burberry, fendi, versace, gucci, armani);

  return brands;
}
