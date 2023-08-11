export default function createLabel(pageName: string, labelName: string): HTMLLabelElement {
  const label: HTMLLabelElement = document.createElement('label');
  label.className = `form__label ${pageName}__label ${pageName}__label_${labelName}`;
  label.setAttribute('for', `${pageName}-${labelName}`);
  label.textContent = `${labelName[0].toUpperCase()}${labelName.slice(1)}  *`;

  return label;
}
