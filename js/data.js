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
const RIGHT_ANSWER_POINTS = 100;
const FAST_ANSWER_POINTS = 50;
const SLOW_ANSWER_POINTS = -50;
const LIVE_POINTS = 50;

export const rules = Object.freeze({
  games: GAMES_COUNT,
  lives: START_LIVES,
  time: TIME_FOR_GAME
});

export const points = Object.freeze({
  rightAnswer: RIGHT_ANSWER_POINTS,
  fastAnswer: FAST_ANSWER_POINTS,
  liveBonus: LIVE_POINTS,
  slowAnswer: SLOW_ANSWER_POINTS
});

const statsArray = Array(GAMES_COUNT).fill(`unknown`);

export const initialState = Object.freeze({
  count: 0,
  lives: rules.lives,
  level: `level-0`,
  stats: statsArray
});

// const states = new Set([...[`unknown`, `fast`, `slow`, `wrong`, `correct`]]);

const pictures = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const games = {
  'level-0': {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    question: new Set([...[pictures.paintings[0], pictures.photos[0]]]),
    answer: [`painting`, `photo`]
  },
  'level-1': {
    task: `Угадай, фото или рисунок?`,
    question: pictures.paintings[1],
    answer: [`painting`]
  },
  'level-2': {
    task: `Найдите рисунок среди изображений`,
    question: new Set([...[pictures.photos[1], pictures.photos[2], pictures.paintings[2]]]),
    answer: pictures.paintings[2]
  },
};

export const bonuses = (state = {}) => {
  return [
    {
      title: `Бонус за скорость`,
      tag: `fast`,
      amount: state.fast,
      bonusPoints: points.fastAnswer,
    },
    {
      title: `Бонус за жизни`,
      tag: `heart`,
      amount: state.lives,
      bonusPoints: points.liveBonus,
    },
    {
      title: `Штраф за медлительность`,
      tag: `slow`,
      amount: state.slow,
      bonusPoints: points.slowAnswer,
    },
  ];
};

// ONLY FOR EXAMPLE, WILL BE REMOVED
const res1 = {
  fast: 1,
  lives: 2,
  slow: 2
};

const res2 = {
  fast: 2,
  lives: 2,
  slow: 2
};

export const results = [
  {
    resultNumber: 1,
    statsArray: [`correct`, `fast`, `slow`, `wrong`, `correct`, `correct`, `fast`, `slow`, `wrong`, `correct`],
    resultTotal: 800,
    bonuses: bonuses(res1),
    finalResult: 950
  },
  {
    resultNumber: 2,
    statsArray: [`fast`, `fast`, `slow`, `wrong`, `correct`, `correct`, `fast`, `slow`, `wrong`, `correct`],
    resultTotal: 800,
    bonuses: bonuses(res2),
    finalResult: 1050
  }
];
