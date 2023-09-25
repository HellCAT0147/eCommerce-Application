import { createTemplate, createTemplateMain } from '../template';

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplate()).toBeInstanceOf(HTMLElement);
});

test('CreateTemplate function should create HTMLElement', () => {
  expect(createTemplateMain()).toBeInstanceOf(HTMLElement);
});
