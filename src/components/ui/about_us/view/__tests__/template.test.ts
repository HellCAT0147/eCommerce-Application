import createTemplateAboutUs from '../template';

test('createTemplateAboutUs function should create HTMLElement', () => {
  expect(createTemplateAboutUs()).toBeInstanceOf(HTMLElement);
});
