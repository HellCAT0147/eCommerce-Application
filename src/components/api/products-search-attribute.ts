import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import CatalogViewControlPanelsState from '../models/catalog-view-control-panels-state';

function createQueryArrays(key: string, values: Array<string>): Array<string> {
  const suffix = `attributes.${key}.key:${values.map((value) => `"${value}"`).join(',')}`;
  switch (values.length) {
    case 0:
      return [];
    default:
      return [`variants.${suffix}`];
  }
}

export default function createQueryStringFromCatalogViewState(state: CatalogViewControlPanelsState): Array<string> {
  const resultQuery: Array<string> = [];

  resultQuery.push(...createQueryArrays('color', state.colors));
  resultQuery.push(...createQueryArrays('size', state.sizes));
  resultQuery.push(...createQueryArrays('brand', state.brands));
  resultQuery.push(`variants.price.centAmount:range (* to ${state.maxPrice * 100})`);

  const latestCategory: Category | undefined =
    state.categories.length > 0 ? state.categories[state.categories.length - 1] : undefined;
  if (latestCategory) {
    resultQuery.push(`categories.id: subtree("${latestCategory.id}")`);
  }

  if (resultQuery.length === 0) {
    return [];
  }
  return resultQuery;
}
