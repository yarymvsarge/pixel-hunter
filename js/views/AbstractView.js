export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    const template = document.createElement(`div`);
    template.innerHTML = this.template;
    return template;
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
