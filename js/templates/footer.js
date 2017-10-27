import {SOCIAL_LINKS, CREATION_DATE} from '../data';

const footer = `<footer class="footer">
<a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
<span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; ${CREATION_DATE}</span>
<div class="footer__social-links">
  ${SOCIAL_LINKS.map(({name, shortName, href}) =>
    `<a href=${href} class="social-link  social-link--${shortName}">${name}</a>`).join(`\n`)}
</div>
</footer>`;

export default footer;
