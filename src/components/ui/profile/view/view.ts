import { Address, Customer } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { Pages } from '../../../models/router';
import { DataAddresses } from '../../../models/commerce';
import FormViewProfile from './form';

export default class ViewProfile {
  protected form: FormViewProfile;

  public constructor(pageName: string = Pages.PROFILE) {
    this.form = new FormViewProfile(pageName);
  }

  public showError(msg: string): string {
    // TODO implement popup with error
    return msg;
  }

  private getDataAddresses(customer: Customer): DataAddresses {
    const dataAddresses: DataAddresses = {
      billing: '',
      shipping: '',
      all_bill: [],
      all_ship: [],
    };
    dataAddresses.billing = customer.defaultBillingAddressId;
    dataAddresses.shipping = customer.defaultShippingAddressId;
    dataAddresses.all_bill = customer.billingAddressIds;
    dataAddresses.all_ship = customer.shippingAddressIds;

    return dataAddresses;
  }

  private parseAddress(address: Address, dataAddresses: DataAddresses): HTMLElement {
    const addresses: HTMLElement = new Builder('div', Base.form_section, Blocks.prof, Elem.address, '').element();
    const mapAddress = new Map(Object.entries(address));
    mapAddress.forEach((value, key) => {
      const field: HTMLElement = new Builder('div', Base.field, Blocks.prof, Elem.field, '').element();
      if (key === 'id') {
        const title: HTMLElement = new Builder('span', Base.form_title, Blocks.prof, Elem.title, '').element();
        if (dataAddresses.all_bill && dataAddresses.all_bill.includes(value)) {
          title.textContent = 'This is billing address';
        } else if (dataAddresses.all_ship && dataAddresses.all_ship.includes(value)) {
          title.textContent = 'This is shipping address';
        }
        field.appendChild(title);
      } else {
        const label: HTMLElement = new Builder('span', Base.form_title, Blocks.prof, Elem.title, key).element();
        label.textContent = key;
        const info: HTMLElement = new Builder('span', Base.form_title, Blocks.prof, Elem.text, key).element();
        info.textContent = value;
        field.append(label, info);
      }
      addresses.appendChild(field);
    });

    return addresses;
  }

  private createAddresses(customer: Customer): HTMLElement {
    const addresses: HTMLElement = new Builder('div', Base.form, Blocks.prof, Elem.address, '').element();
    const listAddresses: Address[] = customer.addresses;
    const dataAddress: DataAddresses = this.getDataAddresses(customer);

    listAddresses.forEach((address: Address) => {
      const addressForm: HTMLElement = this.parseAddress(address, dataAddress);
      addresses.append(addressForm);
    });

    return addresses;
  }

  public showProfile(customer: Customer): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.PROFILE}`);
    if (main) {
      main.innerHTML = '';
      const title: HTMLElement = new Builder('h1', Base.titles, Blocks.prof, Elem.title, '').element();
      title.textContent = `${Titles.PROFILE}`;
      const account: HTMLElement = new Builder('article', '', Blocks.prof, Elem.article, '').element();
      const person: HTMLElement = new Builder('div', '', Blocks.prof, Elem.person, '').element();
      const firstName: HTMLHeadingElement = new Builder('', Base.titles, Blocks.prof, Elem.text, Mode.f_name).h(2);
      const lastName: HTMLHeadingElement = new Builder('', Base.titles, Blocks.prof, Elem.text, Mode.l_name).h(2);
      const date: HTMLHeadingElement = new Builder('', Base.titles, Blocks.prof, Elem.text, Mode.date).h(3);
      firstName.textContent = customer.firstName || '';
      lastName.textContent = customer.lastName || '';
      date.textContent = customer.dateOfBirth || '';
      const fieldAddress: HTMLFieldSetElement = this.form.generateAddress();

      const addresses: HTMLElement = this.createAddresses(customer);

      person.append(firstName, lastName, date);

      account.append(person);

      main.append(title, account, fieldAddress, addresses);
    }
  }
}
