import { Blocks, Elem } from '../../../models/builder';
import Builder from '../html-builder';

const element: HTMLElement = new Builder('div', '', Blocks.main, Elem.err, '').element();
const input: HTMLInputElement = new Builder('', Blocks.main, '', Elem.err, '').input();
const label: HTMLLabelElement = new Builder('a', Blocks.main, '', Elem.err, '').label();
const form: HTMLFormElement = new Builder('span', Blocks.main, '', Elem.field, 'form').form();
const field: HTMLFieldSetElement = new Builder('a', Blocks.main, 'title', Elem.address, '').field();
const button: HTMLButtonElement = new Builder('p', Blocks.main, '', Elem.err, 'title').button();
const select: HTMLSelectElement = new Builder('', Blocks.main, 'select', '', 'title').select();
const option: HTMLOptionElement = new Builder('', Blocks.main, 'option', 'option', 'option').option();
const redirect: HTMLButtonElement = new Builder('', Blocks.main, 'option', '', 'redirect').redirect();
const a: HTMLAnchorElement = new Builder('', Blocks.main, 'link', '', 'a').a();
const img: HTMLImageElement = new Builder('', Blocks.main, '', '', 'img').img('src', 'alt');
const h: HTMLHeadingElement = new Builder('', Blocks.main, '', '', 'h').h(1);
const p: HTMLParagraphElement = new Builder('', Blocks.main, '', '', 'p').p();

test('Builder method should create HTMLElement', () => {
  expect(element).toBeInstanceOf(HTMLElement);
});

test('Builder method should create HTMLInputElement', () => {
  expect(input).toBeInstanceOf(HTMLInputElement);
});

test('Builder method should create HTMLLabelElement', () => {
  expect(label).toBeInstanceOf(HTMLLabelElement);
});

test('Builder method should create HTMLFormElement', () => {
  expect(form).toBeInstanceOf(HTMLFormElement);
});

test('Builder method should create HTMLFieldSetElement', () => {
  expect(field).toBeInstanceOf(HTMLFieldSetElement);
});

test('Builder method should create HTMLButtonElement', () => {
  expect(button).toBeInstanceOf(HTMLButtonElement);
});

test('Builder method should create HTMLSelectElement', () => {
  expect(select).toBeInstanceOf(HTMLSelectElement);
});

test('Builder method should create HTMLOptionElement', () => {
  expect(option).toBeInstanceOf(HTMLOptionElement);
});

test('Builder method should create HTMLButtonElement', () => {
  expect(redirect).toBeInstanceOf(HTMLButtonElement);
});

test('Builder method should create HTMLAnchorElement', () => {
  expect(a).toBeInstanceOf(HTMLAnchorElement);
});

test('Builder method should create HTMLImageElement', () => {
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img.hasAttribute('src')).toBeTruthy();
  expect(img.hasAttribute('alt')).toBeTruthy();
});

test('Builder method should create HTMLHeadingElement', () => {
  expect(h).toBeInstanceOf(HTMLHeadingElement);
});

test('Builder method should create HTMLParagraphElement', () => {
  expect(p).toBeInstanceOf(HTMLParagraphElement);
});
