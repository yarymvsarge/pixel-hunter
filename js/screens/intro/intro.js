import IntroView from './intro-view';
import Application from '../../Application';
import {renderPage} from '../../utils';

class Intro {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    renderPage(this.view);
    this.view.onNext = () => {
      Application.showGreeting();
    };
  }
}

export default Intro;
