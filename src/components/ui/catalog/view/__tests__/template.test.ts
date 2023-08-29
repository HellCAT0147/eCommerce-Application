import createTemplateCatalog from '../template';

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplateCatalog()).toBeInstanceOf(HTMLElement);
});
