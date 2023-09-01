import { Address, Customer } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { Pages } from '../../../models/router';
import { DataAddresses } from '../../../models/commerce';
import FormViewProfile from './form';

export default class ViewProfile {
  protected formView: FormViewProfile;

  public constructor(pageName: string = Pages.PROFILE) {
    this.formView = new FormViewProfile(pageName);
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

  private updateAddresses(): HTMLFieldSetElement {
    const address: HTMLFieldSetElement = this.formView.createAddressUpdateForm(
      Mode.street,
      Mode.city,
      Mode.postal,
      Mode.country,
      Titles.SHIPPING,
      Mode.ship
    );

    return address;
  }

  private updateAccountInfo(customer: Customer): HTMLFieldSetElement {
    const accountInfo: HTMLFieldSetElement = this.formView.createAccountInfoUpdateForm(customer);

    return accountInfo;
  }

  public showProfile(customer: Customer): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.PROFILE}`);
    if (main) {
      main.innerHTML = '';

      const form = this.formView.getForm();
      const title: HTMLHeadingElement = new Builder('', Base.form_title, Blocks.form, Elem.title, Mode.ship).h(2);
      title.textContent = `${Titles.ACCOUNT_INFO}`.toUpperCase();
      const accountInfo: HTMLFieldSetElement = this.formView.createAccountInfo(customer);
      form.append(accountInfo);
      main.append(title, form);
    }
  }
}
