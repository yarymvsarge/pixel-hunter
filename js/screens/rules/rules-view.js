import AbstractView from '../abstract-view';
import HeaderView from '../header-view';
import {CountRule} from '../../data/data';

export default class RulesView extends AbstractView {
  get template() {
    const header = new HeaderView();
    return `${header.template}
    <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай ${CountRule.GAME} раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится ${CountRule.TIME} секунд.<br>
      Ошибиться можно не более ${CountRule.LIVE} раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
    </div>`;
  }
  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const inputName = form.querySelector(`.rules__input`);
    const nextButton = form.querySelector(`.rules__button`);
    const backButton = this.element.querySelector(`.header__back`);

    inputName.oninput = (evt) => {
      evt.preventDefault();
      if (inputName.value.trim() !== ``) {
        nextButton.removeAttribute(`disabled`);
      } else {
        nextButton.setAttribute(`disabled`, true);
      }
    };

    nextButton.onclick = (evt) => {
      evt.preventDefault();
      this.onNext();
    };

    backButton.onclick = (evt) => {
      evt.preventDefault();
      this.onBack();
    };
  }

  onNext() {
    throw new Error(`You must to define listener on going next`);
  }

  onBack() {
    throw new Error(`You must to define listener on returning back`);
  }
}
