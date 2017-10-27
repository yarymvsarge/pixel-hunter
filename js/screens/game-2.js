import {renderPage, renderDom} from '../utils';
import greetingDom from './greeting';
import gameThirdDom from './game-3';

import {games} from '../data';
import header from '../templates/header';
import footer from '../templates/footer';
import statsBlock from '../templates/stats';

const gameTwo = (state) => {
  const gameTwoHtml = `${header(state)}
  <div class="game">
  <p class="game__task">${games[`level-1`].task}</p>
  <form class="game__content game__content--wide">
    <div class="game__option">
      <img src="${games[`level-1`].question}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  </div>
  <div class="stats">
  ${statsBlock(state.stats)}
  </div>
  ${footer}`;
  const gameTwoDom = renderDom(gameTwoHtml);
  const form = gameTwoDom.querySelector(`.game__content`);
  const radioElements = form.querySelectorAll(`input[type='radio']`);

  Array.from(radioElements).forEach((item) => {
    item.addEventListener(`change`, () => {
      const questionGroup = form.querySelector(`input[name="question1"]:checked`);
      if (questionGroup) {
        const newStats = state.stats.slice();
        newStats[state.count] = `correct`;
        const newState = {
          count: state.count + 1,
          level: `level-2`,
          stats: newStats,
        };
        renderPage(gameThirdDom(Object.assign({}, state, newState)));
      }
    });
  });

  const backButton = gameTwoDom.querySelector(`.header__back`);
  backButton.onclick = () => {
    renderPage(greetingDom);
  };
  return gameTwoDom;
};


export default gameTwo;
