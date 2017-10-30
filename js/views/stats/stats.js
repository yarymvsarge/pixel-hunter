import StatsView from './StatsView';
import greeting from '../greeting/greeting';
import {renderPage} from '../../utils';

export default (results) => {
  const stats = new StatsView(results);
  stats.onBackButtonClick = () => {
    renderPage(greeting());
  };
  return stats.element;
};
