import {renderPage, renderDom} from '../utils';
import greetingDom from './greeting';
import gameFirstDom from './game-1';

import {rules, initialState} from '../data';
import header from '../templates/header';

const rulesHtml = `${header()}
<div class="rules">
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
</div>`;

const rulesDom = renderDom(rulesHtml);
const form = rulesDom.querySelector(`.rules__form`);
const inputName = form.querySelector(`.rules__input`);
const okButton = form.querySelector(`.rules__button`);

inputName.oninput = () => {
  if (inputName.value.trim() !== ``) {
    okButton.removeAttribute(`disabled`);
  } else {
    okButton.setAttribute(`disabled`, true);
  }
};

okButton.onclick = () => {
  renderPage(gameFirstDom(initialState));
};

const backButton = rulesDom.querySelector(`.header__back`);
backButton.onclick = () => {
  renderPage(greetingDom);
};

export default rulesDom;
