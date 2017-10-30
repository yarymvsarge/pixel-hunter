import IntroView from './IntroView';
import greeting from '../greeting/greeting';
import {renderPage} from '../../utils';

export default () => {
  const intro = new IntroView();
  intro.onAsteriskClick = () => {
    renderPage(greeting());
  };
  return intro.element;
};
