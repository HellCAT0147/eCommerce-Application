import { Image, ProductData, ProductVariant, ProductProjection } from '@commercetools/platform-sdk';
import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { DataBase } from '../../../models/commerce';
import ResultPagination from '../../../models/result-pagination';
import SortParameter from '../../../models/sort-parameter';
import CatalogViewControlPanelsState from '../../../models/catalog-view-control-panels-state';
import Controls from '../../../models/swiper';

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

  private static colorsKeys: Array<string> = ['black', 'blue', 'white', 'yellow', 'green', 'pink', 'tiffany'];

  public static resetButtonId = 'reset-filters_btn';

  public static nameAscSortingParameters: Array<SortParameter> = [
    {
      field: 'name.en-US',
      descending: false,
    },
  ];

  public static nameDescSortingParameters: Array<SortParameter> = [
    {
      field: 'name.en-US',
      descending: true,
    },
  ];

  public static priceAscSortingParameters: Array<SortParameter> = [
    {
      field: 'price',
      descending: false,
    },
  ];

  public static priceDescSortingParameters: Array<SortParameter> = [
    {
      field: 'price',
      descending: true,
    },
  ];

  private static zeroState: CatalogViewControlPanelsState = {
    brands: [],
    colors: [],
    sizes: [],
    maxPrice: 15000,
    categories: [],
    sortParameters: ViewCatalog.nameAscSortingParameters,
  };

  public static OnViewChangedEvent = new CustomEvent('CatalogViewFilterStateChanged');

  private static filtersWrapperBuilder = new Builder('div', '', Blocks.catalog, 'filter', 'wrapper');

  private static breadcrumbsWrapperBuilder = new Builder('div', '', Blocks.catalog, 'breadcrumbs', 'wrapper');

  private static catalogContainerId = `${Blocks.catalog}__main_container`;

  private static breadcrumbsWrapperId = 'breadcrumbs';

  private state: CatalogViewControlPanelsState = structuredClone(ViewCatalog.zeroState);

  private categories?: Map<string | undefined, Array<Category>>;

  public showError(msg: string): string {
    // TODO implement popup with error
    return msg;
  }

  public showProduct(
    data: ProductData,
    name: string,
    basePrice: string,
    discountPrice: string,
    description: string,
    images?: Image[]
  ): void {
    const main: HTMLElement | null = document.querySelector(`.${Blocks.main}__${Mode.catalog}`);
    if (main) {
      main.innerHTML = '';

      const product: HTMLElement = new Builder('article', '', Blocks.product, Elem.wrapper, '').element();
      const productBody: HTMLElement = new Builder('div', '', Blocks.product, Elem.wrapper, Mode.body).element();
      const productInfo: HTMLElement = new Builder('div', '', Blocks.product, Elem.wrapper, Mode.info).element();
      const nameHTML: HTMLHeadingElement = new Builder('', Base.titles, Blocks.product, Elem.title, Mode.big).h(2);
      const descriptionHTML: HTMLParagraphElement = new Builder('', '', Blocks.product, Elem.desc, '').p();
      const priceHTML: HTMLElement = new Builder('div', '', Blocks.product, Elem.wrapper, Mode.price).element();
      const priceHeadingHTML: HTMLHeadingElement = new Builder(
        '',
        Base.titles,
        Blocks.product,
        Elem.title,
        Mode.price
      ).h(4);
      const basePriceHTML: HTMLElement = new Builder('span', '', Blocks.product, Elem.price, '').element();
      const discountPriceHTML: HTMLElement = new Builder('span', '', Blocks.product, Elem.price, Mode.disc).element();

      nameHTML.textContent = name;
      priceHeadingHTML.textContent = 'price total'.toUpperCase();
      basePriceHTML.textContent = basePrice;
      discountPriceHTML.textContent = discountPrice;
      descriptionHTML.textContent = description;

      this.addSlider(productBody, images);

      priceHTML.append(priceHeadingHTML, basePriceHTML, discountPriceHTML);
      productInfo.append(nameHTML, priceHTML);
      productBody.appendChild(productInfo);
      product.append(productBody, descriptionHTML);
      main.appendChild(product);
    }
  }

  private async addSlider(
    parent: HTMLElement,
    images?: Image[] | HTMLImageElement[],
    initImgID?: number
  ): Promise<void> {
    const slider: HTMLElement = new Builder('div', Base.swiper, '', '', '').element();
    const sliderWrapper: HTMLElement = new Builder('div', Base.sw_wrap, '', '', '').element();

    images?.forEach((image) => {
      const slide: HTMLElement = new Builder('div', Base.sw_slide, '', '', '').element();
      let img: HTMLElement;
      if (!(image instanceof HTMLImageElement)) {
        img = new Builder('', Base.img, Blocks.product, Elem.image, Mode.click).img(
          image.url,
          image.label || DataBase.img_alt
        );
      } else img = new Builder('', Base.img, Blocks.product, Elem.image, '').img(image.src, image.alt);
      slide.appendChild(img);
      sliderWrapper.appendChild(slide);
    });

    const nextEl: HTMLElement = new Builder(
      'div',
      Base.sw_next,
      Blocks.ctrl,
      Elem.btn,
      initImgID === undefined ? Mode.click : ''
    ).element();
    const prevEl: HTMLElement = new Builder(
      'div',
      Base.sw_prev,
      '',
      '',
      initImgID === undefined ? Mode.click : ''
    ).element();
    const pagination: HTMLElement = new Builder(
      'div',
      Base.sw_page,
      '',
      '',
      initImgID === undefined ? Mode.click : ''
    ).element();

    slider.append(sliderWrapper, pagination, prevEl, nextEl);
    parent.appendChild(slider);

    this.runSwiper(slider, pagination, { nextEl, prevEl }, initImgID);
  }

  private async runSwiper(
    slider: HTMLElement,
    pagination: HTMLElement,
    controls: Controls,
    initImgID: number | undefined
  ): Promise<void> {
    const Swiper = await import('swiper/bundle');
    const swiper = new Swiper.Swiper(slider, {
      loop: true,
      pagination: {
        el: pagination,
      },
      navigation: {
        nextEl: controls.nextEl,
        prevEl: controls.prevEl,
      },
      autoplay:
        initImgID === undefined
          ? {
              delay: 3000,
            }
          : false,
      speed: 700,
      initialSlide: initImgID,
    });
    swiper.enable();
  }

  public showModal(currentImgID: number, images: HTMLImageElement[]): void {
    const place: HTMLElement | null = document.querySelector(`.${Blocks.main}`);
    if (place) {
      const prevModal: HTMLDivElement | null = document.querySelector(`.${Blocks.product}__${Elem.modal}`);
      if (prevModal) prevModal.outerHTML = '';

      const modal: HTMLElement = new Builder('div', Base.modal, Blocks.product, Elem.modal, '').element();
      const modalContent: HTMLElement = new Builder('div', '', Blocks.modal, Elem.content, '').element();
      const closeBtn: HTMLElement = new Builder('div', '', Blocks.modal, Elem.close, '').element();

      modalContent.append(closeBtn);
      this.addSlider(modalContent, images, currentImgID);
      modal.appendChild(modalContent);
      place.appendChild(modal);
    }
  }

  public switchScroll(visibility: boolean): void {
    if (visibility) document.body.style.overflow = '';
    else document.body.style.overflow = 'hidden';
  }

  public hideModal(modal: HTMLElement): void {
    const localModal: HTMLElement = modal;
    localModal.outerHTML = '';
  }

  private toggleFiltersVisibility(filters: HTMLElement): void {
    if (window.innerWidth < 740 && !filters.classList.contains('dropped-down')) {
      filters.classList.add('dropped-down');
    } else {
      filters.classList.remove('dropped-down');
    }
  }

  private changeSorting(sortingMenu: HTMLElement, event: Event): void {
    const chosen: HTMLElement = event.target as HTMLElement;
    if (chosen === sortingMenu) {
      sortingMenu.classList.remove('dropped-down');
      return;
    }
    const variants: Element[] = Array.from(sortingMenu.children);
    variants.forEach((variant: Element) => {
      variant.classList.remove('sorted');
    });
    switch (true) {
      case chosen.classList.contains('catalog__sorting-price-desc'):
        this.state.sortParameters = ViewCatalog.priceDescSortingParameters;
        break;
      case chosen.classList.contains('catalog__sorting-price-asc'):
        this.state.sortParameters = ViewCatalog.priceAscSortingParameters;
        break;
      case chosen.classList.contains('catalog__sorting-name-desc'):
        this.state.sortParameters = ViewCatalog.nameDescSortingParameters;
        break;
      default:
        this.state.sortParameters = ViewCatalog.nameAscSortingParameters;
        break;
    }
    if (
      chosen.className === 'catalog__sorting-name-asc' ||
      chosen.className === 'catalog__sorting-name-desc' ||
      chosen.className === 'catalog__sorting-price-asc' ||
      chosen.className === 'catalog__sorting-price-desc'
    ) {
      chosen.classList.add('sorted');
      document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
    }
    sortingMenu.classList.remove('dropped-down');
  }

  private fillBreadcrumbs(
    breadcrumbsWrapper: HTMLElement | null = document.getElementById(ViewCatalog.breadcrumbsWrapperId)
  ): void {
    const noParamBreadcrumbsWrapper = breadcrumbsWrapper;
    if (noParamBreadcrumbsWrapper == null) return;
    noParamBreadcrumbsWrapper.innerHTML = '';
    const onRefresh: () => void = () => {
      this.fillBreadcrumbs();
      document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
    };
    const root = new Builder('button', '', Blocks.catalog, 'breadcrumbs', 'button').button();
    root.innerText = 'HAQ';
    root.setAttribute('id', 'cat-root-btn');
    root.addEventListener('click', () => {
      this.state.categories = [];
      onRefresh();
    });
    noParamBreadcrumbsWrapper.append(root);
    this.state.categories.forEach((category) => {
      const subtreeButton = new Builder('button', '', Blocks.catalog, 'breadcrumbs', 'button').button();
      subtreeButton.innerText = category.name['en-US'];
      noParamBreadcrumbsWrapper.append(subtreeButton);
      subtreeButton.addEventListener('click', () => {
        this.state.categories.splice(this.state.categories.indexOf(category) + 1);
        onRefresh();
      });
    });
    const latestCategory =
      this.state.categories.length > 0 ? this.state.categories[this.state.categories.length - 1] : undefined;
    const subcategories = this.categories?.get(latestCategory?.id);
    if (subcategories) {
      // TODO:: draw dropdown with subcategories
      const addCategoryButton = new Builder('button', '', Blocks.catalog, 'breadcrumbs', 'button').button();
      addCategoryButton.innerText = '+';
      noParamBreadcrumbsWrapper.append(addCategoryButton);
      addCategoryButton.addEventListener('click', () => {
        subcategories.forEach((subcategory) => {
          const subVar = new Builder('button', '', Blocks.catalog, 'breadcrumbs', 'button-variant').button();
          subVar.innerText = subcategory.name['en-US'];
          addCategoryButton.append(subVar);
          subVar.addEventListener('click', () => {
            this.state.categories.push(subcategory);
            onRefresh();
          });
        });
      });
    }
  }

  private createBreadCrumbs(): HTMLElement {
    const breadcrumbs: HTMLElement = ViewCatalog.breadcrumbsWrapperBuilder.element();
    breadcrumbs.id = ViewCatalog.breadcrumbsWrapperId;
    this.fillBreadcrumbs(breadcrumbs);
    return breadcrumbs;
  }

  private createSearchWrapper(): HTMLElement {
    const searchWrapper = new Builder('div', '', Blocks.catalog, 'search-wrapper', '').element();
    searchWrapper.setAttribute('id', 'search-wrapper');
    const searchInput: HTMLInputElement = new Builder('input', '', Blocks.catalog, 'search-wrapper', 'input').input();
    searchInput.setAttribute('id', 'search-input');
    searchInput.setAttribute('placeholder', 'WHAT ARE YOU LOOKING FOR?');
    searchInput.addEventListener('change', (): void => {
      this.state.query = searchInput.value;
    });
    const searchButton = new Builder('button', Base.btns_empty, Blocks.catalog, 'search-wrapper', 'button').button();
    searchButton.setAttribute('id', 'search-button');
    searchButton.textContent = `🔍`;
    searchButton.addEventListener('click', () => {
      searchInput.setAttribute(':focus', 'false');
      document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
    });
    searchWrapper.append(searchInput, searchButton);
    return searchWrapper;
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
      label.onclick = (e): void => {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT') {
          brandCheck.click();
        }
      };
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
      label.onclick = (e): void => {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT') {
          sizeCheck.click();
        }
      };
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
      const colorName = ViewCatalog.colorsKeys[index];
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
          this.state.colors.push(colorName);
        } else {
          this.state.colors.splice(this.state.colors.indexOf(colorName), 1);
        }
        document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
      });
      colorCheck.checked = this.state.colors.includes(color);
      label.onclick = (e): void => {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT') {
          colorCheck.click();
        }
      };
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
    const curr: HTMLSpanElement = document.createElement('span');
    const range: HTMLInputElement = new Builder('input', '', Blocks.catalog, 'filter-box', 'range').input();
    range.setAttribute('type', 'range');
    range.setAttribute('min', '0');
    range.setAttribute('max', ViewCatalog.zeroState.maxPrice.toString());
    range.setAttribute('id', 'price-limit_range');
    range.addEventListener('change', () => {
      const parsed: number = parseInt(range.value, 10);
      if (Number.isNaN(parsed) || parsed === Infinity || parsed === -Infinity) {
        return;
      }
      this.state.maxPrice = parsed;
      document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
      curr.innerText = `0 - ${this.state.maxPrice}`;
    });
    range.value = this.state.maxPrice.toString();
    const label: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter-box', 'range-label').element();

    curr.setAttribute('id', 'price-limit_label');
    curr.innerText = `0 - ${range.value}`;
    label.append(curr);
    priceFilter.append(range, label);
    return priceFilter;
  }

  private createFilters(): HTMLElement {
    const filters: HTMLElement = ViewCatalog.filtersWrapperBuilder.element();
    const filtersHeader: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'header').element();
    filtersHeader.innerText = 'FILTERS';
    const brandFilter: HTMLElement = this.createBrandFilterBox();
    brandFilter.classList.add('shown');
    const sizeFilter: HTMLElement = this.createSizeFilterBox();
    const colorFilter: HTMLElement = this.createColorFilterBox();
    const priceFilter: HTMLElement = this.createPriceFilter();
    const resetFiltersBtn = new Builder('button', Base.btns_bordered, Blocks.catalog, 'filter', 'button').element();
    resetFiltersBtn.innerText = 'RESET';
    resetFiltersBtn.setAttribute('id', ViewCatalog.resetButtonId);
    filters.append(filtersHeader, brandFilter, sizeFilter, colorFilter, priceFilter, resetFiltersBtn);
    filters.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName !== 'INPUT' && target.tagName !== 'LABEL') {
        this.toggleFiltersVisibility(filters);
      }
    });
    return filters;
  }

  private createPageSettings(): HTMLElement {
    const sortingDropdown: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-dropdown', '').element();

    const nameAsc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-name-asc', '').element();
    nameAsc.innerText = 'NAME (A-Z)';
    const nameDesc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-name-desc', '').element();
    nameDesc.innerText = 'NAME (Z-A)';
    const priceAsc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-price-asc', '').element();
    priceAsc.innerText = 'PRICE (LOW-HIGH)';
    const priceDesc: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-price-desc', '').element();
    priceDesc.innerText = 'PRICE (HIGH-LOW)';

    switch (this.state.sortParameters) {
      case ViewCatalog.nameDescSortingParameters:
        nameDesc.classList.add('sorted');
        break;
      case ViewCatalog.priceAscSortingParameters:
        priceAsc.classList.add('sorted');
        break;
      case ViewCatalog.priceDescSortingParameters:
        priceDesc.classList.add('sorted');
        break;
      default:
        nameAsc.classList.add('sorted');
        break;
    }
    sortingDropdown.append(nameAsc, nameDesc, priceAsc, priceDesc);
    sortingDropdown.addEventListener('click', (event) => {
      if (!sortingDropdown.classList.contains('dropped-down')) {
        sortingDropdown.classList.add('dropped-down');
      } else {
        this.changeSorting(sortingDropdown, event);
      }
    });

    return sortingDropdown;

    // TODO add products per page section if necessary
  }

  private createCatalogCard(product: ProductProjection): HTMLElement {
    const card: HTMLElement = new Builder('div', Base.cards, Blocks.catalog, 'card', '').element();
    const cardPic: HTMLElement = new Builder('img', '', Blocks.catalog, 'card', 'pic').element();
    const { images }: ProductVariant = product.masterVariant;
    if (images && images.length > 0) {
      cardPic.setAttribute('src', images[0].url);
    }
    const nameTag: HTMLElement = new Builder('div', '', Blocks.catalog, 'card', 'name-tag').element();
    nameTag.innerText = product.name['en-US'].toString().toUpperCase();
    const descriptionTag: HTMLElement = new Builder('div', '', Blocks.catalog, 'card', 'description-tag').element();
    descriptionTag.innerText = product.description?.['en-US'].toString() || '';
    const readMore: HTMLElement = new Builder('div', '', Blocks.catalog, 'read-more', '').element();
    readMore.innerText = 'READ MORE';
    const priceTag: HTMLElement = new Builder('div', '', Blocks.catalog, 'card', 'price-tag').element();
    const basePrice: HTMLElement = new Builder('span', '', Blocks.catalog, 'card', 'base-price').element();
    basePrice.innerText = `${product.masterVariant.prices?.[0].value.centAmount.toString().slice(0, -2)} RUB`;
    priceTag.append(basePrice);
    if (product.masterVariant.prices?.[0].discounted) {
      const discountedPrice: HTMLElement = new Builder('span', '', Blocks.catalog, 'card', 'disc-price').element();
      discountedPrice.innerText = `${product.masterVariant.prices?.[0].discounted.value.centAmount
        .toString()
        .slice(0, -2)} RUB`;
      priceTag.append(discountedPrice);
    }
    card.append(cardPic, nameTag, descriptionTag, readMore, priceTag);
    card.setAttribute('id', (product.key || '0').split('-')[1]);
    return card;
  }

  public fillCatalogPage(resultPagination: ResultPagination<ProductProjection>): HTMLElement {
    const page: HTMLElement =
      document.getElementById(ViewCatalog.catalogContainerId) ||
      new Builder('div', '', Blocks.catalog, 'page', '').element();
    page.innerHTML = '';
    page.id = ViewCatalog.catalogContainerId;
    const products: ProductProjection[] = Array.from(resultPagination.paginationResult);
    products.forEach((product: ProductProjection) => {
      page.append(this.createCatalogCard(product));
    });
    return page;
  }

  public fillCategories(categories: Map<string | undefined, Array<Category>>): void {
    this.categories = categories;
    this.fillBreadcrumbs();
  }

  public constructCatalogPage(resultPagination: ResultPagination<ProductProjection>): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Mode.catalog}`);
    if (main) {
      main.innerHTML = '';
      const pageAndFilters: HTMLElement = new Builder('div', '', Blocks.catalog, 'page-and-filters', '').element();
      pageAndFilters.append(this.createFilters(), this.fillCatalogPage(resultPagination));
      const searchAndSorting = new Builder('div', '', Blocks.catalog, 'search-and-sorting', '').element();
      searchAndSorting.append(this.createPageSettings(), this.createSearchWrapper());
      main.append(this.createBreadCrumbs(), searchAndSorting, pageAndFilters);
    }
  }

  public resetState(): void {
    const colorsClassname = ViewCatalog.filtersWrapperBuilder.getBiggestClassName();
    if (colorsClassname != null) {
      this.state = structuredClone(ViewCatalog.zeroState);
      const wrapper: Element[] = Array.from(document.getElementsByClassName(colorsClassname));
      wrapper.forEach((element: Element) => {
        Array.from(element.getElementsByTagName('input')).forEach((input) => {
          const wrappedInput: HTMLInputElement = input;
          switch (input.type) {
            case 'checkbox':
              wrappedInput.checked = false;
              break;
            case 'range':
              wrappedInput.value = this.state.maxPrice.toString();
              break;
            default:
              break;
          }
        });
      });
      const priceLabel: HTMLElement | null = document.getElementById('price-limit_label');
      if (priceLabel) {
        priceLabel.innerText = `0 - ${this.state.maxPrice.toString()}`;
      }
      const sortingDropdown: Element = document.getElementsByClassName('catalog__sorting-dropdown')[0];
      if (sortingDropdown) {
        Array.from(sortingDropdown.children).forEach((child) => {
          child.classList.remove('sorted');
        });
        const nameAsc: Element = sortingDropdown.getElementsByClassName('catalog__sorting-name-asc')[0];
        if (nameAsc) {
          nameAsc.classList.add('sorted');
        }
      }
      const searchInput = document.getElementById('search-input');
      if (searchInput && searchInput instanceof HTMLInputElement) {
        searchInput.value = '';
      }
      document.dispatchEvent(ViewCatalog.OnViewChangedEvent);
    }
  }

  public collectData(): CatalogViewControlPanelsState {
    return structuredClone(this.state);
  }
}
