const stats = (statistic = []) => `<div class="stats">
<ul class="stats">
  ${statistic.map((elem) => `<li class="stats__result stats__result--${elem}"></li>`).join(`\n`)}
</ul>
</div>`;

export default stats;
