import assert from 'assert';
import {initialState, normalizeTime, getTypeOfAnswer, generateCurrentStats,
  getLives, generateNewState, countStats, resize} from './data';

describe(`Must change timer on state and return new state without changing initial`, () => {
  it(`should throw error if incorrect state`, () => {
    assert.throws(() => normalizeTime({}));
    assert.throws(() => normalizeTime(null, null));
    assert.throws(() => normalizeTime(`ddss`));
    assert.doesNotThrow(() => normalizeTime(5));
  });
  it(`check changing time`, () => {
    const smallChange = initialState.time - 1;
    const bigChange = initialState.time - 25;
    assert.equal(smallChange, normalizeTime(smallChange));
    assert.equal(bigChange, normalizeTime(bigChange));
  });
  it(`check changing below zero`, () => {
    assert.equal(0, normalizeTime(-5));
  });
});

describe(`Must take right answer string`, () => {
  it(`should throw error if incorrect state`, () => {
    assert.throws(() => getTypeOfAnswer({}));
    assert.throws(() => getTypeOfAnswer(``));
    assert.throws(() => getTypeOfAnswer(null));
    assert.throws(() => getTypeOfAnswer([]));
    assert.throws(() => getTypeOfAnswer(false));
  });
  it(`should be wrong if time less zero`, () => {
    assert.notEqual(`wrong`, getTypeOfAnswer(5));
    assert.equal(`wrong`, getTypeOfAnswer(0));
  });
  it(`should be slow if time between 0 and 10`, () => {
    assert.notEqual(`slow`, getTypeOfAnswer(15));
    assert.equal(`slow`, getTypeOfAnswer(6));
  });
  it(`should be correct if time between 10 and 20`, () => {
    assert.notEqual(`correct`, getTypeOfAnswer(25));
    assert.notEqual(`correct`, getTypeOfAnswer(0));
    assert.notEqual(`correct`, getTypeOfAnswer(5));
    assert.equal(`correct`, getTypeOfAnswer(15));
  });
  it(`should be fast if time bq 20`, () => {
    assert.equal(`fast`, getTypeOfAnswer(25));
    assert.notEqual(`fast`, getTypeOfAnswer(1));
    assert.notEqual(`fast`, getTypeOfAnswer(11));
    assert.notEqual(`fast`, getTypeOfAnswer(0));
  });
});

describe(`Must update answers array`, () => {
  it(`should throw error if incorrect state or string`, () => {
    assert.throws(() => generateCurrentStats({}, `wrong`));
    assert.throws(() => generateCurrentStats(1, `wrong`));
    assert.throws(() => generateCurrentStats(``, []));
    assert.throws(() => generateCurrentStats(null, 3));
    assert.throws(() => generateCurrentStats([], {}));
    assert.throws(() => generateCurrentStats(false, true));
    assert.throws(() => generateCurrentStats(initialState, true));
    assert.throws(() => generateCurrentStats(initialState, 5));
    assert.doesNotThrow(() => generateCurrentStats(initialState, `wrong`));
  });
  it(`should throw error if incorrect answer`, () => {
    assert.throws(() => generateCurrentStats(initialState, `hello`));
    assert.throws(() => generateCurrentStats(initialState, `helldddo`));
    assert.doesNotThrow(() => generateCurrentStats(initialState, `wrong`));
    assert.doesNotThrow(() => generateCurrentStats(initialState, `correct`));
    assert.doesNotThrow(() => generateCurrentStats(initialState, `fast`));
  });
  it(`should correct insert values`, () => {
    const modifiedObject = Object.assign({}, initialState);
    const modifiedStats = modifiedObject.stats;
    const modifiedGame = modifiedObject.currentGame;
    modifiedStats[modifiedGame] = `correct`;
    assert.deepEqual(modifiedStats, generateCurrentStats(initialState, `correct`));
    assert.notDeepEqual(modifiedStats, generateCurrentStats(initialState, `wrong`));
    const modifiedObjectTwo = Object.assign({}, modifiedObject);
    modifiedObjectTwo.currentGame = 5;
    modifiedObject.currentGame = 5;
    const modifiedStatsTwo = modifiedObject.stats.slice();
    const modifiedGameTwo = modifiedObjectTwo.currentGame;
    modifiedStatsTwo[modifiedGameTwo] = `fast`;
    assert.deepEqual(modifiedStatsTwo, generateCurrentStats(modifiedObject, `fast`));
    assert.notDeepEqual(modifiedStatsTwo, generateCurrentStats(modifiedObject, `wrong`));
  });
});

describe(`Must change lives count if answer was incorrect`, () => {
  it(`Don't change lives`, () => {
    assert.equal(initialState.lives, getLives(`correct`, initialState.lives));
    assert.notEqual(initialState.lives, getLives(`wrong`, initialState.lives));
  });
  it(`Must change lives`, () => {
    assert.equal(initialState.lives - 1, getLives(`wrong`, initialState.lives));
    assert.notEqual(initialState.lives - 1, getLives(`fast`, initialState.lives));
  });
});

describe(`Must return right object`, () => {
  const fastAnswered = {
    currentGame: initialState.currentGame + 1,
    lives: initialState.lives,
    time: initialState.time,
    level: `level-0`,
    stats: [`fast`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`,
      `unknown`, `unknown`]
  };
  it(`Test fast answer`, () => {
    assert.deepEqual(fastAnswered, generateNewState(initialState, 25));
    assert.notDeepEqual(initialState, generateNewState(initialState, 25));
  });
  const wrongAnswered = {
    currentGame: fastAnswered.currentGame + 1,
    lives: fastAnswered.lives - 1,
    time: fastAnswered.time,
    level: `level-0`,
    stats: [`fast`, `wrong`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`,
      `unknown`, `unknown`]
  };
  it(`Test wrong answer`, () => {
    assert.deepEqual(wrongAnswered, generateNewState(fastAnswered, 0));
    assert.notDeepEqual(fastAnswered, generateNewState(fastAnswered, 0));
  });
  const correctAnswered = {
    currentGame: wrongAnswered.currentGame + 1,
    lives: wrongAnswered.lives,
    time: wrongAnswered.time,
    level: `level-0`,
    stats: [`fast`, `wrong`, `correct`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`,
      `unknown`, `unknown`]
  };
  it(`Test correct answer`, () => {
    assert.deepEqual(correctAnswered, generateNewState(wrongAnswered, 15));
    assert.notDeepEqual(wrongAnswered, generateNewState(wrongAnswered, 15));
  });
});

describe(`Must count points right`, () => {
  const testObject = {
    lives: 1,
    statsArray: [`fast`, `wrong`, `correct`, `slow`, `fast`, `wrong`, `correct`, `slow`,
      `unknown`, `fast`]
  };

  const testObject2 = {
    lives: 3,
    statsArray: [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`,
      `fast`, `fast`]
  };
  it(`Test correct statistic count`, () => {
    assert.equal(800, countStats(testObject));
    assert.equal(1650, countStats(testObject2));
  });
});

// NB! В этом тесте подразумевается, что модуль называется `resize`
// и экспортирует метод `resize`. Если вы назовете метод иначе, учтите
// это в тексте этого теста

const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resize(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});
createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});
