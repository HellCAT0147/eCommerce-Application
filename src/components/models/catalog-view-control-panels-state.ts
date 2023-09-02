import SortParameter from './sort-parameter';

type CatalogViewControlPanelsState = {
  brands: Array<string>;
  sizes: Array<string>;
  colors: Array<string>;
  maxPrice: number;
  sortParameters: SortParameter;
  query?: string;
};

export default CatalogViewControlPanelsState;
