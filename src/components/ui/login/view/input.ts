import { Base, Elem, Mode } from '../../../models/builder';
import { InputType } from '../../../models/login';
import Builder from '../../builder/html-builder';

export default function createInput(pageName: string, inputName: InputType): HTMLInputElement {
  const input: HTMLInputElement = new Builder('', Base.inputs, pageName, Elem.input, inputName).input();

  if (inputName === Mode.email) input.setAttribute('type', 'text');
  else input.setAttribute('type', 'password');

  input.setAttribute('id', `${pageName}-${inputName}`);

  return input;
}
