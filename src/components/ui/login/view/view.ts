import { Blocks, Elem } from '../../../models/builder';

function getQuantity(): string {
  let quantityContent: string = '';
  const quantityParagraph: HTMLElement | null = document.querySelector(`.${Blocks.header}__${Elem.quantity}`);
  if (quantityParagraph && quantityParagraph.textContent) {
    quantityContent = quantityParagraph.textContent;
  }

  return quantityContent;
}

function showQuantity(quantityContent: string): void {
  const quantityParagraph: HTMLElement | null = document.querySelector(`.${Blocks.header}__${Elem.quantity}`);
  if (quantityParagraph) {
    quantityParagraph.textContent = `${quantityContent}`;
  }
}

export { getQuantity, showQuantity };
