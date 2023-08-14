import { InputType } from '../../../models/login';

export default function createInput(pageName: string, inputName: InputType): HTMLInputElement {
  const input: HTMLInputElement = document.createElement('input');
  input.className = `form__input ${pageName}__input ${pageName}__input_${inputName}`;

  if (inputName === 'email') input.setAttribute('type', 'text');
  else input.setAttribute('type', 'password');

  input.setAttribute('id', `${pageName}-${inputName}`);

  return input;
}
