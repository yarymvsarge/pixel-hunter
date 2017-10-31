import AbstractView from '../abstract-view';
import HeaderView from '../header-view';
import statsBlock from '../../templates/stats';
import {games} from '../../data/data';

export default class GameOneView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    const header = new HeaderView(this.state);
    return `${header.template}
    <div class="game">
    <p class="game__task">${games[this.state.level].task}</p>
    <form class="game__content">
      ${Array(2).fill(``).map((value, index) => `<div class="game__option">
        <img src="${Array.from(games[this.state.level].question)[index]}" alt="Option ${index + 1}" width="468" height="458">
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
    ${statsBlock(this.state.stats)}
    </div>`;
  }
  bind() {
    this._timer = this.element.querySelector(`.game__timer`).firstChild;
    const form = this.element.querySelector(`.game__content`);
    const radioElements = form.querySelectorAll(`input[type='radio']`);
    Array.from(radioElements).forEach((item) => {
      item.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        const checked = form.querySelectorAll(`input[type='radio']:checked`);
        if (Array.from(checked).length === 2) {
          this._answers = Array.from(checked).map((elem) => elem.value);
          this.onContinueGame();
        }
      });
    });
    this.resizeImages(form.querySelectorAll(`img`));
    const backButton = this.element.querySelector(`.header__back`);
    backButton.onclick = (evt) => {
      evt.preventDefault();
      this.onBackButton();
    };
  }

  onContinueGame() {
    throw new Error(`You must to define listener on clicking radio buttons`);
  }

  onBackButton() {
    throw new Error(`You must to define listener on clicking Back button`);
  }
}