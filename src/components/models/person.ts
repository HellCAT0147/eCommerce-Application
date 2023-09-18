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
  bio = "Kamilla started her way to IT from Stage 0 in 2022. Before it she used to be a teacher, so changing profession too a lot of effort. Married to a software engineer, owns a horse and 2 ginger cats. She likes Vanilla js, cross-stitching and 17'  laptops. In her free time she usually goes to the forest to cry out loud over ESLint function length limitation. Strongly prefers using switch(true) instead of chain of if-elses. Windows user (yet...).",
}

export enum Person3 {
  id = '3',
  name = 'Aleksandr Reznikov',
  position = 'Developer',
  git = 'https://github.com/a-reznikov',
  email = 'a.reznnikov@gmail.com',
  city = 'Gomel',
  country = 'Belarus',
  impact = 'Alexander developed the routing on pure TS and created a MVC for each page of the project. He worked with the design and developed Builder class that generates HTML elements with classes according to BEM methodology. He customized the project structure, configs, scripts and env.',
  bio = 'Just like his colleagues, Alexander started learning JS in December last year on a basic course from RS school. Within the first two weeks he realized that frontend was what he was looking for. He dedicated about 70% of his time to learning, which allowed him to rank at the top. His work Minesweeper made it to the list of top 10 best jobs. One of the toughest assignments was Clean Code, but it was after that - he fell in love with clean code and continues to improve this skill. He loves development and wants it to be his job.',
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
