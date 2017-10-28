import {renderPage, renderDom} from '../utils';
import greeting from './greeting';
import stats from './stats';

import {games} from '../data';
import header from '../templates/header';
import statsBlock from '../templates/stats';

const gameThree = (state) => {
  const gameThreeHtml = `${header(state)}
  <div class="game">
  <p class="game__task">${games[`level-2`].task}</p>
  <form class="game__content game__content--triple">
    ${new Array(3).fill(``).map((value, index) => `<div class="game__option">
      <img src="${Array.from(games[`level-2`].question)[index]}" alt="Option ${index + 1}" width="304" height="455">
    </div>`).join(`\n`)}
  </form>
  </div>
  <div class="stats">
  ${statsBlock(state.stats)}
  </div>`;
  const gameThreeDom = renderDom(gameThreeHtml);
  const options = gameThreeDom.querySelectorAll(`.game__option`);

  Array.from(options).forEach((answer) => {
    answer.addEventListener(`click`, () => {
      renderPage(stats());
    });
  });
  const backButton = gameThreeDom.querySelector(`.header__back`);
  backButton.onclick = () => {
    renderPage(greeting);
  };
  return gameThreeDom;
};

export default gameThree;
