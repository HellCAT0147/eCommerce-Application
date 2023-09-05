import { createHamburger } from '../hamburger';
import createHeader from '../header';
import createNavigation from '../navigation';
import { createTemplate } from '../template';

test('hamburger is HTML Element', () => {
  expect(createHamburger()).toBeInstanceOf(HTMLElement);
});

test('header is HTMLElement', () => {
  expect(createHeader(true)).toBeInstanceOf(HTMLElement);
});

test('navbar is HTMLElement', () => {
  expect(createNavigation(true)).toBeInstanceOf(HTMLElement);
});

test('template is HTMLElement', () => {
  expect(createTemplate()).toBeInstanceOf(HTMLElement);
});
