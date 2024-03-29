export type InputTypeLogin = 'email' | 'password' | 'password-new';

export type AddressFields = 'street' | 'city' | 'postal-code' | 'country';

export type BillAddressFields = 'street-bill' | 'city-bill' | 'postal-code-bill' | 'country-bill' | 'check-bill';

export type PersonFields = 'first-name' | 'last-name' | 'date-of-birth';

export type Check = 'both-address' | 'shipping' | 'billing' | 'billing-default' | 'shipping-default';

export type InputType = InputTypeLogin | PersonFields | AddressFields | BillAddressFields | Check;

export enum Countries {
  BY = 'Belarus',
  RU = 'Russia',
  US = 'USA',
  UZ = 'Uzbekistan',
}

export enum MailErrors {
  at = "Email must contain an '@'.",
  domain = 'Email must contain a domain name (e.g., example.com).',
  space = 'Email must not contain leading or trailing whitespace.',
  format = 'Email must be properly formatted (e.g., user@example.com).',
}

export enum PasswordErrors {
  lower = 'Password must contain at least one lowercase letter (a-z).',
  upper = 'Password must contain at least one uppercase letter (A-Z).',
  digit = 'Password must contain at least one digit (0-9).',
  char = 'Password must contain at least one special character (e.g., !@#$%^&*).',
  short = 'Password must be at least 8 characters long.',
  space = 'Password must not contain whitespace.',
}

export enum NameErrors {
  short = 'name must contain at least one character',
  noDigit = 'name must not contain digits',
  noChar = 'name must not contain special characters',
}

export enum DateErrors {
  correct = 'Your birthday must be real',
  noChild = 'You must be over 13 years old',
  invalid = 'Invalid date',
}

export enum PostalErrors {
  BY = 'Belarus: six-digit postal code',
  RU = 'Russia: six-digit postal code',
  UZ = 'Uzbekistan: six-digit postal code',
  US = 'USA: five-digit postal code or with DDDDD-DDDD template where D = digit',
  notSelected = 'Select the country',
}

export interface IsChecked {
  isSetBill: boolean;
  isSetShip: boolean;
  isSetBillDef: boolean;
  isSetShipDef: boolean;
}

export type LoginErrors = MailErrors | PasswordErrors;

export type Errors = LoginErrors | NameErrors | DateErrors | PostalErrors;
