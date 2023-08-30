import { ProductData } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import DataBase from '../../../models/commerce';

export default class ViewCatalog {
  public showError(msg: string): string {
    // TODO implement popup with error
    return msg;
  }

  public async showProduct(data: ProductData): Promise<void> {
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
      const slider: HTMLElement = new Builder('div', 'swiper', '', '', '').element();
      const sliderWrapper: HTMLElement = new Builder('div', 'swiper-wrapper', '', '', '').element();
      images?.forEach((image) => {
        const slide: HTMLElement = new Builder('div', 'swiper-slide', '', '', '').element();
        const img: HTMLElement = new Builder('', Base.img, Blocks.product, Elem.image, '').img(
          image.url,
          image.label || DataBase.img_alt
        );
        slide.appendChild(img);
        sliderWrapper.appendChild(slide);
      });

      const nextEl: HTMLElement = new Builder('div', 'swiper-button-next', '', '', '').element();
      const prevEl: HTMLElement = new Builder('div', 'swiper-button-prev', '', '', '').element();
      const pagination: HTMLElement = new Builder('div', 'swiper-pagination', '', '', '').element();
      slider.append(sliderWrapper, pagination, prevEl, nextEl);
      product.appendChild(slider);
      main.appendChild(product);

      const Swiper = await import('swiper/bundle');
      const swiper = new Swiper.Swiper('.swiper', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 3000,
        },
        speed: 700,
      });
      swiper.enable();
    }
  }
}
