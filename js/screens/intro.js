import {renderPage, renderDom} from '../utils';
import greeting from './greeting';
import footer from '../elems/footer';

const introContent = `<div id="main" class="central__content">
<div id="intro" class="intro">
<h1 class="intro__asterisk">*</h1>
<p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</div>
</div>
${footer}`;

const introElement = renderDom(introContent);
const asteriskElement = introElement.querySelector(`.intro__asterisk`);

asteriskElement.onclick = () => {
  renderPage(greeting);
};

export default introElement;
