import GameOneView from './GameOneView';
import GameTwoView from './GameTwoView';
import GameThreeView from './GameThreeView';
import Application from '../../Application';
import {renderPage} from '../../utils';
import {tick, initialState, games, generateNewState, CountRule} from '../../data/data';
const createLevel = (state) => {
  switch (state.level) {
    case 0:
      return new GameOneView(state);
    case 1:
      return new GameTwoView(state);
    case 2:
      return new GameThreeView(state);
    default:
      return null;
  }
};

class GamePresenter {
  constructor(state = {}) {
    this.state = state;
    this.view = createLevel(state);
  }

  init() {
    renderPage(this.view);
    this._startGame();
    this.view.onContinueGame = () => {
      const wrong = this.view._answers
        .filter((answer, index) => (answer !== games[this.state.level].answer[index]));
      if (wrong.length) {
        this._stopGame(0);
      } else {
        this._stopGame(this.state.time);
      }
    };
    this.view.onBackButton = () => {
      this._stopGame(-1);
      this.state = initialState;
      this.view = createLevel(this.state);
      Application.showGreeting();
    };
  }

  _startGame() {
    this._startTimer();
  }

  _startTimer() {
    this._timer = setInterval(() => {
      this.view._timer.data = Number(this.view._timer.data) - 1;
      this.state = tick(this.state);
      if (this.state.time === 0) {
        this._stopGame(this.state.time);
      }
    }, 1000);
  }

  _stopGame(time) {
    clearInterval(this._timer);
    if (time === -1) {
      return;
    }
    this.state = generateNewState(this.state, time);
    if (this.state.currentGame === CountRule.GAME || this.state.lives < 0) {
      const stats = this.state.stats;
      this.state = initialState;
      this.view = createLevel(this.state);
      Application.showStats(stats);
      return;
    }
    this.view = createLevel(this.state);
    this.init();
  }
}

export default new GamePresenter(initialState);
