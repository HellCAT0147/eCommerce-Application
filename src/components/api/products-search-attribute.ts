import CatalogViewControlPanelsState from '../models/catalog-view-control-panels-state';

function createQueryString(key: string, values: Array<string>, prefix: string = ''): string {
  switch (values.length) {
    case 0:
      return '';
    case 1:
      return `${prefix}attributes(name="${key}" and value(key="${values[0]}"))`;
    default:
      return `${prefix}attributes(name="${key}" and value(key in (${values.map((v) => `"${v}"`).join(',')})))`;
  }
}

export default function createQueryStringFromCatalogViewState(
  state: CatalogViewControlPanelsState
): string | undefined {
  let resultQuery = '';

  resultQuery += createQueryString('color', state.colors);
  resultQuery += createQueryString('size', state.sizes, resultQuery ? ' and ' : '');
  resultQuery += createQueryString('brand', state.brands, resultQuery ? ' and ' : '');
  resultQuery += `${resultQuery ? ' and ' : ''}prices(value(centAmount < ${
    state.maxPrice * 100
  }) or discounted(value(centAmount < ${state.maxPrice * 100})))`;

  if (resultQuery.length === 0) {
    return undefined;
  }
  return `masterData(current(variants(${resultQuery}) or masterVariant(${resultQuery})))`;
}
