import {renderPage, renderDom} from '../utils';
import greetingDom from './greeting';
import gameSecondDom from './game-2';

import {games} from '../data';
import header from '../templates/header';
import footer from '../templates/footer';
import statsBlock from '../templates/stats';

const gameOne = (state) => {
  const gameOneHtml = `${header(state)}
  <div class="game">
  <p class="game__task">${games[`level-0`].task}</p>
  <form class="game__content">
    ${Array(2).fill(``).map((value, index) => `<div class="game__option">
      <img src="${Array.from(games[`level-0`].question)[index]}" alt="Option ${index + 1}" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${index + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`).join(`\n`)}
  </form>
  </div>
  <div class="stats">
  ${statsBlock(state.stats)}
  </div>
  ${footer}`;
  const gameOneDom = renderDom(gameOneHtml);
  const form = gameOneDom.querySelector(`.game__content`);
  const radioElements = form.querySelectorAll(`input[type='radio']`);

  Array.from(radioElements).forEach((item) => {
    item.addEventListener(`change`, () => {
      const question1Group = form.querySelector(`input[name="question1"]:checked`);
      const question2Group = form.querySelector(`input[name="question2"]:checked`);

      if (question1Group && question2Group) {
        const newStats = state.stats.slice();
        newStats[state.count] = `correct`;
        const newState = {
          count: state.count + 1,
          level: `level-1`,
          stats: newStats,
        };
        renderPage(gameSecondDom(Object.assign({}, state, newState)));
      }
    });
  });

  const backButton = gameOneDom.querySelector(`.header__back`);
  backButton.onclick = () => {
    renderPage(greetingDom);
  };
  return gameOneDom;
};

export default gameOne;
