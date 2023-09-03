import { Address, Customer } from '@commercetools/platform-sdk';
import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { Pages } from '../../../models/router';
import { DataAddresses } from '../../../models/commerce';
import FormViewProfile from './form';
import { Countries } from '../../../models/validation';

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
      Titles.UPDATE,
      Mode.update
    );

    return address;
  }

  public showProfile(customer: Customer): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.PROFILE}`);
    if (main) {
      main.innerHTML = '';
      const modalAccount = new Builder('div', '', Blocks.prof, Elem.modal, Mode.account).element();
      const updateAccount: HTMLFieldSetElement = this.formView.createAccountInfoUpdateForm();
      const modalAddress = new Builder('div', '', Blocks.prof, Elem.modal, Mode.address).element();
      const updateAddress: HTMLFieldSetElement = this.updateAddresses();
      const form = this.formView.getForm();
      form.innerHTML = '';
      const title: HTMLHeadingElement = new Builder('', '', Blocks.prof, Elem.title, '').h(1);
      title.textContent = `${Titles.ACCOUNT_INFO}`;
      const accountInfo: HTMLFieldSetElement = this.formView.createAccountInfo(customer);
      const addressBook: HTMLHeadingElement = new Builder('', '', Blocks.prof, Elem.title, '').h(2);
      addressBook.textContent = `${Titles.ADDRESS_BOOK}`;
      const addresses = this.createAddresses(customer);
      modalAccount.appendChild(updateAccount);
      modalAddress.appendChild(updateAddress);
      form.append(title, accountInfo, addressBook, addresses);
      main.append(modalAccount, modalAddress, form);
    }
  }

  public toggleDisplayModal(mode: string, display: boolean): void {
    const body: HTMLElement | null = document.querySelector(`.${Blocks.body}`);
    const modal: HTMLElement | null = document.querySelector(`.${Blocks.prof}__${Elem.modal}_${mode}`);
    if (modal && body) {
      if (display) {
        body.classList.add(`${Mode.over}`);
        modal.classList.add(`${Mode.opened}`);
      } else {
        body.classList.remove(`${Mode.over}`);
        modal.classList.remove(`${Mode.opened}`);
      }
    }
  }

  public findCountry(codeCountry: string): Countries {
    switch (codeCountry) {
      case 'BY':
        return Countries.BY;
      case 'RU':
        return Countries.RU;
      case 'US':
        return Countries.US;
      default:
        return Countries.UZ;
    }
  }

  public fillAddressModal(target: HTMLElement): void {
    const content: HTMLElement | null = target.closest(`.${Blocks.prof}__${Elem.address}`);
    const country: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.country}`);
    const postal: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.postal}`);
    const city: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.city}`);
    const street: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.street}`);
    if (content) {
      const countryElement: HTMLElement | null = content.querySelector(`.${Blocks.prof}__${Elem.text}_${Mode.country}`);
      const postalElement: HTMLElement | null = content.querySelector(`.${Blocks.prof}__${Elem.text}_${Mode.postal}`);
      const cityElement: HTMLElement | null = content.querySelector(`.${Blocks.prof}__${Elem.text}_${Mode.city}`);
      const streetElement: HTMLElement | null = content.querySelector(`.${Blocks.prof}__${Elem.text}_${Mode.street}`);
      if (countryElement && postalElement && cityElement && streetElement) {
        const countryContent: string | null = countryElement.textContent;
        const postalContent: string | null = postalElement.textContent;
        const cityContent: string | null = cityElement.textContent;
        const streetContent: string | null = streetElement.textContent;
        if (country && postal && city && street) {
          if (countryContent && postalContent && cityContent && streetContent) {
            const countrySelect: Countries = this.findCountry(countryContent.slice(0, -1));
            country.value = countrySelect;
            postal.value = postalContent.slice(0, -1);
            city.value = cityContent.slice(0, -1);
            street.value = streetContent.slice(0, -1);
          } else {
            country.value = '';
            postal.value = '';
            city.value = '';
            street.value = '';
          }
        }
      }
    }
  }

  public fillAccountModal(target: HTMLElement): void {
    const content: HTMLElement | null = target.closest(`.${Blocks.prof}__${Elem.account}`);
    const firstName: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.f_name}`);
    const lastName: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.l_name}`);
    const date: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.date}`);
    const email: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.email}`);
    if (content) {
      const firstNameElement: HTMLElement | null = content.querySelector(
        `.${Blocks.prof}__${Elem.text}_${Mode.f_name}`
      );
      const lastNameElement: HTMLElement | null = content.querySelector(`.${Blocks.prof}__${Elem.text}_${Mode.l_name}`);
      const dateElement: HTMLElement | null = content.querySelector(`.${Blocks.prof}__${Elem.text}_${Mode.date}`);
      const emailElement: HTMLElement | null = content.querySelector(`.${Blocks.prof}__${Elem.text}_${Mode.email}`);
      if (firstNameElement && lastNameElement && dateElement && emailElement) {
        const firstContent: string | null = firstNameElement.textContent;
        const lastNameContent: string | null = lastNameElement.textContent;
        const dateContent: string | null = dateElement.textContent;
        const emailContent: string | null = emailElement.textContent;
        if (firstName && lastName && date && email) {
          if (firstContent && lastNameContent && dateContent && emailContent) {
            firstName.value = firstContent;
            lastName.value = lastNameContent;
            date.value = dateContent;
            email.value = emailContent;
          } else {
            firstName.value = '';
            lastName.value = '';
            date.value = '';
            email.value = '';
          }
        }
      }
    }
  }

  public showMessage(isSuccess?: boolean): void {
    const body: HTMLElement | null = document.querySelector(`${Blocks.body}`);
    const oldMessageHolder: HTMLElement | null = document.querySelector(`.${Blocks.prof}__${Elem.mess}`);
    if (oldMessageHolder) {
      oldMessageHolder.classList.remove(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
    } else {
      const messageHolder: HTMLElement = new Builder('div', '', Blocks.prof, Elem.mess, '').element();
      const messageIcon: HTMLElement = new Builder('div', '', Elem.mess, Elem.image, '').element();
      const messageText: HTMLElement = new Builder('div', '', Elem.mess, Elem.text, '').element();
      if (isSuccess) messageText.textContent = `${Titles.SUCCESS_UPDATE}`;
      else messageText.textContent = `${Titles.FAILED_UPDATE}`;

      messageHolder.append(messageIcon, messageText);
      if (body) body.appendChild(messageHolder);
      if (messageHolder) {
        setTimeout(() => {
          messageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
        }, 1500);
      }
    }

    setTimeout(() => {
      if (oldMessageHolder) {
        oldMessageHolder.classList.add(`${Blocks.prof}__${Elem.mess}_${Mode.hidden}`);
      }
    }, 1500);
  }
}
