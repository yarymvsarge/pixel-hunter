import GameOneView from './GameOneView';
import GameTwoView from './GameTwoView';
import GameThreeView from './GameThreeView';
import Application from '../../Application';
import {renderPage} from '../../utils';
import {tick, initialState, generateNewState, CountRule} from '../../data/data';
const createLevel = (state, level) => {
  switch (level.name) {
    case `two-of-two`:
      return new GameOneView(state, level);
    case `tinder-like`:
      return new GameTwoView(state, level);
    case `one-of-three`:
      return new GameThreeView(state, level);
    default:
      return null;
  }
};

class GamePresenter {
  constructor(data = []) {
    this.data = data;
    this.state = initialState;
    this.level = this.data[this.state.currentGame];
    this.view = createLevel(this.state, this.level);
  }

  init() {
    renderPage(this.view);
    this._startGame();
    this.view.onContinueGame = () => {
      const wrong = this.view._answers
        .filter((answer, index) => (answer !== this.level.answer[index]));
      if (wrong.length) {
        this._stopGame(0);
      } else {
        this._stopGame(this.state.time);
      }
    };
    this.view.onBackButton = () => {
      this._stopGame(-1);
      this.state = initialState;
      this.level = this.data[this.state.currentGame];
      this.view = createLevel(this.state, this.level);
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
    this.level = this.data[this.state.currentGame];
    if (this.state.currentGame === CountRule.GAME || this.state.lives < 0) {
      const stats = this.state.stats;
      this.state = initialState;
      this.level = this.data[this.state.currentGame];
      this.view = createLevel(this.state, this.level);
      Application.showStats(stats);
      return;
    }
    this.view = createLevel(this.state, this.level);
    this.init();
  }
}

export default GamePresenter;
