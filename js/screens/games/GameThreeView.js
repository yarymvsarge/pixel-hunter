import AbstractView from '../abstract-view';
import HeaderView from '../header-view';
import statsBlock from '../../templates/stats';

export default class GameThreeView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }
  get template() {
    const header = new HeaderView(this.state);
    return `${header.template}
    <div class="game">
    <p class="game__task">${this.level.task}</p>
    <form class="game__content game__content--triple">
      ${new Array(3).fill(``).map((value, index) => `<div class="game__option">
        <img src="${Array.from(this.level.question)[index]}" alt="Option ${index + 1}" width="304" height="455">
      </div>`).join(`\n`)}
    </form>
    </div>
    <div class="stats">
    ${statsBlock(this.state.stats)}
    </div>`;
  }
  bind() {
    this._timer = this.element.querySelector(`.game__timer`).firstChild;
    const options = this.element.querySelectorAll(`.game__option`);
    const form = this.element.querySelector(`.game__content`);
    Array.from(options).forEach((answer) => {
      answer.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._answers = [answer.querySelector(`img`).src];
        this.onContinueGame();
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
    throw new Error(`You must to define listener on clicking one of answers`);
  }

  onBackButton() {
    throw new Error(`You must to define listener on clicking Back button`);
  }
}
