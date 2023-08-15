import { Base, Elem } from '../../../models/builder';
import Builder from '../../builder/html-builder';

export default function createLabel(pageName: string, labelName: string): HTMLLabelElement {
  const label: HTMLLabelElement = new Builder('', Base.labels, pageName, Elem.label, labelName).label();
  label.setAttribute('for', `${pageName}-${labelName}`);
  const asterisk: HTMLElement = new Builder('span', '', 'required', '', '').element();
  asterisk.textContent = ' *';
  label.textContent = `${labelName[0].toUpperCase()}${labelName.slice(1)}`;
  label.appendChild(asterisk);

  return label;
}
