import RulesView from './rules-view';
import Application from '../../Application';
import {renderPage} from '../../utils';
import {initialState} from '../../data/data';

class Rules {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    renderPage(this.view);
    this.view.onNext = () => {
      Application.showGame(initialState);
    };
    this.view.onBack = () => {
      Application.showGreeting();
    };
  }
}

export default new Rules();
