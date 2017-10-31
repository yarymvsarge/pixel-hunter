import GreetingView from './greeting-view';
import Application from '../../Application';
import {renderPage} from '../../utils';

class Greeting {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    renderPage(this.view);
    this.view.onNext = () => {
      Application.showRules();
    };
  }
}

export default new Greeting();
