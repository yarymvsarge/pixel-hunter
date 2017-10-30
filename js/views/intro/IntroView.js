import AbstractView from '../AbstractView';

export default class IntroView extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
      <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
      </div>`;
  }
  bind() {
    const asteriskElement = this.element.querySelector(`.intro__asterisk`);
    asteriskElement.onclick = (evt) => {
      evt.preventDefault();
      this.onAsteriskClick();
    };
  }
  onAsteriskClick() {
    throw new Error(`You must to define listener to Intro Screen`);
  }
}
