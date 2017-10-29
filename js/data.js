const GAMES_COUNT = 10;
const START_LIVES = 3;
const TIME_FOR_GAME = 30;
const FAST_ANSWER_BOUND_TIME = 20;
const SLOW_ANSWER_BOUND_TIME = 10;
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
  currentGame: 0,
  lives: rules.lives,
  time: rules.time,
  level: `level-0`,
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

export const isRightAnswer = (question, answer) => {
  if (!question || !Object.keys(question).includes(`type`) || !typeof answer === `String`) {
    return false;
  } else if (question.type === answer) {
    return true;
  }
  return false;
};

export const normalizeTime = (time = 0) => {
  if (typeof time !== `number`) {
    throw new Error(`Wrong parameter in normalizeTime function`);
  }
  return (time < 0) ? 0 : time;
};

export const getTypeOfAnswer = (time = 0) => {
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

export const generateCurrentStats = (state = {}, answer = ``) => {
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

export const getLives = (answer = ``, lives = LIVE_POINTS) => {
  if (typeof answer !== `string` || typeof lives !== `number` || !states.has(answer)) {
    throw new Error(`Wrong parameter in getLives function`);
  }
  if (answer === `wrong`) {
    return lives - 1;
  }
  return lives;
};

export const getGameCount = (gameCount = 0) => {
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

  const newStateStats = generateCurrentStats(state, answerType);
  const newStateLives = getLives(answerType, state.lives);
  const newStateGameCount = getGameCount(state.currentGame);
  return Object.assign({}, state, {stats: newStateStats,
    currentGame: newStateGameCount, lives: newStateLives});
};

export const countStats = (stats = {}) => {
  const sum = stats.statsArray.reduce((acc, value) => {
    switch (value) {
      case `wrong`:
        return acc;
      case `correct`:
        return acc + RIGHT_ANSWER_POINTS;
      case `fast`:
        return acc + RIGHT_ANSWER_POINTS + FAST_ANSWER_POINTS;
      case `slow`:
        return acc + RIGHT_ANSWER_POINTS + SLOW_ANSWER_POINTS;
      default:
        return acc;
    }
  }, 0);
  const livesBonus = stats.lives * LIVE_POINTS;
  return livesBonus + sum;
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
