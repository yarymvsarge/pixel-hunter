import AbstractView from '../abstract-view';
import HeaderView from '../header-view';
import statsBlock from '../../templates/stats';
import {BonusPoint} from '../../data/data';

export default class StatsView extends AbstractView {
  constructor(results) {
    super();
    this.state = results;
  }

  get template() {
    const header = new HeaderView();
    return `${header.template}
    <div class="result">
    <h1>${this.state[this.state.length - 1].win ? `Победа!` : `Поражение!`}</h1>
    ${this.state.map((result, index) => `<table class="result__table">
    <tr>
      <td class="result__number">${index + 1}.</td>
      <td colspan="2">
        ${statsBlock(result.stats)}
      </td>
      ${(result.win) ? `<td class="result__points">×&nbsp;${BonusPoint.CORRECT}</td>
        <td class="result__total">${5 * BonusPoint.CORRECT}</td>
      </tr>
      ${result.bonuses.map(({title, amount, tag, bonusName}) => `<tr>
        <td></td>
        <td class="result__extra">${title}:</td>
        <td class="result__extra">${amount}&nbsp;<span class="stats__result stats__result--${tag}"></span></td>
        <td class="result__points">×&nbsp;${BonusPoint[bonusName.toUpperCase()]}</td>
        <td class="result__total">${amount * BonusPoint[bonusName.toUpperCase()]}</td>
      </tr>`).join(`\n`)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${result.sum}</td>
      </tr>`
        : `<td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`}
    </table>`).join(`\n`)}
    </div>`;
  }
  bind() {
    const backButton = this.element.querySelector(`.header__back`);
    backButton.onclick = (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    };
  }

  onBackButtonClick() {
    throw new Error(`You must to define listener on clicking Back button`);
  }
}
