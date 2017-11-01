import RulesView from './rules-view';
import Application from '../../Application';
import {renderPage} from '../../utils';

class Rules {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    renderPage(this.view);
    this.view.onNext = () => {
      Application.showGame();
    };
    this.view.onBack = () => {
      Application.showGreeting();
    };
  }
}

export default new Rules();
