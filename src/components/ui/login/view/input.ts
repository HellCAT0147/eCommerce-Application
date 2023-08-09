export default function createInput(pageName: string, inputName: string): HTMLInputElement {
  const input: HTMLInputElement = document.createElement('input');
  input.className = `form__input ${pageName}__input ${pageName}__input_${inputName}`;
  input.setAttribute('type', 'text');
  input.setAttribute('id', `${pageName}-${inputName}`);

  return input;
}
