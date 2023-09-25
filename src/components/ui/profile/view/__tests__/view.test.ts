import { Customer } from '@commercetools/platform-sdk';
import { Pages } from '../../../../models/router';
import ViewProfile from '../view';
import { DataAddresses } from '../../../../models/commerce';
import { Base, Blocks, Elem } from '../../../../models/builder';
import Builder from '../../../builder/html-builder';

const view: ViewProfile = new ViewProfile(Pages.PROFILE);

const customer: Customer = {
  id: 'newCustomer',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  email: 'mail@exapmle.com',
  firstName: 'FirstName',
  lastName: 'LastName',
  dateOfBirth: '01-01-2000',
  addresses: [
    { id: 'X6Csvc2X', streetName: 'asasd', postalCode: '44343', city: 'New', country: 'US' },
    { id: 'Sonj9JHO', streetName: 'Lenina', postalCode: '123123', city: 'Shipping', country: 'BY' },
    { id: 'BafFfyQ6', streetName: 'Lenina', postalCode: '213213', city: 'Shipping', country: 'RU' },
  ],
  defaultBillingAddressId: 'Sonj9JHO',
  defaultShippingAddressId: 'BafFfyQ6',
  billingAddressIds: ['BafFfyQ6', 'Sonj9JHO'],
  shippingAddressIds: ['BafFfyQ6', 'X6Csvc2X'],
  isEmailVerified: false,
  authenticationMode: '',
};

const dataAddress: DataAddresses = {
  all_bill: ['BafFfyQ6', 'Sonj9JHO'],
  all_ship: ['BafFfyQ6', 'X6Csvc2X'],
  billing: 'Sonj9JHO',
  shipping: 'BafFfyQ6',
};

enum Countries {
  BY = 'Belarus',
  RU = 'Russia',
  US = 'USA',
  UZ = 'Uzbekistan',
}

const addresses: HTMLElement = new Builder('div', Base.form, Blocks.prof, Elem.addresses, '').element();

test('createAddresses function should create HTMLElement', () => {
  expect(view.createAddresses(customer)).toBeInstanceOf(HTMLElement);
});

test('parseAddress function should create HTMLElement', () => {
  expect(view.parseAddress(customer.addresses[0], dataAddress, addresses)).toBeInstanceOf(HTMLElement);
});

test('dataAddress function should return dataAddress', () => {
  expect(view.getDataAddresses(customer)).toStrictEqual(dataAddress);
});

test('dataAddress function should return dataAddress', () => {
  expect(view.getDataAddresses(customer).billing).toStrictEqual(dataAddress.billing);
  expect(view.getDataAddresses(customer).shipping).toStrictEqual(dataAddress.shipping);
  expect(view.getDataAddresses(customer).all_bill).toStrictEqual(dataAddress.all_bill);
  expect(view.getDataAddresses(customer).all_ship).toStrictEqual(dataAddress.all_ship);
});

test('findCountry function should return country', () => {
  expect(view.findCountry('BY')).toBe(Countries.BY);
  expect(view.findCountry('RU')).toBe(Countries.RU);
  expect(view.findCountry('US')).toBe(Countries.US);
  expect(view.findCountry('UZ')).toBe(Countries.UZ);
});

test('updateAddresses function should return HTMLFieldSetElement', () => {
  expect(view.updateAddresses()).toBeInstanceOf(HTMLFieldSetElement);
});
