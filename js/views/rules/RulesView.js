import AbstractView from '../AbstractView';
import HeaderView from '../HeaderView';
import {rules} from '../../data';

export default class RulesView extends AbstractView {
  get template() {
    const header = new HeaderView();
    return `${header.template}
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
  }
  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const inputName = form.querySelector(`.rules__input`);
    const nextButton = form.querySelector(`.rules__button`);

    const backButton = this.element.querySelector(`.header__back`);
    inputName.oninput = (evt) => {
      evt.preventDefault();
      this.onInput(inputName, nextButton);
    };

    nextButton.onclick = (evt) => {
      evt.preventDefault();
      this.onNextButtonClick();
    };

    backButton.onclick = (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    };
  }

  onInput(input, button) {
    throw new Error(`You must to define listener on inputting text`);
  }

  onNextButtonClick() {
    throw new Error(`You must to define listener on clicking OK button`);
  }

  onBackButtonClick() {
    throw new Error(`You must to define listener on clicking Back button`);
  }
}
