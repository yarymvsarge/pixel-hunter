export const SOCIAL_LINKS = [
  {
    name: `Твиттер`,
    shortName: `tw`,
    href: `https://twitter.com/htmlacademy_ru`
  },

  {
    name: `Инстаграм`,
    shortName: `ins`,
    href: `https://www.instagram.com/htmlacademy/`
  },

  {
    name: `Фэйсбук`,
    shortName: `fb`,
    href: `https://www.facebook.com/htmlacademy`
  },

  {
    name: `Вконтакте`,
    shortName: `vk`,
    href: `https://vk.com/htmlacademy`
  },
];

export const CREATION_DATE = 2017;

const GAMES_COUNT = 10;
const START_LIVES = 3;
const TIME_FOR_GAME = 30;

export const rules = Object.freeze({
  games: GAMES_COUNT,
  lives: START_LIVES,
  time: TIME_FOR_GAME
});

export const statsArray = Array(GAMES_COUNT).fill(`unknown`);

const states = new Set(`unknown`, `fast`, `slow`, `wrong`, `correct`);

const pictures = {
  paintings: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,

    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,

    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,

    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,

    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const games = {
  'level-0': {
    task: `Угадайте для каждого изображения фото или рисунок?`,
  },
  'level-1': {
    task: `Угадай, фото или рисунок?`,
  },
  'level-2': {
    task: `Найдите рисунок среди изображений`,
  },
};
