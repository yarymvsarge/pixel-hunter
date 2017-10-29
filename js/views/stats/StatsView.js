import AbstractView from '../AbstractView';
import header from '../../templates/header';
import statsBlock from '../../templates/stats';

export class RulesView extends AbstractView {
  constructor(results) {
    super();
    this.state = results;
  }
  get template() {
    return `${header()}
    <div class="result">
    <h1>Победа!</h1>
    ${this.state.map((result) => `<table class="result__table">
    <tr>
      <td class="result__number">${result.resultNumber}.</td>
      <td colspan="2">
        ${statsBlock(result.statsArray)}
      </td>
      <td class="result__points">×&nbsp;100</td>
      <td class="result__total">${result.resultTotal}</td>
    </tr>
    ${result.bonuses.map(({title, amount, tag, bonusPoints}) => `<tr>
      <td></td>
      <td class="result__extra">${title}:</td>
      <td class="result__extra">${amount}&nbsp;<span class="stats__result stats__result--${tag}"></span></td>
      <td class="result__points">×&nbsp;${bonusPoints}</td>
      <td class="result__total">${amount * bonusPoints}</td>
    </tr>`).join(`\n`)}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${result.finalResult}</td>
    </tr>
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
