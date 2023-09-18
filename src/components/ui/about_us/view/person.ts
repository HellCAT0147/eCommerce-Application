import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import { Mentor, Mentor1, Mentor2, Person, Person1, Person2, Person3 } from '../../../models/person';
import Builder from '../../builder/html-builder';

function renderPersonInfo(): HTMLElement {
  const shortInfo: HTMLElement = new Builder('section', '', Blocks.about, Elem.info, '').element();
  const personList: Person[] = [Person1, Person2, Person3];
  personList.forEach((person: Person): void => {
    const personBlock: HTMLElement = new Builder('', Base.person, Blocks.about, Elem.person, '').a(person.id);
    const personImg: HTMLElement = new Builder(
      'div',
      '',
      Blocks.person,
      Elem.image,
      `${Mode.person}${person.id}`
    ).element();
    const personInfo: HTMLElement = new Builder('div', '', Blocks.person, Elem.info, '').element();
    const personName: HTMLElement = new Builder('', '', Blocks.person, Elem.name, '').p();
    const personPosition: HTMLElement = new Builder('', '', Blocks.person, Elem.role, '').p();

    personBlock.setAttribute('href', `#${person.id}`);
    personName.textContent = person.name;
    personPosition.textContent = person.position;

    personInfo.append(personName, personPosition);
    personBlock.append(personImg, personInfo);
    shortInfo.append(personBlock);
  });

  return shortInfo;
}

function renderPersonContent(): HTMLElement {
  const content: HTMLElement = new Builder('section', '', Blocks.about, Elem.contents, '').element();
  const personList: Person[] = [Person1, Person2, Person3];
  personList.forEach((person: Person): void => {
    const personBlock: HTMLElement = new Builder('div', Base.content, Blocks.about, Elem.content, '').element();
    const top: HTMLElement = new Builder('div', '', Blocks.content, Elem.wrapper, Mode.top).element();
    const bottom: HTMLElement = new Builder('div', '', Blocks.content, Elem.wrapper, Mode.bottom).element();
    const name: HTMLElement = new Builder('', '', Blocks.content, Elem.name, '').p();
    const contacts: HTMLElement = new Builder('div', '', Blocks.content, Elem.contacts, '').element();
    const links: HTMLElement = new Builder('div', '', Blocks.content, Elem.link, '').element();
    const git: HTMLElement = new Builder('', '', Blocks.content, Elem.contact, Mode.git).a(person.git);
    const email: HTMLElement = new Builder('div', '', Blocks.content, Elem.contact, Mode.email).a(person.email);
    const locale: HTMLParagraphElement = new Builder('div', '', Blocks.content, Elem.locale, '').p();
    const impact: HTMLElement = new Builder('div', '', Blocks.content, Elem.impact, '').element();
    const impactTitle: HTMLHeadingElement = new Builder('div', '', Blocks.content, Elem.title, '').h(3);
    const impactText: HTMLParagraphElement = new Builder('div', '', Blocks.content, Elem.text, '').p();
    const bio: HTMLElement = new Builder('div', '', Blocks.content, Elem.bio, '').element();
    const bioTitle: HTMLHeadingElement = new Builder('div', '', Blocks.content, Elem.title, '').h(3);
    const bioText: HTMLParagraphElement = new Builder('div', '', Blocks.content, Elem.text, '').p();

    personBlock.setAttribute('id', person.id);
    name.textContent = person.name;
    locale.textContent = `${person.city}, ${person.country}`;
    impactTitle.textContent = Titles.IMPACT_TITLE;
    impactText.textContent = person.impact;
    bioTitle.textContent = Titles.BIO_TITLE;
    bioText.textContent = person.bio;

    links.append(git, email);
    contacts.append(links, locale);
    impact.append(impactTitle, impactText);
    bio.append(bioTitle, bioText);
    top.append(name, contacts);
    bottom.append(impact, bio);
    personBlock.append(top, bottom);
    content.append(personBlock);
  });

  return content;
}

function renderThanksSection(): HTMLElement {
  const section: HTMLElement = new Builder('section', '', Blocks.about, Elem.thanks, '').element();
  const thanksTitle: HTMLHeadingElement = new Builder('div', '', Blocks.thanks, Elem.title, '').h(3);
  const personWrapper: HTMLElement = new Builder('div', '', Blocks.thanks, Elem.wrapper, '').element();
  const thanksText: HTMLParagraphElement = new Builder('div', '', Blocks.thanks, Elem.text, '').p();
  const personList: Mentor[] = [Mentor1, Mentor2];
  personList.forEach((person: Mentor): void => {
    const personBlock: HTMLElement = new Builder('div', Base.mentor, Blocks.about, Elem.person, '').element();
    const personImg: HTMLElement = new Builder(
      'div',
      '',
      Blocks.person,
      Elem.image,
      `${Mode.person}${person.id}`
    ).element();
    const personInfo: HTMLElement = new Builder('div', '', Blocks.person, Elem.info, '').element();
    const personName: HTMLElement = new Builder('', '', Blocks.person, Elem.name, '').p();
    const control: HTMLElement = new Builder('', '', Blocks.person, Elem.control, '').p();
    const personPosition: HTMLElement = new Builder('', '', Blocks.person, Elem.role, '').p();
    const git: HTMLElement = new Builder('', '', Blocks.content, Elem.contact, Mode.git).a(person.git);

    personName.textContent = person.name;
    personPosition.textContent = person.position;

    control.append(personPosition, git);
    personInfo.append(personName, control);
    personBlock.append(personImg, personInfo);
    personWrapper.appendChild(personBlock);
  });

  thanksTitle.textContent = Titles.THANKS_TITLE;
  thanksText.textContent = Titles.THANKS_TEXT;
  section.append(thanksTitle, personWrapper, thanksText);

  return section;
}

export { renderPersonInfo, renderPersonContent, renderThanksSection };
