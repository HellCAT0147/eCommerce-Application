import createTemplateProfile from '../template';

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplateProfile()).toBeInstanceOf(HTMLElement);
});
