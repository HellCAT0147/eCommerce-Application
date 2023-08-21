import createTemplateRegistration from '../template';

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplateRegistration()).toBeInstanceOf(HTMLElement);
});
