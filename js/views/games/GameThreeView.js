import AbstractView from '../AbstractView';
import HeaderView from '../HeaderView';
import statsBlock from '../../templates/stats';
import {games} from '../../data';

export default class GameThreeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    const header = new HeaderView(this.state);
    return `${header.template}
    <div class="game">
    <p class="game__task">${games[`level-2`].task}</p>
    <form class="game__content game__content--triple">
      ${new Array(3).fill(``).map((value, index) => `<div class="game__option">
        <img src="${Array.from(games[`level-2`].question)[index]}" alt="Option ${index + 1}" width="304" height="455">
      </div>`).join(`\n`)}
    </form>
    </div>
    <div class="stats">
    ${statsBlock(this.state.stats)}
    </div>`;
  }
  bind() {
    const options = this.element.querySelectorAll(`.game__option`);
    const form = this.element.querySelector(`.game__content`);
    Array.from(options).forEach((answer) => {
      answer.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onContinueGame();
      });
    });
    this.resizeImages(form.querySelectorAll(`img`));

    const backButton = this.element.querySelector(`.header__back`);
    backButton.onclick = (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    };
  }

  onContinueGame() {
    throw new Error(`You must to define listener on clicking one of answers`);
  }

  onBackButtonClick() {
    throw new Error(`You must to define listener on clicking Back button`);
  }
}
