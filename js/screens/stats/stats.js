import StatsView from './stats-view';
import Application from '../../Application';
import {renderPage} from '../../utils';
import {generateStatsState} from '../../data/data';

class Stats {
  init(stats) {
    const statsState = generateStatsState(stats);
    this.view = new StatsView(statsState);
    renderPage(this.view);
    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default Stats;
