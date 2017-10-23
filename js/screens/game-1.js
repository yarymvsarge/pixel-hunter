import {renderPage, renderDom} from '../utils';
import greeting from './greeting';
import gameSecond from './game-2';

import * as data from '../data';
import header from '../elems/header';
import footer from '../elems/footer';
import statsBlock from '../elems/statsBlock';

const gameOneHtml = `${header(data.rules)}
<div class="game">
<p class="game__task">${data.games[`level-0`].task}</p>
<form class="game__content">
  ${Array(2).fill(``).map((value, index) => `<div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option ${index + 1}" width="468" height="458">
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
${statsBlock(data.statsArray)}
${footer}`;

const gameOneElement = renderDom(gameOneHtml);
const form = gameOneElement.querySelector(`.game__content`);
const radioElements = form.querySelectorAll(`input[type='radio']`);

Array.from(radioElements).forEach((item) => {
  item.addEventListener(`change`, () => {
    const question1Group = form.querySelector(`input[name="question1"]:checked`);
    const question2Group = form.querySelector(`input[name="question2"]:checked`);

    if (question1Group && question2Group) {
      renderPage(gameSecond);
    }
  });
});

const backButton = gameOneElement.querySelector(`.header__back`);
backButton.onclick = () => {
  renderPage(greeting);
};

export default gameOneElement;
