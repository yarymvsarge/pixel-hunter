import GreetingView from './GreetingView';
import rules from '../rules/rules';
import {renderPage} from '../../utils';

export default () => {
  const greeting = new GreetingView();
  greeting.onContinueClick = () => {
    renderPage(rules());
  };
  return greeting.element;
};
