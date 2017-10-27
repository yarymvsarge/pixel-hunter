const stats = (statistic = []) => `
<ul class="stats">
  ${statistic.map((elem) => `<li class="stats__result stats__result--${elem}"></li>`).join(`\n`)}
</ul>`;

export default stats;
