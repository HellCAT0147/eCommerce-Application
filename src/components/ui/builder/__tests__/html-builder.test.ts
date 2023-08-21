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
