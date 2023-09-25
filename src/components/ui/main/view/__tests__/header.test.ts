import createHeader from '../header';

test('CreateHeader function should create HTMLElement', () => {
  expect(createHeader()).toBeInstanceOf(HTMLElement);
});
