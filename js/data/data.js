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

export const AnswerType = Object.freeze({
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
});

const statsArray = Array(CountRule.GAME).fill(`unknown`);

export const initialState = Object.freeze({
  currentGame: 0,
  lives: CountRule.LIVES,
  time: CountRule.TIME,
  stats: statsArray
});

const states = Object.values(AnswerType);

export const codeStats = (stats = []) => stats.map((item) => states.indexOf(item)).join(``);

export const decodeStats = (stats = ``) => stats.split(``).map((value) => states[value]);

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
    return AnswerType.WRONG;
  } else if (time > 0 && time < SLOW_ANSWER_BOUND_TIME) {
    return AnswerType.SLOW;
  } else if (time >= SLOW_ANSWER_BOUND_TIME && time < FAST_ANSWER_BOUND_TIME) {
    return AnswerType.CORRECT;
  }
  return AnswerType.FAST;
};

const generateCurrentStats = (state = {}, answer = ``) => {
  if ((typeof state !== `object`) || !Object.keys(state).includes(`stats`)
    || !Object.keys(state).includes(`currentGame`) || typeof answer !== `string`) {
    throw new Error(`Wrong parameter in generateCurrentStats function`);
  }
  if (!states.includes(answer)) {
    throw new Error(`Wrong answer`);
  }
  const {currentGame, stats} = state;
  const newStats = stats.slice();
  newStats[currentGame] = answer;
  return newStats;
};

const getLives = (answer = ``, lives = CountRule.LIVES) => {
  if (typeof answer !== `string` || typeof lives !== `number` || !states.includes(answer)) {
    throw new Error(`Wrong parameter in getLives function`);
  }
  if (answer === `wrong`) {
    return lives - 1;
  }
  return lives;
};

export const generateNewState = (state = {}, time = 0) => {
  if ((typeof state !== `object`) || typeof time !== `number`) {
    throw new Error(`Wrong parameters in generateNewState function`);
  }
  const answerTime = normalizeTime(time);
  const answerType = getTypeOfAnswer(answerTime);

  const newStateStats = generateCurrentStats(state, answerType);
  const newStateLives = getLives(answerType, state.lives);
  return Object.assign({}, state, {stats: newStateStats,
    currentGame: state.currentGame + 1, lives: newStateLives,
    time: CountRule.TIME});
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
  const fast = filterStats(AnswerType.FAST).length;
  const wrongCount = filterStats(AnswerType.WRONG).length;
  const lives = CountRule.LIVES - wrongCount;
  const correct = stats.length - wrongCount;
  const slow = filterStats(AnswerType.SLOW).length;
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
  if (stats.length === 0) {
    return [{win: false}];
  }
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
