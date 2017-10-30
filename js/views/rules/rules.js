import RulesView from './RulesView';
import gameOne from '../games/game';
import greeting from '../greeting/greeting';
import {renderPage} from '../../utils';
import {initialState} from '../../data';

export default () => {
  const rules = new RulesView();
  rules.onInput = (input, button) => {
    if (input.value.trim() !== ``) {
      button.removeAttribute(`disabled`);
    } else {
      button.setAttribute(`disabled`, true);
    }
  };
  rules.onNextButtonClick = () => {
    renderPage(gameOne(initialState));
  };
  rules.onBackButtonClick = () => {
    renderPage(greeting());
  };
  return rules.element;
};
