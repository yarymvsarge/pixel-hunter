import GameOneView from './GameOneView';
import GameTwoView from './GameTwoView';
import GameThreeView from './GameThreeView';
import Application from '../../Application';
import {renderPage} from '../../utils';
import {tick, initialState, games, generateNewState} from '../../data/data';
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
    console.log(`hello friend`);
    renderPage(this.view);
    this._startGame();
    this.view.onContinueGame = () => {
      const wrong = this.view._answers
        .filter((answer, index) => (answer !== games[this.state.level].answer[index]));
      if (wrong) {
        console.log(`WRONG!!!!!!!!!!!!!`);
        this._stopGame();
      }
      this.init();
    };
    this.view.onBackButton = () => {
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
    }, 1000);
  }

  _stopGame() {
    clearInterval(this._timer);
    this.state = generateNewState(this.state, 0);
    this.view = createLevel(this.state);
    // this.init();
  }
}

export default new GamePresenter(initialState);
