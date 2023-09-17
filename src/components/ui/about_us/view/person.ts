import { Base, Blocks, Elem, Mode, Titles } from '../../../models/builder';
import { Person, Person1, Person2, Person3 } from '../../../models/person';
import Builder from '../../builder/html-builder';

function renderPersonInfo(): HTMLElement {
  const shortInfo: HTMLElement = new Builder('section', '', Blocks.about, Elem.info, '').element();
  const personList: Person[] = [Person1, Person2, Person3];
  personList.forEach((person: Person): void => {
    const personBlock: HTMLElement = new Builder('div', Base.person, Blocks.about, Elem.person, '').a(person.id);
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
    const left: HTMLElement = new Builder('div', '', Blocks.content, Elem.wrapper, Mode.left).element();
    const right: HTMLElement = new Builder('div', '', Blocks.content, Elem.wrapper, Mode.right).element();
    const personBlock: HTMLElement = new Builder('div', Base.content, Blocks.about, Elem.content, '').element();
    const name: HTMLElement = new Builder('', '', Blocks.content, Elem.name, '').p();
    const contacts: HTMLElement = new Builder('div', '', Blocks.content, Elem.contacts, '').element();
    const git: HTMLElement = new Builder('div', '', Blocks.content, Elem.contact, Mode.git).a(person.git);
    const email: HTMLElement = new Builder('div', '', Blocks.content, Elem.contact, Mode.email).a(person.email);
    const impact: HTMLElement = new Builder('div', '', Blocks.content, Elem.impact, '').element();
    const impactTitle: HTMLHeadingElement = new Builder('div', '', Blocks.content, Elem.title, '').h(3);
    const impactText: HTMLParagraphElement = new Builder('div', '', Blocks.content, Elem.text, '').p();
    const bio: HTMLElement = new Builder('div', '', Blocks.content, Elem.bio, '').element();
    const bioTitle: HTMLHeadingElement = new Builder('div', '', Blocks.content, Elem.title, '').h(3);
    const bioText: HTMLParagraphElement = new Builder('div', '', Blocks.content, Elem.text, '').p();

    personBlock.setAttribute('id', person.id);
    name.textContent = person.name;
    impactTitle.textContent = Titles.IMPACT_TITLE;
    impactText.textContent = Titles.IMPACT_TEXT;
    bioTitle.textContent = Titles.BIO_TITLE;
    bioText.textContent = Titles.BIO_TEXT;

    contacts.append(git, email);
    impact.append(impactTitle, impactText);
    bio.append(bioTitle, bioText);
    left.append(name, impact);
    right.append(bio, contacts);
    personBlock.append(left, right);
    content.append(personBlock);
  });

  return content;
}

export { renderPersonInfo, renderPersonContent };
