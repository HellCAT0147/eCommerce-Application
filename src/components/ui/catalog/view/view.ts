import { ProductData } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import DataBase from '../../../models/commerce';

export default class ViewCatalog {
  public showError(msg: string): string {
    // TODO implement popup with error
    return msg;
  }

  public showProduct(data: ProductData): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Mode.catalog}`);
    if (main) {
      main.innerHTML = '';

      const product: HTMLElement = new Builder('article', '', Blocks.product, Elem.wrapper, '').element();
      const name: HTMLHeadingElement = new Builder('h2', Base.titles, Blocks.product, Elem.title, Mode.big).h(2);
      const description: HTMLParagraphElement = new Builder('p', '', Blocks.product, Elem.desc, '').p();
      const descriptionFromHost: string = data.description?.['en-US'].toString() ?? '';

      name.textContent = data.name['en-US'].toString();
      description.textContent = descriptionFromHost;
      product.append(name, description);

      const { images } = data.masterVariant;
      images?.forEach((image) => {
        const img: HTMLElement = new Builder('', Base.img, Blocks.product, Elem.image, '').img(
          image.url,
          image.label || DataBase.img_alt
        );
        product.appendChild(img);
      });

      main.appendChild(product);
    }
  }
}
