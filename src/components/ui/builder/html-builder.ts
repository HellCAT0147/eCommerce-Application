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

  private setPropertes(element: HTMLElement | HTMLInputElement): void {
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
    this.setPropertes(form);
    return form;
  }

  public field(): HTMLFieldSetElement {
    const field: HTMLFieldSetElement = document.createElement('fieldset');
    field.className = `${this.base}`;
    this.setPropertes(field);
    return field;
  }

  public input(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input');
    input.className = `${this.base}`;
    this.setPropertes(input);
    return input;
  }

  public label(): HTMLLabelElement {
    const label: HTMLLabelElement = document.createElement('label');
    label.className = `${this.base}`;
    this.setPropertes(label);
    return label;
  }

  public button(): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.className = `${this.base}`;
    this.setPropertes(button);
    return button;
  }

  public element(): HTMLElement {
    const element: HTMLElement = document.createElement(this.tag);
    element.className = `${this.base}`;
    this.setPropertes(element);
    return element;
  }
}

export default Builder;
