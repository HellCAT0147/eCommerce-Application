import createTemplate from '../template';

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplate()).toBeInstanceOf(HTMLElement);
});
