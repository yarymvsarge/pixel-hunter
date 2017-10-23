import {renderPage, renderDom} from '../utils';
import greeting from './greeting';
import gameFirst from './game-1';
import footer from '../elems/footer'

const rules = Object.freeze({
  games: 100,
  lives: 3,
  time: 30
});

const header = `<header class="header">
<div class="header__back">
  <span class="back">
    <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
    <img src="img/logo_small.png" width="101" height="44">
  </span>
</div>
</header>`;

const rulesHtml = `${header}<div class="rules">
<h1 class="rules__title">Правила</h1>
<p class="rules__description">Угадай ${rules.games} раз для каждого изображения фото <img
  src="img/photo_icon.png" width="16" height="16"> или рисунок <img
  src="img/paint_icon.png" width="16" height="16" alt="">.<br>
  Фотографиями или рисунками могут быть оба изображения.<br>
  На каждую попытку отводится ${rules.time} секунд.<br>
  Ошибиться можно не более ${rules.lives} раз.<br>
  <br>
  Готовы?
</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>
</div>
${footer}`;

const rulesElement = renderDom(rulesHtml);
const form = rulesElement.querySelector(`.rules__form`);
const inputName = form.querySelector(`.rules__input`);
const button = form.querySelector(`.rules__button`);

inputName.oninput = () => {
  if (inputName.value.trim() !== ``) {
    button.removeAttribute(`disabled`);
  } else {
    button.setAttribute(`disabled`, true);
  }
};

button.onclick = () => {
  renderPage(gameFirst);
};

const backButton = rulesElement.querySelector(`.header__back`);
backButton.onclick = () => {
  renderPage(greeting);
};
export default rulesElement;
