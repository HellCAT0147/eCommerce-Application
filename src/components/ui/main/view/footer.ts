import { Base, Blocks, Buttons, Elem, Mode, Titles } from '../../../models/builder';
import { Pages } from '../../../models/router';
import Builder from '../../builder/html-builder';

function createLinks(): HTMLElement {
  const linksMenu: HTMLElement = new Builder('div', '', Blocks.footer, Elem.menu, '').element();
  const linkAbout: HTMLAnchorElement = new Builder('', Base.links, Blocks.footer, Elem.link, Mode.about).a();
  const linkProfile: HTMLElement = new Builder('', Base.links, Blocks.footer, Elem.link, Mode.prof).a();
  const linkLogin: HTMLAnchorElement = new Builder('', Base.links, Blocks.footer, Elem.link, Mode.login).a();
  const linkRegistration: HTMLElement = new Builder('', Base.links, Blocks.footer, Elem.link, Mode.reg).a();

  linksMenu.textContent = Titles.MENU;
  linkAbout.textContent = Buttons.ABOUT_US;
  linkProfile.textContent = Buttons.PROFILE;
  linkLogin.textContent = Buttons.SIGN;
  linkRegistration.textContent = Buttons.CREATE;

  linksMenu.append(linkAbout, linkProfile, linkLogin, linkRegistration);

  return linksMenu;
}

function createRights(): HTMLElement {
  const footerRights: HTMLElement = new Builder('div', '', Blocks.footer, Elem.rights, '').element();
  const rightsDesign: HTMLElement = new Builder('footer', Base.links, Blocks.footer, Elem.right, Mode.design).a(
    Pages.DESIGN
  );
  const rightsPhotos: HTMLElement = new Builder('footer', Base.links, Blocks.footer, Elem.right, Mode.photos).a(
    Pages.PHOTOS
  );
  const rightsTeam: HTMLElement = new Builder('footer', '', Blocks.footer, Elem.title, '').p();

  rightsDesign.textContent = `Based on: ${Titles.RIGHTS_DESIGN}`;
  rightsPhotos.textContent = `Inspired by: ${Titles.RIGHTS_PHOTOS}`;
  rightsTeam.textContent = Titles.RIGHTS_TEAM;

  footerRights.append(rightsDesign, rightsTeam, rightsPhotos);

  return footerRights;
}

function createFooter(): HTMLElement {
  const footer: HTMLElement = new Builder('footer', '', Blocks.footer, '', '').element();
  const footerContent: HTMLElement = new Builder('div', '', Blocks.footer, Elem.content, '').element();
  const footerRights: HTMLElement = createRights();
  const logo: HTMLElement = new Builder('a', '', Blocks.header, Elem.logo, '').element();
  logo.setAttribute('href', '/main');
  logo.classList.add('redirect__buttons');
  logo.setAttribute('id', `${Pages.LOGO_MAIN}`);

  const footerContacts: HTMLElement = new Builder('footer', '', Blocks.footer, Elem.contacts, '').element();
  const addressContact: HTMLElement = new Builder('footer', '', Blocks.footer, Elem.contact, '').element();
  const linksMenu: HTMLElement = createLinks();
  const addressTitle: HTMLHeadingElement = new Builder('', Base.titles, Blocks.contact, Elem.title, '').h(3);
  const addressText: HTMLParagraphElement = new Builder('', '', Blocks.contact, Elem.text, '').p();
  const emailContact: HTMLElement = new Builder('footer', '', Blocks.footer, Elem.contact, '').element();
  const emailTitle: HTMLHeadingElement = new Builder('', Base.titles, Blocks.contact, Elem.title, '').h(3);
  const emailText: HTMLParagraphElement = new Builder('', '', Blocks.contact, Elem.text, '').p();
  const phoneContact: HTMLElement = new Builder('footer', '', Blocks.footer, Elem.contact, '').element();
  const phoneTitle: HTMLHeadingElement = new Builder('', Base.titles, Blocks.contact, Elem.title, '').h(3);
  const phoneText: HTMLParagraphElement = new Builder('', '', Blocks.contact, Elem.text, '').p();
  const workContact: HTMLElement = new Builder('footer', '', Blocks.footer, Elem.contact, '').element();
  const workTitle: HTMLHeadingElement = new Builder('', Base.titles, Blocks.contact, Elem.title, '').h(3);
  const workText: HTMLParagraphElement = new Builder('', '', Blocks.contact, Elem.text, '').p();

  const logoRss: HTMLElement = new Builder('', '', Blocks.footer, Elem.logo, Mode.rss).a(Pages.RSS);

  footerContacts.textContent = Titles.CONTACTS;
  addressTitle.textContent = `${Titles.ADDRESS}:`.toUpperCase();
  addressText.textContent = `${Titles.ADDRESS_COMPANY}`.toUpperCase();
  emailTitle.textContent = `${Titles.EMAIL}:`.toUpperCase();
  emailText.textContent = `${Titles.EMAIL_COMPANY}`.toUpperCase();
  phoneTitle.textContent = `${Titles.PHONE}:`.toUpperCase();
  phoneText.textContent = `${Titles.PHONE_COMPANY}`.toUpperCase();
  workTitle.textContent = `${Titles.WORK}:`.toUpperCase();
  workText.textContent = `${Titles.WORK_COMPANY}`.toUpperCase();

  addressContact.append(addressTitle, addressText);
  emailContact.append(emailTitle, emailText);
  phoneContact.append(phoneTitle, phoneText);
  workContact.append(workTitle, workText);
  footerContacts.append(addressContact, emailContact, phoneContact, workContact);
  footerContent.append(logo, linksMenu, footerContacts, logoRss);
  footer.append(footerContent, footerRights);

  return footer;
}

export { createFooter, createLinks };
