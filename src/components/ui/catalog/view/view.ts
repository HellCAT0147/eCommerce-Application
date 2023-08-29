import { ProductData } from '@commercetools/platform-sdk';
import { Blocks, Mode } from '../../../models/builder';

export default class ViewCatalog {
  public showError(msg: string): string {
    // TODO implement popup with error
    return msg;
  }

  public showProduct(data: ProductData): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Mode.catalog}`);
    if (main) {
      const product: HTMLDivElement = document.createElement('div');
      const name: HTMLHeadingElement = document.createElement('h1');
      const description: HTMLHeadingElement = document.createElement('p');
      const descriptionFromHost: string = data.description?.['en-US'].toString() ?? '';

      name.textContent = data.name['en-US'].toString();
      description.textContent = descriptionFromHost;
      product.append(name, description);

      const { images } = data.masterVariant;
      images?.forEach((image) => {
        const img: HTMLImageElement = document.createElement('img');
        img.src = image.url;
        img.alt = image.label ?? 'Preview of clothes';
        product.appendChild(img);
      });

      main.appendChild(product);
    }
  }
}
