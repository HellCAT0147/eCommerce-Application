import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import SortParameter from './sort-parameter';

type CatalogViewControlPanelsState = {
  brands: Array<string>;
  sizes: Array<string>;
  colors: Array<string>;
  maxPrice: number;
  sortParameters: Array<SortParameter>;
  query?: string;
  categories: Array<Category>;
};

export default CatalogViewControlPanelsState;
