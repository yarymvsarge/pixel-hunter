import GameOneView from './GameOneView';
import GameTwoView from './GameTwoView';
import GameThreeView from './GameThreeView';
import stats from '../stats/stats';
import greeting from '../greeting/greeting';
import {renderPage} from '../../utils';
import {results} from '../../data';
const createLevel = (state) => {
  switch (state.level) {
    case `level-0`:
      return new GameOneView(state);
    case `level-1`:
      return new GameTwoView(state);
    case `level-2`:
      return new GameThreeView(state);
    default:
      return null;
  }
};

const play = (state) => {
  const game = createLevel(state);
  game.onContinueGame = (form) => {
    switch (state.level) {
      case `level-0`:
        renderPage(play(Object.assign({}, state, {level: `level-1`})));
        break;
      case `level-1`:
        renderPage(play(Object.assign({}, state, {level: `level-2`})));
        break;
      case `level-2`:
        renderPage(stats(results));
        break;
      default:
        break;
    }
  };

  game.onBackButtonClick = () => {
    renderPage(greeting());
  };
  return game.element;
};
export default play;
