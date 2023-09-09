import { Customer } from '@commercetools/platform-sdk';
import { Pages } from '../../../../models/router';
import FormViewProfile from '../form';
import { Mode, Titles } from '../../../../models/builder';

const form: FormViewProfile = new FormViewProfile(Pages.PROFILE);

const customer: Customer = {
  id: 'newCustomer',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  email: 'mail@exapmle.com',
  firstName: 'FirstName',
  lastName: 'LastName',
  dateOfBirth: '01-01-2000',
  addresses: [],
  isEmailVerified: false,
  authenticationMode: '',
};

test('generateAddress function should create HTMLFieldSetElement', () => {
  expect(form.generateAddress()).toBeInstanceOf(HTMLFieldSetElement);
});

test('createPasswordUpdateForm function should create HTMLFieldSetElement', () => {
  expect(form.createPasswordUpdateForm()).toBeInstanceOf(HTMLFieldSetElement);
});

test('createAccountInfoUpdateForm function should create HTMLFieldSetElement', () => {
  expect(form.createAccountInfoUpdateForm()).toBeInstanceOf(HTMLFieldSetElement);
});

test('createAccountInfo function should create HTMLFieldSetElement', () => {
  expect(form.createAccountInfo(customer)).toBeInstanceOf(HTMLFieldSetElement);
});

test('createAddressUpdateForm function should create HTMLFieldSetElement', () => {
  expect(
    form.createAddressUpdateForm(Mode.street, Mode.city, Mode.postal, Mode.country, Titles.UPDATE, Mode.update)
  ).toBeInstanceOf(HTMLFieldSetElement);
});
