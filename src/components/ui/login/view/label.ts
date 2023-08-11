export default function createLabel(pageName: string, labelName: string): HTMLLabelElement {
  const label: HTMLLabelElement = document.createElement('label');
  label.className = `form__label ${pageName}__label ${pageName}__label_${labelName}`;
  label.setAttribute('for', `${pageName}-${labelName}`);
  const asterisk: HTMLSpanElement = document.createElement('span');
  asterisk.textContent = ' *';
  asterisk.className = 'required';
  label.textContent = `${labelName[0].toUpperCase()}${labelName.slice(1)}`;
  label.appendChild(asterisk);

  return label;
}
