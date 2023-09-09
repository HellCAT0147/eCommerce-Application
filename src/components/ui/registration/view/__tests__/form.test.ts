import { Pages } from '../../../../models/router';
import FormViewReg from '../form';

const form: FormViewReg = new FormViewReg(Pages.REGISTRATION);

test('createFieldCheck function should create HTMLFieldSetElement', () => {
  expect(form.createFieldCheck()).toBeInstanceOf(HTMLFieldSetElement);
});

test('createFieldForBilling function should create HTMLFieldSetElement', () => {
  expect(form.createFieldForBilling()).toBeInstanceOf(HTMLFieldSetElement);
});
