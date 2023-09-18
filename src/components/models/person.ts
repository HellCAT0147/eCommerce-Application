export enum Person1 {
  id = '1',
  name = 'Ilya Bukhairov',
  position = 'Team Lead',
  git = 'https://github.com/HellCAT0147',
  email = 'letscheckmail23@gmail.com',
  city = 'Tashkent',
  country = 'Uzbekistan',
  impact = 'Ilya mostly managed the project, assigned tasks, reflected them in Trello cards, worked with project logic such as validation, information processing, and in the last sprint the API part.',
  bio = 'Ilya started this course from stage-0 with basic knowledge of HTML/CSS, all the time he was trying to break into the top positions, he studied hard for 60 hours a week for it. At the initial stages, when there was enough time to close tasks - he was very much engaged in theory, which helped in the future in the course interviews. Ilya loves playing guitar, Dota 2 and Diablo (3-4). He also enjoys the adrenaline of high speed racing a car and setting records on a bike. In the future he really wants to become a Team Leader and make a lot of money.',
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
