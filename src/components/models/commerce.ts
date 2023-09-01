export enum DataBase {
  key_prefix = 'product',
  img_alt = 'preview of clothes',
}

export type AddressType = string | undefined;

export type AddressesType = AddressType[] | undefined;

export interface DataAddresses {
  billing: AddressType;
  shipping: AddressType;
  all_bill: AddressesType;
  all_ship: AddressesType;
}
