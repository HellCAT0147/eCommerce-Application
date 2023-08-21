import createTemplateLogin from '../template';

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplateLogin()).toBeInstanceOf(HTMLElement);
});
