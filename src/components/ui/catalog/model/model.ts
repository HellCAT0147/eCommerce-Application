import { ErrorObject, Product, ProductProjection } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ViewCatalog from '../view/view';
import ResultPagination from '../../../models/result-pagination';
import Pagination from '../../../models/pagination';
import createQueryStringFromCatalogViewState from '../../../api/products-search-attribute';

export default class ModelCatalog {
  protected eCommerceApi: ECommerceApi;

  protected view: ViewCatalog;

  public constructor(eCommerceApi: ECommerceApi) {
    this.eCommerceApi = eCommerceApi;
    this.view = new ViewCatalog();
  }

  public async fetchProduct(key: string, preResponse: Product | ErrorObject): Promise<void> {
    if (preResponse) {
      this.view.showProduct(preResponse.masterData.current);
      return;
    }
    try {
      const response: Product | ErrorObject = await this.eCommerceApi.getProduct(key);
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else this.view.showProduct(response.masterData.current);
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }

  public async fetchProducts(pagination: Pagination = new Pagination(), justFill: boolean = false): Promise<void> {
    try {
      const viewState = this.view.collectData();
      const response: ResultPagination<ProductProjection> | ErrorObject = await this.eCommerceApi.getProducts(
        viewState.sortParameters,
        pagination,
        createQueryStringFromCatalogViewState(viewState),
        viewState.query
      );
      if ('message' in response && 'code' in response) {
        this.view.showError(response.message);
      } else {
        if (justFill) {
          this.view.fillCatalogPage(response);
          return;
        }
        this.view.constructCatalogPage(response);
      }
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }

  public async resetProducts(): Promise<void> {
    this.view.resetState();
  }
}
