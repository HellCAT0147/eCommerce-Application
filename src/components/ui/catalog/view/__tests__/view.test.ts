import ViewCatalog from '../view';

global.structuredClone = jest.fn((val) => {
  return JSON.parse(JSON.stringify(val));
});

test('ViewCatalog is instanceOf ViewCatalog', () => {
  const viewCatalog: ViewCatalog = new ViewCatalog();
  expect(viewCatalog).toBeInstanceOf(ViewCatalog);
});

test('ViewCatalog.createSizeFilterBox creates a filterbox', () => {
  const viewCatalog: ViewCatalog = new ViewCatalog();
  expect(viewCatalog.createSizeFilterBox()).toBeInstanceOf(HTMLElement);
});

test('ViewCatalog.createColorFilterBox creates a filterbox', () => {
  const viewCatalog: ViewCatalog = new ViewCatalog();
  expect(viewCatalog.createColorFilterBox()).toBeInstanceOf(HTMLElement);
});

test('ViewCatalog.createBrandFilterBox creates a filterbox', () => {
  const viewCatalog: ViewCatalog = new ViewCatalog();
  expect(viewCatalog.createBrandFilterBox()).toBeInstanceOf(HTMLElement);
});

test('ViewCatalog.createPriceFilterBox creates a filterbox', () => {
  const viewCatalog: ViewCatalog = new ViewCatalog();
  expect(viewCatalog.createPriceFilter()).toBeInstanceOf(HTMLElement);
});

test('ViewCatalog.createFilters creates a set of filterboxes', () => {
  const viewCatalog: ViewCatalog = new ViewCatalog();
  expect(viewCatalog.createFilters()).toBeInstanceOf(HTMLElement);
});

test('ViewCatalog.createPageSettings creates a set of page settings', () => {
  const viewCatalog: ViewCatalog = new ViewCatalog();
  expect(viewCatalog.createPageSettings()).toBeInstanceOf(HTMLElement);
});
