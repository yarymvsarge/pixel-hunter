import IntroScreen from './screens/intro/intro';
import greetingScreen from './screens/greeting/greeting';
import rulesScreen from './screens/rules/rules';
import GameScreen from './screens/games/game-presenter';
import StatsScreen from './screens/stats/stats';
import {codeStats, decodeStats} from './data/data';
import gameAdapter from './data/game-adapter';
import Model from './model';

const ControllerID = {
  GREETING: ``,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`,
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

class Application {
  constructor() {
    const preloaderRemove = this.showPreloader();
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }
    }();
    this.model.load(gameAdapter)
      .then((data) => this.setup(data))
      .then(preloaderRemove)
      .then();
  }

  setup(data) {
    this.routes = {
      [ControllerID.GREETING]: greetingScreen,
      [ControllerID.RULES]: rulesScreen,
      [ControllerID.GAME]: new GameScreen(data),
      [ControllerID.STATS]: new StatsScreen()
    };

    window.onhashchange = () => {
      const [controller, state] = getControllerIDFromHash(location.hash).split(`=`);
      this.changeController(controller, state);
    };
  }

  changeController(route = ``, state = ``) {
    const Controller = this.routes[route];
    if (!state) {
      Controller.init();
      return;
    }
    Controller.init(decodeStats(state));
  }

  showPreloader() {
    const loader = new IntroScreen();
    loader.init();
    return () => this.changeController(getControllerIDFromHash(location.hash));
  }

  showGreeting() {
    location.hash = ControllerID.GREETING;
  }

  showRules() {
    location.hash = ControllerID.RULES;
  }

  showGame() {
    location.hash = ControllerID.GAME;
  }

  showStats(stats) {
    location.hash = `${ControllerID.STATS}=${codeStats(stats)}`;
  }
}

export default new Application();
