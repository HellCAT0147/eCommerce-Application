import { Pages } from '../../models/router';

class Builder {
  constructor(
    private tag: string,
    private base: string,
    private block: string,
    private elem: string,
    private mode: string
  ) {
    this.tag = tag;
    this.base = base;
    this.block = block;
    this.elem = elem;
    this.mode = mode;
  }

  private setProperties(element: HTMLElement | HTMLInputElement): void {
    if (this.block && this.elem) {
      element.classList.add(`${this.block}__${this.elem}`);
    } else if (this.block) {
      element.classList.add(`${this.block}`);
    }
    if (this.mode) element.classList.add(`${this.block}__${this.elem}_${this.mode}`);
  }

  public form(): HTMLFormElement {
    const form: HTMLFormElement = document.createElement('form');
    form.className = `${this.base}`;
    this.setProperties(form);
    return form;
  }

  public field(): HTMLFieldSetElement {
    const field: HTMLFieldSetElement = document.createElement('fieldset');
    field.className = `${this.base}`;
    this.setProperties(field);
    return field;
  }

  public input(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input');
    input.className = `${this.base}`;
    this.setProperties(input);
    return input;
  }

  public label(): HTMLLabelElement {
    const label: HTMLLabelElement = document.createElement('label');
    label.className = `${this.base}`;
    this.setProperties(label);
    return label;
  }

  public button(): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.className = `${this.base}`;
    this.setProperties(button);
    return button;
  }

  public element(): HTMLElement {
    const element: HTMLElement = document.createElement(this.tag);
    element.className = `${this.base}`;
    this.setProperties(element);
    return element;
  }

  public select(): HTMLSelectElement {
    const select: HTMLSelectElement = document.createElement('select');
    select.className = `${this.base}`;
    this.setProperties(select);
    return select;
  }

  public option(): HTMLOptionElement {
    const option: HTMLOptionElement = document.createElement('option');
    option.className = `${this.base}`;
    this.setProperties(option);
    return option;
  }

  public a(): HTMLAnchorElement {
    const link: HTMLAnchorElement = document.createElement('a');
    link.className = `${this.base}`;
    this.setProperties(link);
    link.textContent = `Go to ${this.mode} page`;
    link.href = `/${this.mode}`;
    link.setAttribute('id', `${Pages.GO_TO}-${this.mode}`);
    link.classList.add('redirect__buttons');
    return link;
  }
}

export default Builder;
