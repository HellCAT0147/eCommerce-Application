import createTemplateAboutUS from '../template';

test('createTemplateAboutUS function should create HTMLElement', () => {
  expect(createTemplateAboutUS()).toBeInstanceOf(HTMLElement);
});
