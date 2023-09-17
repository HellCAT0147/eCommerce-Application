export enum Person1 {
  id = '1',
  name = 'Ilya Bukhairov',
  position = 'Team Lead',
  git = 'https://github.com/HellCAT0147',
  email = 'letscheckmail23@gmail.com',
}

export enum Person2 {
  id = '2',
  name = 'Kamilla Agliullina',
  position = 'Developer',
  git = 'https://github.com/LqosL',
  email = 'camillaagliullina@gmail.com',
}

export enum Person3 {
  id = '3',
  name = 'Aleksandr Reznikov',
  position = 'Developer',
  git = 'https://github.com/a-reznikov',
  email = 'a.reznnikov@gmail.com',
}

export type Person = typeof Person1 | typeof Person2 | typeof Person3;
