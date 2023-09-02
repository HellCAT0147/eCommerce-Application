import { Product, Image, ProductData, ProductVariant } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { DataBase } from '../../../models/commerce';
import ResultPagination from '../../../models/result-pagination';
import SortParameter from '../../../models/sort-parameter';
import CatalogViewControlPanelsState from '../../../models/catalog-view-control-panels-state';

export default class ViewCatalog {
  private static colorsHexes: Array<string> = [
    '#000000',
    '#0000ff',
    '#ffffff',
    '#ffff00',
    '#00ff00',
    '#ff99cc',
    '#99ffff',
  ];

  public static resetButtonId = 'reset-filters_btn';

  private static zeroState: CatalogViewControlPanelsState = {
    brands: [],
    colors: [],
    sizes: [],
    maxPrice: 0,
    sortParameters: {
      field: 'key',
      descending: false,
    },
  };

  public static OnViewChangedEvent = new CustomEvent('CatalogViewFilterStateChanged');

  private static filtersWrapperBuilder = new Builder('div', '', Blocks.catalog, 'filter', 'wrapper');

  private static catalogContainerId = `${Blocks.catalog}__main_container`;

  private state: CatalogViewControlPanelsState = structuredClone(ViewCatalog.zeroState);

  public showError(msg: string): string {
    // TODO implement popup with error
    return msg;
  }

  public showProduct(data: ProductData): void {
    const main: HTMLElement | null = document.querySelector(`.${Blocks.main}__${Mode.catalog}`);
    if (main) {
      main.innerHTML = '';

      const product: HTMLElement = new Builder('article', '', Blocks.product, Elem.wrapper, '').element();
      const name: HTMLHeadingElement = new Builder('h2', Base.titles, Blocks.product, Elem.title, Mode.big).h(2);
      const description: HTMLParagraphElement = new Builder('p', '', Blocks.product, Elem.desc, '').p();
      const descriptionFromHost: string = data.description?.['en-US'].toString() ?? '';
      const productBody: HTMLElement = new Builder('div', '', Blocks.product, Elem.wrapper, Mode.body).element();

      name.textContent = data.name['en-US'].toString().toUpperCase();
      description.textContent = descriptionFromHost;

      this.addSlider(productBody, data.masterVariant.images);

      productBody.appendChild(name);
      product.append(productBody, description);
      main.appendChild(product);
    }
  }

  private async addSlider(parent: HTMLElement, images?: Image[]): Promise<void> {
    const slider: HTMLElement = new Builder('div', Base.swiper, '', '', '').element();
    const sliderWrapper: HTMLElement = new Builder('div', Base.sw_wrap, '', '', '').element();

    images?.forEach((image) => {
      const slide: HTMLElement = new Builder('div', Base.sw_slide, '', '', '').element();
      const img: HTMLElement = new Builder('', Base.img, Blocks.product, Elem.image, '').img(
        image.url,
        image.label || DataBase.img_alt
      );
      slide.appendChild(img);
      sliderWrapper.appendChild(slide);
    });

    const nextEl: HTMLElement = new Builder('div', Base.sw_next, '', '', '').element();
    const prevEl: HTMLElement = new Builder('div', Base.sw_prev, '', '', '').element();
    const pagination: HTMLElement = new Builder('div', Base.sw_page, '', '', '').element();

    slider.append(sliderWrapper, pagination, prevEl, nextEl);
    parent.appendChild(slider);

    const Swiper = await import('swiper/bundle');
    const swiper = new Swiper.Swiper(`.${Base.swiper}`, {
      loop: true,
      pagination: {
        el: `.${Base.sw_page}`,
      },
      navigation: {
        nextEl: `.${Base.sw_next}`,
        prevEl: `.${Base.sw_prev}`,
      },
      autoplay: {
        delay: 3000,
      },
      speed: 700,
    });
    swiper.enable();
  }

  private createBreadCrumbs(): HTMLElement {
    const breadcrumbs: HTMLElement = new Builder('div', Base.links, Blocks.catalog, 'breadcrumbs', '').element();
    breadcrumbs.setAttribute('id', 'breadcrumbs');
    breadcrumbs.innerText = 'Shop/Female/Dresses';
    // TODO fill with links in 3_08
    return breadcrumbs;
  }

  private createBrandFilterBox(): HTMLElement {
    const brandFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'brand').element();
    const brandFilterHeader: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter-box', 'header').element();
    brandFilterHeader.innerText = 'BRAND';
    brandFilter.append(brandFilterHeader);
    const brands = ['HAQ-inc', 'RS-fashion', 'Bold Italics'];
    brands.forEach((brand: string, index: number) => {
      const label: HTMLLabelElement = document.createElement('label');
      label.className = 'catalog__filter-box_variant';
      const brandCheck: HTMLInputElement = new Builder(
        'input',
        Base.check,
        Blocks.catalog,
        'filter-box',
        'brand-variant'
      ).input();
      brandCheck.setAttribute('id', `brand-${index + 1}`);
      brandCheck.setAttribute('type', 'checkbox');
      brandCheck.addEventListener('change', () => {
        if (brandCheck.checked) {
          this.state.brands.push(brand);
        } else {
          this.state.brands.splice(this.state.brands.indexOf(brand), 1);
        }
        document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
      });
      brandCheck.checked = this.state.brands.includes(brand);
      label.append(brandCheck, brand);
      brandFilter.append(label);
    });
    return brandFilter;
  }

  private createSizeFilterBox(): HTMLElement {
    const sizeFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'size').element();
    const sizeFilterHeader: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter-box', 'header').element();
    sizeFilterHeader.innerText = 'SIZE';
    sizeFilter.append(sizeFilterHeader);
    const sizes = ['small', 'medium', 'large'];
    sizes.forEach((size: string, index: number) => {
      const label: HTMLLabelElement = document.createElement('label');
      label.className = 'catalog__filter-box_variant';
      const sizeCheck: HTMLInputElement = new Builder(
        'input',
        Base.check,
        Blocks.catalog,
        'filter-box',
        'size-variant'
      ).input();
      sizeCheck.setAttribute('id', `size-${index + 1}`);
      sizeCheck.setAttribute('type', 'checkbox');
      sizeCheck.addEventListener('change', () => {
        if (sizeCheck.checked) {
          this.state.sizes.push(size);
        } else {
          this.state.sizes.splice(this.state.sizes.indexOf(size), 1);
        }
        document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
      });
      sizeCheck.checked = this.state.sizes.includes(size);
      label.append(sizeCheck, size);
      sizeFilter.append(label);
    });
    return sizeFilter;
  }

  private createColorFilterBox(): HTMLElement {
    const colorFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'color').element();
    const colorFilterHeader: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter-box', 'header').element();
    colorFilterHeader.innerText = 'COLOR';
    colorFilter.append(colorFilterHeader);
    ViewCatalog.colorsHexes.forEach((color: string, index: number) => {
      const label: HTMLLabelElement = document.createElement('label');
      label.className = 'catalog__filter-box_variant';
      const colorCheck: HTMLInputElement = new Builder(
        'input',
        Base.check,
        Blocks.catalog,
        'filter-box',
        'color-variant'
      ).input();
      colorCheck.setAttribute('id', `color-${index + 1}`);
      colorCheck.setAttribute('type', 'checkbox');
      colorCheck.addEventListener('change', () => {
        if (colorCheck.checked) {
          this.state.colors.push(color);
        } else {
          this.state.colors.splice(this.state.colors.indexOf(color), 1);
        }
        document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
      });
      colorCheck.checked = this.state.colors.includes(color);

      label.append(colorCheck);
      label.setAttribute('style', `background-color: ${color}`);
      colorFilter.append(label);
    });
    return colorFilter;
  }

  private createPriceFilter(): HTMLElement {
    const priceFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'price').element();
    const priceFilterHeader: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter-box', 'header').element();
    priceFilterHeader.innerText = 'MAX PRICE';
    priceFilter.append(priceFilterHeader);
    const range: HTMLInputElement = new Builder('input', '', Blocks.catalog, 'filter-box', 'range').input();
    range.setAttribute('type', 'range');
    range.setAttribute('min', '0');
    range.setAttribute('max', '30000');
    range.setAttribute('value', '30000');
    range.setAttribute('id', 'price-limit_range');
    range.addEventListener('change', () => {
      const parsed: number = parseInt(range.value, 10);
      if (Number.isNaN(parsed) || parsed === Infinity || parsed === -Infinity) {
        return;
      }
      this.state.maxPrice = parsed;
      document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
    });
    range.value = this.state.maxPrice.toString();
    const label: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter-box', 'range-label').element();
    const min: HTMLSpanElement = document.createElement('span');
    min.innerText = '0';
    const curr: HTMLSpanElement = document.createElement('span');
    curr.setAttribute('id', 'price-limit_label');
    curr.innerText = '30000';
    const max: HTMLSpanElement = document.createElement('span');
    max.innerText = '30000';
    label.append(min, curr, max);
    priceFilter.append(range, label);
    return priceFilter;
  }

  private createFilters(): HTMLElement {
    const filters: HTMLElement = ViewCatalog.filtersWrapperBuilder.element();
    const filtersHeader: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'header').element();
    filtersHeader.innerText = 'FILTERS';
    const brandFilter: HTMLElement = this.createBrandFilterBox();
    const sizeFilter: HTMLElement = this.createSizeFilterBox();
    const colorFilter: HTMLElement = this.createColorFilterBox();
    const priceFilter: HTMLElement = this.createPriceFilter();
    const resetFiltersBtn = new Builder('button', Base.btns_bordered, Blocks.catalog, 'filter', 'button').element();
    resetFiltersBtn.innerText = 'RESET FILTERS';
    resetFiltersBtn.setAttribute('id', ViewCatalog.resetButtonId);
    filters.append(filtersHeader, brandFilter, sizeFilter, colorFilter, priceFilter, resetFiltersBtn);
    return filters;
  }

  private createPageSettings(sortParams: SortParameter = this.state.sortParameters): HTMLElement {
    const sortingDropdown: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-dropdown', '').element();

    const nameAsc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-name-asc', '').element();
    nameAsc.innerText = 'NAME (A-Z)';
    const nameDesc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-name-desc', '').element();
    nameDesc.innerText = 'NAME (Z-A)';
    const priceAsc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-price-asc', '').element();
    priceAsc.innerText = 'PRICE (LOW-HIGH)';
    const priceDesc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-price-desc', '').element();
    priceDesc.innerText = 'PRICE (HIGH-LOW)';

    switch (true) {
      case sortParams.field === 'name' && sortParams.descending === true:
        sortingDropdown.innerText = 'NAME (Z-A)';
        nameDesc.className += '_sorted';
        break;
      case sortParams.field === 'price' && sortParams.descending === false:
        sortingDropdown.innerText = 'PRICE (LOW-HIGH)';
        priceAsc.className += '_sorted';
        break;
      case sortParams.field === 'price' && sortParams.descending === true:
        sortingDropdown.innerText = 'PRICE (HIGH-LOW)';
        priceDesc.className += '_sorted';
        break;
      default:
        sortingDropdown.innerText = 'NAME (A-Z)';
        nameAsc.className += '_sorted';
    }
    sortingDropdown.append(nameAsc, nameDesc, priceAsc, priceDesc);
    return sortingDropdown;

    // TODO add products per page section if necessary
  }

  private createCatalogCard(product: Product): HTMLElement {
    const card: HTMLElement = new Builder('div', Base.cards, Blocks.catalog, 'card', '').element();
    const cardPic: HTMLElement = new Builder('img', '', Blocks.catalog, 'card', 'pic').element();
    const { images }: ProductVariant = product.masterData.current.masterVariant;
    if (images && images.length > 0) {
      cardPic.setAttribute('src', images[0].url);
    }
    const nameTag: HTMLElement = new Builder('div', '', Blocks.catalog, 'card', 'name-tag').element();
    nameTag.innerText = product.masterData.current.name['en-US'].toString().toUpperCase();
    const descriptionTag: HTMLElement = new Builder('div', '', Blocks.catalog, 'card', 'description-tag').element();
    descriptionTag.innerText = product.masterData.current.description?.['en-US'].toString() || '';
    const readMore: HTMLElement = new Builder('div', '', Blocks.catalog, 'read-more', '').element();
    readMore.innerText = 'READ MORE';
    const priceTag: HTMLElement = new Builder('div', '', Blocks.catalog, 'card', 'price-tag').element();
    const basePrice: HTMLElement = new Builder('span', '', Blocks.catalog, 'card', 'base-price').element();
    basePrice.innerText = `${product.masterData.current.masterVariant.prices?.[0].value.centAmount
      .toString()
      .slice(0, -2)} RUB`;
    priceTag.append(basePrice);
    if (product.masterData.current.masterVariant.prices?.[0].discounted) {
      const discountedPrice: HTMLElement = new Builder('span', '', Blocks.catalog, 'card', 'disc-price').element();
      discountedPrice.innerText = `${product.masterData.current.masterVariant.prices?.[0].discounted.value.centAmount
        .toString()
        .slice(0, -2)} RUB`;
      priceTag.append(discountedPrice);
    }
    card.append(cardPic, nameTag, descriptionTag, readMore, priceTag);
    card.setAttribute('id', (product.key || '0').split('-')[1]);
    return card;
  }

  public fillCatalogPage(resultPagination: ResultPagination<Product>): HTMLElement {
    const page: HTMLElement =
      document.getElementById(ViewCatalog.catalogContainerId) ||
      new Builder('div', '', Blocks.catalog, 'page', '').element();
    page.innerHTML = '';
    page.id = ViewCatalog.catalogContainerId;
    const products: Product[] = Array.from(resultPagination.paginationResult);
    products.forEach((product: Product) => {
      page.append(this.createCatalogCard(product));
    });
    return page;
  }

  public constructCatalogPage(resultPagination: ResultPagination<Product>): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Mode.catalog}`);
    if (main) {
      main.innerHTML = '';
      const pageAndFilters: HTMLElement = new Builder('div', '', Blocks.catalog, 'page-and-filters', '').element();
      pageAndFilters.append(this.createFilters(), this.fillCatalogPage(resultPagination));
      main.append(this.createBreadCrumbs(), this.createPageSettings(), pageAndFilters);
      // console.log(resultPagination);
    }
  }

  public resetState(): void {
    const colorsClassname = ViewCatalog.filtersWrapperBuilder.getBiggestClassName();
    if (colorsClassname != null) {
      const wrapper = Array.from(document.getElementsByClassName(colorsClassname));
      wrapper.forEach((element) => {
        Array.from(element.getElementsByTagName('input')).forEach((input) => {
          const wrappedInput = input;
          switch (input.type) {
            case 'checkbox':
              wrappedInput.checked = false;
              break;
            case 'range':
              wrappedInput.value = input.max;
              break;
            default:
              break;
          }
        });
      });
    }
  }

  public collectData(): CatalogViewControlPanelsState {
    return structuredClone(this.state);
  }
}
