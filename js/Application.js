import introScreen from './screens/intro/intro';
import greetingScreen from './screens/greeting/greeting';
import rulesScreen from './screens/rules/rules';
import gameScreen from './screens/games/game-presenter';
/* import statsScreen from './screens/stats/stats'; */

export default class Application {

  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static showGame() {
    gameScreen.init();
  }

 /* static showStats(stats) {
    statsScreen.init(stats);
  } */

}
