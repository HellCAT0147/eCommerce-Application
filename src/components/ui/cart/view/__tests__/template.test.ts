import createTemplateCart from '../template';

test('createTemplateCart function should create HTMLElement', () => {
  expect(createTemplateCart()).toBeInstanceOf(HTMLElement);
});
