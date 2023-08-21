import createTemplateNotFound from '../template';

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplateNotFound()).toBeInstanceOf(HTMLElement);
});
