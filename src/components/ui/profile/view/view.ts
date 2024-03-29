import { Address, Customer } from '@commercetools/platform-sdk';
import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';
import { Pages } from '../../../models/router';
import { DataAddresses } from '../../../models/commerce';
import FormViewProfile from './form';
import { Countries, Errors, InputType, IsChecked } from '../../../models/validation';

export default class ViewProfile {
  protected formView: FormViewProfile;

  private pageName: string;

  private isModal: boolean;

  public constructor(pageName: string = Pages.PROFILE) {
    this.formView = new FormViewProfile(pageName);
    this.pageName = pageName;
    this.isModal = false;
  }

  public reminder(customMsg: string | null = null, block: Blocks = Blocks.prof): void {
    const reminder: HTMLElement = new Builder('p', '', block, Elem.err, '').element();
    const errorsHolder: HTMLElement = new Builder('div', '', block, Elem.errs, Mode.response).element();
    const form: HTMLFormElement | null = document.querySelector('.opened .form');

    setTimeout(() => {
      errorsHolder.outerHTML = '';
    }, 5000);

    if (customMsg === null) {
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.${Base.inputs}`);
      const select: HTMLSelectElement | null = document.querySelector(`.${Base.select}`);

      inputs.forEach((el) => {
        if (el instanceof HTMLInputElement && !el.value.length) this.highlightInput(el, false);
      });
      if (select instanceof HTMLSelectElement && select.value === '') this.highlightInput(select, false);

      reminder.textContent = 'Please fill in the required fields correctly';
    } else reminder.textContent = customMsg;

    if (!form) return;
    errorsHolder.appendChild(reminder);
    form.appendChild(errorsHolder);
  }

  protected highlightInput(input: HTMLElement | null, isValid: boolean): void {
    if (input) {
      if (isValid) {
        input.classList.add(Mode.valid);
        input.classList.remove(Mode.invalid);
      } else {
        input.classList.remove(Mode.valid);
        input.classList.add(Mode.invalid);
      }
    }
  }

  public showError(msg: string): string {
    return msg;
  }

  public showErrors(place: HTMLElement | null, errors: Errors[] | string[], inputType: InputType): void {
    if (place) {
      const prevErrorsHolder: HTMLDivElement | null = document.querySelector(`.${this.pageName}__errors_${inputType}`);

      if (prevErrorsHolder) prevErrorsHolder.outerHTML = '';
      const errorsHolder: HTMLElement = new Builder('div', '', this.pageName, Elem.errs, inputType).element();

      errors.forEach((error) => {
        const p: HTMLElement = new Builder('p', '', this.pageName, Elem.err, '').element();
        p.textContent = error;
        errorsHolder.append(p);
      });
      let input: HTMLInputElement | null = document.querySelector(`.${this.pageName}__input_${inputType}`);
      if (inputType === 'country' || inputType === 'country-bill')
        input = document.querySelector(`.${this.pageName}__select_${inputType}`);

      if (errors.length) {
        place.after(errorsHolder);
        this.highlightInput(input, false);
      } else {
        this.highlightInput(input, true);
      }
    }
  }

  public getDataAddresses(customer: Customer): DataAddresses {
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

  public parseAddress(address: Address, dataAddresses: DataAddresses, field: HTMLElement): HTMLElement {
    let type: string = '';
    let defAddress: string = '';
    if (dataAddresses.all_bill && dataAddresses.all_bill.includes(address.id)) {
      type = Mode.bill;
      if (address.id === dataAddresses.billing) {
        defAddress = Mode.default;
      } else {
        defAddress = '';
      }
      const addresses: HTMLElement = this.formView.createAddressField(type, defAddress, address);
      field.append(addresses);
    }
    if (dataAddresses.all_ship && dataAddresses.all_ship.includes(address.id)) {
      type = Mode.ship;
      if (address.id === dataAddresses.shipping) {
        defAddress = Mode.default;
      } else {
        defAddress = '';
      }
      const addresses: HTMLElement = this.formView.createAddressField(type, defAddress, address);
      field.append(addresses);
    }
    if (dataAddresses.all_ship && dataAddresses.all_bill) {
      if (!dataAddresses.all_ship.includes(address.id) && !dataAddresses.all_bill.includes(address.id)) {
        type = '';
        defAddress = '';
        const addresses: HTMLElement = this.formView.createAddressField(type, defAddress, address);
        field.append(addresses);
      }
    }

    return field;
  }

  public createAddresses(customer: Customer): HTMLElement {
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

  public updateAddresses(): HTMLFieldSetElement {
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

  public switchPasswordView(icon: HTMLButtonElement, id?: string): void {
    const input: HTMLInputElement | null = document.querySelector(`#${id}`);
    icon.classList.toggle(`form__button_${Mode.eye_opened}`);
    icon.classList.toggle(`form__button_${Mode.eye_closed}`);

    if (!input) return;
    if (icon.classList.contains(`form__button_${Mode.eye_opened}`)) input.type = 'text';
    else input.type = 'password';
    input.focus();
  }

  public resetPostal(selectField: HTMLElement | null): void {
    if (!selectField) return;
    const fieldset: Element | null = selectField.nextElementSibling;
    if (!fieldset) return;
    const postal: HTMLElement | null = fieldset.querySelector('.form__input');
    if (!postal) return;
    if (postal instanceof HTMLInputElement) postal.value = '';
  }

  public createModals(main: HTMLElement): void {
    const modalAccount = new Builder('div', '', Blocks.prof, Elem.modal, Mode.account).element();
    const updateAccount: HTMLFieldSetElement = this.formView.createAccountInfoUpdateForm();
    const modalAddress = new Builder('div', '', Blocks.prof, Elem.modal, Mode.address).element();
    const updateAddress: HTMLFieldSetElement = this.updateAddresses();
    const modalPassword = new Builder('div', '', Blocks.prof, Elem.modal, Mode.pass).element();
    const updatePassword: HTMLFieldSetElement = this.formView.createPasswordUpdateForm();
    modalAccount.appendChild(updateAccount);
    modalAddress.appendChild(updateAddress);
    modalPassword.appendChild(updatePassword);
    main.append(modalAccount, modalPassword, modalAddress);
  }

  public showProfile(customer: Customer, mode?: string): void {
    const main: HTMLFormElement | null = document.querySelector(`.${Blocks.main}__${Pages.PROFILE}`);
    if (main) {
      if (mode !== Mode.update) this.createModals(main);
      const form = this.formView.getForm();
      form.innerHTML = '';
      form.classList.remove(`${Mode.hidden}`);
      const title: HTMLHeadingElement = new Builder('', '', Blocks.prof, Elem.title, '').h(1);
      title.textContent = `${Titles.ACCOUNT_INFO}`;
      const accountInfo: HTMLFieldSetElement = this.formView.createAccountInfo(customer);
      const addressBook: HTMLHeadingElement = new Builder('', '', Blocks.prof, Elem.title, '').h(2);
      addressBook.textContent = `${Titles.ADDRESS_BOOK}`;
      const addresses = this.createAddresses(customer);
      const buttonAdd: HTMLButtonElement = new Builder('', Base.btns_edit, this.pageName, Elem.btn, Mode.add).button();
      buttonAdd.textContent = Buttons.ADD_ADDRESS;

      form.append(title, accountInfo, addressBook, addresses, buttonAdd);
      main.append(form);
    }
  }

  public toggleDisplayModal(mode: string, display: boolean): void {
    const form: HTMLElement | null = document.querySelector(`.${Blocks.prof}__${Elem.form}`);
    const modal: HTMLElement | null = document.querySelector(`.${Blocks.prof}__${Elem.modal}_${mode}`);
    if (modal && form) {
      if (display) {
        form.classList.add(`${Mode.hidden}`);
        modal.classList.add(`${Mode.opened}`);
      } else {
        form.classList.remove(`${Mode.hidden}`);
        modal.classList.remove(`${Mode.opened}`);
      }
    }
  }

  public checkedBoxes(isChecked?: IsChecked): void {
    const bill: HTMLInputElement | null = document.querySelector(`.${Blocks.prof}__${Elem.input}_${Mode.bill}`);
    const ship: HTMLInputElement | null = document.querySelector(`.${Blocks.prof}__${Elem.input}_${Mode.ship}`);
    const defBill: HTMLInputElement | null = document.querySelector(`.${Blocks.prof}__${Elem.input}_${Mode.bill_def}`);
    const defShip: HTMLInputElement | null = document.querySelector(`.${Blocks.prof}__${Elem.input}_${Mode.ship_def}`);
    if (bill && ship && defBill && defShip) {
      bill.disabled = false;
      ship.disabled = false;
      if (isChecked) {
        bill.checked = isChecked.isSetBill;
        ship.checked = isChecked.isSetShip;
        defBill.checked = isChecked.isSetBillDef;
        defShip.checked = isChecked.isSetShipDef;
        if (isChecked.isSetBillDef) bill.disabled = true;
        if (isChecked.isSetShipDef) ship.disabled = true;
      } else {
        bill.disabled = true;
        bill.checked = true;
        ship.disabled = true;
        ship.checked = true;
        defBill.checked = true;
        defShip.checked = true;
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

  public showHiddenElements(mode: string): void {
    const modal: HTMLElement | null = document.querySelector(`.${Blocks.prof}__${Elem.modal}_${Mode.address}`);
    if (modal) {
      const buttonSave: HTMLButtonElement | null = modal.querySelector(`.${Blocks.prof}__${Elem.btn}_${Mode.save}`);
      const titleSave: HTMLButtonElement | null = modal.querySelector(`.${Blocks.form}__${Elem.title}_${Mode.save}`);
      const buttonAdd: HTMLButtonElement | null = modal.querySelector(`.${Blocks.prof}__${Elem.btn}_${Mode.add}`);
      const titleAdd: HTMLButtonElement | null = modal.querySelector(`.${Blocks.form}__${Elem.title}_${Mode.add}`);
      if (buttonSave && titleSave && buttonAdd && titleAdd) {
        if (mode === Mode.save) {
          buttonAdd.classList.add(`${Elem.modal}_${Mode.hidden}`);
          titleAdd.classList.add(`${Elem.modal}_${Mode.hidden}`);
          buttonSave.classList.remove(`${Elem.modal}_${Mode.hidden}`);
          titleSave.classList.remove(`${Elem.modal}_${Mode.hidden}`);
        } else if (mode === Mode.add) {
          buttonSave.classList.add(`${Elem.modal}_${Mode.hidden}`);
          titleSave.classList.add(`${Elem.modal}_${Mode.hidden}`);
          buttonAdd.classList.remove(`${Elem.modal}_${Mode.hidden}`);
          titleAdd.classList.remove(`${Elem.modal}_${Mode.hidden}`);
        }
      }
    }
  }

  public clearAddressModal(): void {
    const country: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.country}`);
    const postal: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.postal}`);
    const city: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.city}`);
    const street: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.street}`);

    if (country && postal && city && street) {
      country.value = '';
      postal.value = '';
      city.value = '';
      street.value = '';
    }
  }

  public fillAddressModal(target: HTMLElement, address: Address): void {
    const country: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.country}`);
    const postal: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.postal}`);
    const city: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.city}`);
    const street: HTMLInputElement | null = document.querySelector(`#${Blocks.prof}-${Mode.street}`);
    if (country && postal && city && street) {
      if (address.postalCode && address.city && address.streetName) {
        const countrySelect: Countries = this.findCountry(address.country);
        country.value = countrySelect;
        postal.value = address.postalCode;
        city.value = address.city;
        street.value = address.streetName;
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

  public showMessage(isSuccess?: boolean, message?: string): void {
    const body: HTMLElement | null = document.querySelector(`${Blocks.body}`);
    const oldMessageHolder: HTMLElement | null = document.querySelector(`.${Blocks.main}__${Elem.mess}`);
    if (oldMessageHolder) {
      oldMessageHolder.classList.remove(`${Blocks.main}__${Elem.mess}_${Mode.hidden}`);
      const messageText: HTMLElement | null = oldMessageHolder.querySelector(`.${Elem.mess}__${Elem.text}`);
      if (messageText) {
        if (isSuccess) messageText.textContent = `${Titles.SUCCESS_UPDATE}`;
        else if (message) messageText.textContent = `${message}`;
        else messageText.textContent = `${Titles.FAILED_UPDATE}`;
      }
      if (!isSuccess) oldMessageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
    } else {
      const messageHolder: HTMLElement = new Builder('div', '', Blocks.main, Elem.mess, '').element();
      const messageIcon: HTMLElement = new Builder('div', '', Elem.mess, Elem.image, '').element();
      const messageText: HTMLElement = new Builder('div', '', Elem.mess, Elem.text, '').element();
      if (isSuccess) {
        messageText.textContent = `${Titles.SUCCESS_UPDATE}`;
      } else if (message) {
        messageText.textContent = `${message}`;
        messageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
      } else {
        messageText.textContent = `${Titles.FAILED_UPDATE}`;
        messageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
      }

      messageHolder.append(messageIcon, messageText);
      if (body) body.appendChild(messageHolder);
      if (messageHolder) {
        setTimeout(() => {
          messageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.hidden}`);
          messageHolder.classList.remove(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
        }, 1500);
      }
    }

    setTimeout(() => {
      if (oldMessageHolder) {
        oldMessageHolder.classList.add(`${Blocks.main}__${Elem.mess}_${Mode.hidden}`);
        oldMessageHolder.classList.remove(`${Blocks.main}__${Elem.mess}_${Mode.fail}`);
      }
    }, 1500);
  }

  public resetInputView(inputType: InputType): void {
    let initInput: HTMLElement | null;
    if (inputType === Mode.country) initInput = document.querySelector(`.${Blocks.prof}__${Elem.select}_${inputType}`);
    else initInput = document.querySelector(`.${Blocks.prof}__${Elem.input}_${inputType}`);
    initInput?.classList.remove(Mode.valid);
    initInput?.classList.remove(Mode.invalid);
  }

  public setCheckBoxAndLock(isBill: boolean): void {
    let checkBox: HTMLInputElement | null;
    if (isBill) checkBox = document.querySelector('#profile-billing');
    else checkBox = document.querySelector('#profile-shipping');
    if (checkBox) {
      checkBox.checked = true;
      checkBox.disabled = true;
    }
  }

  public unlockCheckBox(isBill: boolean): void {
    let checkBox: HTMLInputElement | null;
    if (isBill) checkBox = document.querySelector('#profile-billing');
    else checkBox = document.querySelector('#profile-shipping');
    if (checkBox) checkBox.disabled = false;
  }
}
