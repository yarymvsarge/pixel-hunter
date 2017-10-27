import {renderPage, renderDom} from '../utils';
import greeting from './greeting';

import header from '../templates/header';
import statsBlock from '../templates/stats';
import * as data from '../data';

const statsHtml = (results) => `${header()}
<div class="result">
<h1>Победа!</h1>
${data.results.map((result) => `<table class="result__table">
<tr>
  <td class="result__number">${result.resultNumber}.</td>
  <td colspan="2">
    ${statsBlock(result.statsArray)}
  </td>
  <td class="result__points">×&nbsp;100</td>
  <td class="result__total">${result.resultTotal}</td>
</tr>
${result.bonuses.map((bonus) => `<tr>
  <td></td>
  <td class="result__extra">${bonus.title}:</td>
  <td class="result__extra">${bonus.amount}&nbsp;<span class="stats__result stats__result--${bonus.tag}"></span></td>
  <td class="result__points">×&nbsp;${bonus.bonusPoints}</td>
  <td class="result__total">${bonus.amount * bonus.bonusPoints}</td>
</tr>`).join(`\n`)}
<tr>
  <td colspan="5" class="result__total  result__total--final">${result.finalResult}</td>
</tr>
</table>`).join(`\n`)}
</div>`;
const statsElement = renderDom(statsHtml());
const backButton = statsElement.querySelector(`.header__back`);
backButton.onclick = () => {
  renderPage(greeting);
};
export default statsElement;
