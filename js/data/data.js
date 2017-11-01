const FAST_ANSWER_BOUND_TIME = 20;
const SLOW_ANSWER_BOUND_TIME = 10;

export const CountRule = Object.freeze({
  GAME: 10,
  LIVES: 3,
  TIME: 30
});

export const BonusPoint = Object.freeze({
  CORRECT: 100,
  FAST: 50,
  SLOW: -50,
  LIVES: 50
});

const statsArray = Array(CountRule.GAME).fill(`unknown`);

export const initialState = Object.freeze({
  currentGame: 0,
  lives: CountRule.LIVES,
  time: CountRule.TIME,
  level: 0,
  stats: statsArray
});

const states = new Set([...[`unknown`, `fast`, `slow`, `wrong`, `correct`]]);

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

export const getRandom = (n) => Math.floor(Math.random() * n);

export const games = [
  {
    // name: `TwoPhotoOrPicture`,
    name: 0,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    question: [pictures.paintings[0], pictures.photos[0]],
    answer: [`paint`, `photo`]
  },
  {
    // name: `OnePhotoOrPicture`,
    name: 1,
    task: `Угадай, фото или рисунок?`,
    question: [pictures.paintings[1]],
    answer: [`paint`]
  },
  {
    // name: `PictureAmongPhotos`,
    name: 2,
    task: `Найдите рисунок среди изображений`,
    question: [pictures.photos[1], pictures.photos[2], pictures.paintings[2]],
    answer: [pictures.paintings[2]]
  },
];

export const isRightAnswer = (question, answer) => {
  if (!question || !Object.keys(question).includes(`type`) || !typeof answer === `String`) {
    return false;
  } else if (question.type === answer) {
    return true;
  }
  return false;
};

export const tick = (state) => Object.assign({}, state, {time: state.time - 1});

const normalizeTime = (time = 0) => {
  if (typeof time !== `number`) {
    throw new Error(`Wrong parameter in normalizeTime function`);
  }
  return (time < 0) ? 0 : time;
};

const getTypeOfAnswer = (time = 0) => {
  if (typeof time !== `number`) {
    throw new Error(`Wrong parameter in getTypeOfAnswer function`);
  }
  if (time <= 0) {
    return `wrong`;
  } else if (time > 0 && time < SLOW_ANSWER_BOUND_TIME) {
    return `slow`;
  } else if (time >= SLOW_ANSWER_BOUND_TIME && time < FAST_ANSWER_BOUND_TIME) {
    return `correct`;
  }
  return `fast`;
};

const generateCurrentStats = (state = {}, answer = ``) => {
  if ((typeof state !== `object`) || !Object.keys(state).includes(`stats`)
    || !Object.keys(state).includes(`currentGame`) || typeof answer !== `string`) {
    throw new Error(`Wrong parameter in generateCurrentStats function`);
  }
  if (!states.has(answer)) {
    throw new Error(`Wrong answer`);
  }
  const {currentGame, stats} = state;
  const newStats = stats.slice();
  newStats[currentGame] = answer;
  return newStats;
};

const getLives = (answer = ``, lives = CountRule.LIVES) => {
  if (typeof answer !== `string` || typeof lives !== `number` || !states.has(answer)) {
    throw new Error(`Wrong parameter in getLives function`);
  }
  if (answer === `wrong`) {
    return lives - 1;
  }
  return lives;
};

const getGameCount = (gameCount = 0) => {
  if (typeof gameCount !== `number`) {
    throw new Error(`Wrong parameter in getGameCount function`);
  }
  return gameCount + 1;
};

export const generateNewState = (state = {}, time = 0) => {
  if ((typeof state !== `object`) || typeof time !== `number`) {
    throw new Error(`Wrong parameters in generateNewState function`);
  }
  const answerTime = normalizeTime(time);
  const answerType = getTypeOfAnswer(answerTime);

  const newLevel = games[getRandom(games.length)].name;
  const newStateStats = generateCurrentStats(state, answerType);
  const newStateLives = getLives(answerType, state.lives);
  const newStateGameCount = getGameCount(state.currentGame);
  return Object.assign({}, state, {stats: newStateStats,
    currentGame: newStateGameCount, lives: newStateLives,
    level: newLevel, time: CountRule.TIME});
};

const getBonusInfo = (state = {}) => {
  return [
    {
      title: `Бонус за скорость`,
      tag: `fast`,
      amount: state.fast,
      bonusName: `fast`,
    },
    {
      title: `Бонус за жизни`,
      tag: `heart`,
      amount: state.lives,
      bonusName: `lives`,
    },
    {
      title: `Штраф за медлительность`,
      tag: `slow`,
      amount: state.slow,
      bonusName: `slow`,
    },
  ];
};

const groupAnswers = (stats = []) => {
  const filterStats = (str) => {
    return stats.filter((value) => value === str);
  };
  const fast = filterStats(`fast`).length;
  const wrongCount = filterStats(`wrong`).length;
  const lives = CountRule.LIVES - wrongCount;
  const correct = stats.length - wrongCount;
  const slow = filterStats(`slow`).length;
  return {fast, lives, correct, slow};
};

const getBonuses = (answers) => getBonusInfo(answers).filter((bonus) => bonus.amount !== 0);

const isWin = (answers) => (answers.lives >= 0) ? true : false;

const countSum = (answers = {}) => Object.keys(answers)
  .reduce((acc, key) => {
    const upperKey = key.toUpperCase();
    const bonus = BonusPoint[upperKey];
    return (acc + bonus * answers[key]);
  }, 0);

export const generateStatsState = (stats = []) => {
  const answers = groupAnswers(stats);
  const win = isWin(answers);
  if (!win) {
    return [{stats, win}];
  }
  const bonuses = getBonuses(answers);
  const sum = countSum(answers);
  return [{stats, win, bonuses, sum}];
};

export const resize = (frame, given) => {
  let multiplier = 1;
  if (given.width > frame.width) {
    multiplier = frame.width / given.width;
  }
  if (given.height * multiplier > frame.height) {
    multiplier = frame.height / given.height;
  }
  return {
    width: given.width * multiplier,
    height: given.height * multiplier
  };
};
