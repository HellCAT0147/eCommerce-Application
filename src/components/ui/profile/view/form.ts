import { Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import FormViewReg from '../../registration/view/form';

export default class FormViewProfile extends FormViewReg {
  public constructor(pageName: string = Pages.PROFILE) {
    super(pageName);
  }

  public generateAddress(): HTMLFieldSetElement {
    const addresses: HTMLFieldSetElement = this.createAddress(
      Mode.street,
      Mode.city,
      Mode.postal,
      Mode.country,
      Titles.BOTH_ADDRESS,
      Mode.ship
    );

    return addresses;
  }
}
