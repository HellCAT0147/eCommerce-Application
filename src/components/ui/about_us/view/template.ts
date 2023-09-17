import { Base, Blocks, Elem, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import createHeader from '../../main/view/header';
import renderFacts from './facts';
import { renderPersonContent, renderPersonInfo } from './person';

export default function createTemplateAboutUs(isLoggedIn?: boolean): HTMLElement {
  const body: HTMLBodyElement | null = document.querySelector(`${Blocks.body}`);
  const header: HTMLElement | null = document.querySelector(`${Blocks.header}`);
  const newHeader: HTMLElement = createHeader(isLoggedIn);

  if (body && header) {
    body.removeChild(header);
    body.prepend(newHeader);
  }

  const main: HTMLElement | null = document.querySelector(`${Blocks.main}`);

  if (main) {
    main.className = `${Blocks.main} ${Blocks.main}__${Pages.ABOUT_US}`;
    main.innerHTML = '';

    const titleSection: HTMLElement = new Builder('section', '', Blocks.about, Elem.header, '').element();
    const text: HTMLElement = new Builder('div', '', Blocks.about, Elem.text, '').element();
    const title: HTMLElement = new Builder('h1', Base.titles, Blocks.about, Elem.title, '').element();
    const subtitle: HTMLElement = new Builder('h1', Base.titles, Blocks.about, Elem.subtitle, '').element();
    title.textContent = `${Titles.HAQ_TITLE}`;
    subtitle.textContent = `${Titles.HAQ_SUBTITLE}`;

    const shortInfo: HTMLElement = renderPersonInfo();
    const facts: HTMLElement = renderFacts();
    const content: HTMLElement = renderPersonContent();

    text.append(title, subtitle);
    titleSection.append(text);

    main.append(titleSection, shortInfo, facts, content);
  }

  return newHeader;
}
