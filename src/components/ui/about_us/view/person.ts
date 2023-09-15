import { Base, Blocks, Elem, Mode } from '../../../models/builder';
import { Person, Person1, Person2, Person3 } from '../../../models/person';
import Builder from '../../builder/html-builder';

export default function renderPerson(shortInfo: HTMLElement): HTMLElement {
  const personList: Person[] = [Person1, Person2, Person3];
  personList.forEach((person: Person): void => {
    const personBlock: HTMLElement = new Builder('div', Base.person, Blocks.about, Elem.person, '').element();
    const personGit: HTMLElement = new Builder('div', Base.links, Blocks.person, Elem.git, '').element();
    const personMore: HTMLElement = new Builder('div', Base.links, Blocks.person, Elem.more, '').element();
    const personImg: HTMLElement = new Builder(
      'div',
      '',
      Blocks.person,
      Elem.image,
      `${Mode.person}${person.id}`
    ).element();
    const personInfo: HTMLElement = new Builder('div', '', Blocks.person, Elem.info, '').element();
    const personName: HTMLElement = new Builder('', '', Blocks.person, Elem.name, '').p();
    const personPosition: HTMLElement = new Builder('', '', Blocks.person, Elem.position, '').p();

    personName.textContent = person.name;
    personPosition.textContent = person.position;
    // personGit.textContent = 'Git Hub';
    // personMore.textContent = 'read more';

    personInfo.append(personName, personPosition, personGit, personMore);
    personBlock.append(personImg, personInfo);
    shortInfo.append(personBlock);
  });

  return shortInfo;
}
