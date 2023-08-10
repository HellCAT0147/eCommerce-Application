export default function createHeader(): HTMLElement {
  const header: HTMLElement = document.createElement('header');
  header.className = 'header';
  const logo: HTMLElement = document.createElement('div');
  logo.className = 'header__logo';
  const navigation: HTMLElement = document.createElement('nav');
  navigation.className = 'header__nav';
  const signButton: HTMLElement = document.createElement('button');
  signButton.className = 'buttons buttons_empty header__buttons header__buttons_sign';
  signButton.textContent = 'SIGN IN';
  const createButton: HTMLElement = document.createElement('button');
  createButton.className = 'buttons buttons_empty header__buttons header__buttons_create';
  createButton.textContent = 'CREATE AN ACCOUNT';
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';
  navigation.append(signButton);
  navigation.append(createButton);
  header.append(logo);
  header.append(navigation);

  return header;
}
