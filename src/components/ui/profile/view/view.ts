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

  private parseAddress(address: Address, dataAddresses: DataAddresses, field: HTMLElement): HTMLElement {
    let type: string = '';
    let defAddress: string = '';
    if (dataAddresses.all_bill && dataAddresses.all_bill.includes(address.id)) {
      type = Mode.bill;
      if (address.id === dataAddresses.billing) {
        defAddress = Mode.default;
      }
      const addresses: HTMLElement = this.formView.createAddressField(type, defAddress, address);
      field.append(addresses);
    } else if (dataAddresses.all_ship && dataAddresses.all_ship.includes(address.id)) {
      type = Mode.ship;
      if (address.id === dataAddresses.shipping) {
        defAddress = Mode.default;
      }
      const addresses: HTMLElement = this.formView.createAddressField(type, defAddress, address);
      field.append(addresses);
    }

    return field;
  }

  private createAddresses(customer: Customer): HTMLElement {
    const addresses: HTMLElement = new Builder('div', Base.form, Blocks.prof, Elem.addresses, '').element();
    const listAddresses: Address[] = customer.addresses;
    const dataAddress: DataAddresses = this.getDataAddresses(customer);

    listAddresses.forEach((address: Address) => {
      this.parseAddress(address, dataAddress, addresses);
    });

    if (!dataAddress.billing) {
      const emptyDefBilling: HTMLFieldSetElement = this.formView.createAddressField(Mode.bill, Mode.default);
      addresses.appendChild(emptyDefBilling);
    }
    if (!dataAddress.shipping) {
      const emptyDefShipping: HTMLFieldSetElement = this.formView.createAddressField(Mode.ship, Mode.default);
      addresses.appendChild(emptyDefShipping);
    }

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
      form.innerHTML = '';
      const title: HTMLHeadingElement = new Builder('', '', Blocks.prof, Elem.title, '').h(1);
      title.textContent = `${Titles.ACCOUNT_INFO}`;
      const accountInfo: HTMLFieldSetElement = this.formView.createAccountInfo(customer);
      const addressBook: HTMLHeadingElement = new Builder('', '', Blocks.prof, Elem.title, '').h(2);
      addressBook.textContent = `${Titles.ADDRESS_BOOK}`;
      const addresses = this.createAddresses(customer);
      form.append(title, accountInfo, addressBook, addresses);
      main.append(form);
    }
  }
}
