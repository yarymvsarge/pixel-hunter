import AbstractView from '../AbstractView';
import header from '../../templates/header';
import statsBlock from '../../templates/stats';
import {games} from '../../data';

export class GameTwoView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `${header(this.state)}
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
    ${statsBlock(this.state.stats)}
    </div>`;
  }
  bind() {
    const form = this.element.querySelector(`.game__content`);
    const radioElements = form.querySelectorAll(`input[type='radio']`);
    Array.from(radioElements).forEach((item) => {
      item.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        this.onClickingRadio();
      });
    });

    const backButton = this.element.querySelector(`.header__back`);
    backButton.onclick = (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    };
  }

  onClickingRadio() {
    throw new Error(`You must to define listener on clicking radio buttons`);
  }

  onBackButtonClick() {
    throw new Error(`You must to define listener on clicking Back button`);
  }
}
