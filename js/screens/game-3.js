import {renderPage, renderDom} from '../utils';
import greeting from './greeting';
import stats from './stats';

import * as data from '../data';
import header from '../elems/header';
import footer from '../elems/footer';
import statsBlock from '../elems/statsBlock';

const gameThreeHtml = `${header(data.rules)}
<div class="game">
<p class="game__task">${data.games[`level-0`].task}</p>
<form class="game__content game__content--triple">
  ${new Array(3).fill(``).map((value, index) => `<div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option ${index + 1}}" width="304" height="455">
  </div>`).join(`\n`)}
</form>
</div>
${statsBlock(data.statsArray)}
${footer}`;

const gameThreeElement = renderDom(gameThreeHtml);
const options = gameThreeElement.querySelectorAll(`.game__option`);

Array.from(options).forEach((answer) => {
  answer.addEventListener(`click`, () => {
    renderPage(stats);
  });
});

const backButton = gameThreeElement.querySelector(`.header__back`);
backButton.onclick = () => {
  renderPage(greeting);
};

export default gameThreeElement;
