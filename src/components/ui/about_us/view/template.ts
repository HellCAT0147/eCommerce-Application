import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
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
    const title: HTMLHeadingElement = new Builder('', Base.titles, Blocks.about, Elem.title, '').h(1);
    const subtitle: HTMLHeadingElement = new Builder('', Base.titles, Blocks.about, Elem.subtitle, '').h(2);
    title.textContent = `${Titles.HAQ_TITLE}`;
    subtitle.textContent = `${Titles.HAQ_SUBTITLE}`;

    const rss: HTMLElement = new Builder('div', Base.rss, Blocks.about, Elem.rss, '').element();
    const rssTitle: HTMLHeadingElement = new Builder('', Base.titles, Blocks.about, Elem.title, Mode.rss).h(2);
    const rssLogo: HTMLElement = new Builder('', '', Blocks.about, Elem.logo, Mode.rss).a(Pages.RSS);

    const shortInfo: HTMLElement = renderPersonInfo();
    const facts: HTMLElement = renderFacts();
    const content: HTMLElement = renderPersonContent();

    const teamwork: HTMLElement = new Builder('section', Base.teamwork, Blocks.about, Elem.teamwork, '').element();
    const teamworkTitle: HTMLHeadingElement = new Builder('div', '', Blocks.teamwork, Elem.title, '').h(3);
    const teamworkText: HTMLParagraphElement = new Builder('div', '', Blocks.teamwork, Elem.text, '').p();
    teamworkTitle.textContent = `${Titles.TEAM_TITLE}`;
    teamworkText.textContent = `${Titles.TEAM_TEXT}`;
    rssTitle.textContent = Titles.RSS_TITLE;

    text.append(title, subtitle);
    rss.append(rssTitle, rssLogo);
    titleSection.append(text, rss);
    teamwork.append(teamworkTitle, teamworkText);

    main.append(titleSection, shortInfo, facts, content, teamwork);
  }

  return newHeader;
}
