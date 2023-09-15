import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';
import createHeader from '../../main/view/header';
import renderPerson from './person';

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

    const shortInfo: HTMLElement = new Builder('section', '', Blocks.about, Elem.info, '').element();
    renderPerson(shortInfo);
    const facts: HTMLElement = new Builder('section', '', Blocks.about, Elem.facts, '').element();
    const factsTitle: HTMLHeadingElement = new Builder('', '', Blocks.facts, Elem.title, '').h(2);
    const factPr: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.pr).p();
    const factCommits: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.comm).p();
    const factLines: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.lines).p();
    const factBranches: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.branches).p();

    factsTitle.textContent = Titles.FACTS;
    factPr.textContent = Titles.FACTS_PR;
    factCommits.textContent = Titles.FACTS_COMM;
    factLines.textContent = Titles.FACTS_LINES;
    factBranches.textContent = Titles.FACTS_BRANCHES;

    const content: HTMLElement = new Builder('section', Base.content, Blocks.about, Elem.content, '').element();

    text.append(title, subtitle);
    titleSection.append(text);
    facts.append(factsTitle, factPr, factCommits, factLines, factBranches);
    main.append(titleSection, shortInfo, facts, content);
  }

  return newHeader;
}
