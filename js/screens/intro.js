import {renderPage, renderDom} from '../utils';
import greetingDom from './greeting';
import footer from '../templates/footer';

const introHtml = `<div id="main" class="central__content">
<div id="intro" class="intro">
<h1 class="intro__asterisk">*</h1>
<p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</div>
</div>
${footer}`;

const introDom = renderDom(introHtml);
const asteriskElement = introDom.querySelector(`.intro__asterisk`);

asteriskElement.onclick = () => {
  renderPage(greetingDom);
};

export default introDom;
