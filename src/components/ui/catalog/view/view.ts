import { Product, ProductData, ProductVariant } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import DataBase from '../../../models/commerce';
import ResultPagination from '../../../models/result-pagination';
import SortParameter from '../../../models/sort-parameter';

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

  private createBreadCrumbs(): HTMLElement {
    const breadcrumbs: HTMLElement = new Builder('div', Base.links, Blocks.catalog, 'breadcrumbs', '').element();
    breadcrumbs.setAttribute('id', 'breadcrumbs');
    breadcrumbs.innerText = 'Shop/Female/Dresses';
    // TODO fill with links in 3_08
    return breadcrumbs;
  }

  private createFilters(): HTMLElement {
    const filters: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'wrapper').element();
    const priceFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'price').element();
    const brandFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'brand').element();
    const sizeFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'size').element();
    const colorFilter: HTMLElement = new Builder('div', '', Blocks.catalog, 'filter', 'color').element();
    filters.append(priceFilter, brandFilter, sizeFilter, colorFilter);
    return filters;
  }

  private createPageSettings(sortParams: SortParameter): HTMLElement {
    const sortingDropdown: HTMLElement = new Builder('div', '', Blocks.catalog, 'sorting-dropdown', '').element();

    const nameAsc = new Builder('div', '', Blocks.catalog, 'sorting-name-asc', '').element();
    nameAsc.innerText = 'NAME (A-Z)';
    const nameDesc = new Builder('div', '', Blocks.catalog, 'sorting-name-desc', '').element();
    nameDesc.innerText = 'NAME (Z-A)';
    const priceAsc = new Builder('div', '', Blocks.catalog, 'sorting-price-asc', '').element();
    priceAsc.innerText = 'PRICE (LOW-HIGH)';
    const priceDesc = new Builder('div', '', Blocks.catalog, 'sorting-price-desc', '').element();
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
    const card: HTMLElement = new Builder('div', '', Blocks.catalog, 'card', '').element();
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
    priceTag.innerText = `${product.masterData.current.masterVariant.prices?.[0].value.centAmount
      .toString()
      .slice(0, -2)} RUB`;
    // TODO work on discounted price
    card.append(cardPic, nameTag, descriptionTag, readMore, priceTag);
    card.setAttribute('id', (product.key || '0').split('-')[1]);
    return card;
  }

  private createCatalogPage(resultPagination: ResultPagination<Product>): HTMLElement {
    const page: HTMLElement = new Builder('div', '', Blocks.catalog, 'page', '').element();
    const products: Product[] = Array.from(resultPagination.paginationResult);
    products.forEach((product: Product) => {
      page.append(this.createCatalogCard(product));
    });
    return page;
  }

  public constructCatalogPage(resultPagination: ResultPagination<Product>, sortParam: SortParameter): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Mode.catalog}`);
    if (main) {
      main.innerHTML = '';
      const pageAndFilters: HTMLElement = new Builder('div', '', Blocks.catalog, 'page-and-filters', '').element();
      pageAndFilters.append(this.createFilters(), this.createCatalogPage(resultPagination));
      main.append(this.createBreadCrumbs(), this.createPageSettings(sortParam), pageAndFilters);
    }
  }
}
