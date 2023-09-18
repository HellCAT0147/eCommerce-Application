export enum Person1 {
  id = '1',
  name = 'Ilya Bukhairov',
  position = 'Team Lead',
  git = 'https://github.com/HellCAT0147',
  email = 'letscheckmail23@gmail.com',
  city = 'Tashkent',
  country = 'Uzbekistan',
  impact = 'Lorem ipsum dolor sit amet. Aut exercitationem amet est dolor eaque At nemo quibusdam. Nam laborum libero a aperiam voluptas ut iusto atque et perspiciatis porro a magni distinctio ut quos voluptatem.',
  bio = 'Lorem ipsum dolor sit amet. Qui minus numquam et aliquam quasi qui explicabo voluptas eum amet laborum in ipsa voluptatem. In voluptatem dolorem id beatae aliquam ab rerum error aut dolores assumenda et ratione voluptate. Rem odio sunt sed deserunt iste ut corrupti quasi et laborum dolorem. Et repellendus odit qui nobis laboriosam rem quisquam veniam aut error odio? Eum corporis cupiditate et illum deserunt et inventore alias ut eius corrupti eum minus ullam est distinctio galisum aut dolor dolorem.',
}

export enum Person2 {
  id = '2',
  name = 'Kamilla Agliullina',
  position = 'Developer',
  git = 'https://github.com/LqosL',
  email = 'camillaagliullina@gmail.com',
  city = 'Omsk',
  country = 'Russia',
  impact = 'Kamilla was mainly dealing with API interaction and catalog page. Besides, she spent much time in Commercetools website, filling in product info and pictures and setting up project settings.',
  bio = "Kamilla started her way to IT from Stage 0 in 2023. Before it she used to be a teacher, so changing profession too a lot of effort. Married to a software engineer, owns a horse and 2 ginger cats. She likes Vanilla js, cross-stitching and 17'  laptops. In her free time she usually goes to the forest to cry out loud over ESLint function length limitation. Strongly prefers using switch(true) instead of chain of if-elses. Windows user (yet...).",
}

export enum Person3 {
  id = '3',
  name = 'Aleksandr Reznikov',
  position = 'Developer',
  git = 'https://github.com/a-reznikov',
  email = 'a.reznnikov@gmail.com',
  city = 'Gomel',
  country = 'Belarus',
  impact = 'Lorem ipsum dolor sit amet. Aut exercitationem amet est dolor eaque At nemo quibusdam. Nam laborum libero a aperiam voluptas ut iusto atque et perspiciatis porro a magni distinctio ut quos voluptatem.',
  bio = 'Lorem ipsum dolor sit amet. Qui minus numquam et aliquam quasi qui explicabo voluptas eum amet laborum in ipsa voluptatem. In voluptatem dolorem id beatae aliquam ab rerum error aut dolores assumenda et ratione voluptate. Rem odio sunt sed deserunt iste ut corrupti quasi et laborum dolorem. Et repellendus odit qui nobis laboriosam rem quisquam veniam aut error odio? Eum corporis cupiditate et illum deserunt et inventore alias ut eius corrupti eum minus ullam est distinctio galisum aut dolor dolorem.',
}

export enum Mentor1 {
  id = '4',
  name = 'Andrei Ihnatsiuk',
  position = 'Mentor',
  git = 'https://github.com/garnich',
}

export enum Mentor2 {
  id = '5',
  name = 'Aleksei Ovsiannikov',
  position = 'Mentor',
  git = 'https://github.com/insanusmokrassar',
}

export type Person = typeof Person1 | typeof Person2 | typeof Person3;

export type Mentor = typeof Mentor1 | typeof Mentor2;
