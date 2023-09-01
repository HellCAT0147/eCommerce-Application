import { ErrorObject, Product } from '@commercetools/platform-sdk';
import ECommerceApi from '../../../api/e-commerce-api';
import ViewCatalog from '../view/view';
import ResultPagination from '../../../models/result-pagination';
import Pagination from '../../../models/pagination';
import SortParameter from '../../../models/sort-parameter';

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

  public async fetchProducts(
    pagination: Pagination = new Pagination(),
    sortParameter: SortParameter = { field: 'key', descending: false }
  ): Promise<void> {
    try {
      const response: ResultPagination<Product> | ErrorObject = await this.eCommerceApi.getProducts(
        pagination,
        sortParameter
      );
      if ('message' in response && 'code' in response) this.view.showError(response.message);
      else this.view.constructCatalogPage(response, sortParameter);
    } catch (error) {
      if (error instanceof Error) this.view.showError(error.message);
    }
  }
}
