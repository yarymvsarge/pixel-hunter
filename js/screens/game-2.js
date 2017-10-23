import {renderPage, renderDom} from '../utils';
import greeting from './greeting';
import gameThird from './game-3';

import * as data from '../data';
import header from '../elems/header';
import footer from '../elems/footer';
import statsBlock from '../elems/statsBlock';

const gameTwoHtml = `${header(data.rules)}
<div class="game">
<p class="game__task">${data.games[`level-1`].task}</p>
<form class="game__content game__content--wide">
  <div class="game__option">
    <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
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
${statsBlock(data.statsArray)}
${footer}`;

const gameTwoElement = renderDom(gameTwoHtml);
const form = gameTwoElement.querySelector(`.game__content`);
const radioElements = form.querySelectorAll(`input[type='radio']`);

Array.from(radioElements).forEach((item) => {
  item.addEventListener(`change`, () => {
    const questionGroup = form.querySelector(`input[name="question1"]:checked`);
    if (questionGroup) {
      renderPage(gameThird);
    }
  });
});

const backButton = gameTwoElement.querySelector(`.header__back`);
backButton.onclick = () => {
  renderPage(greeting);
};

export default gameTwoElement;
