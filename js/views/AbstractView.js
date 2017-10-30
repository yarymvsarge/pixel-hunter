import {resize} from '../data';
export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    const template = document.createElement(`template`);
    template.innerHTML = this.template;
    return template.content;
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

  resizeImages(images) {
    if (!images) {
      throw new Error(`You can't use this method without given images`);
    }
    Array.from(images).forEach((image) => {
      const newImage = new Image();
      newImage.src = image.src;
      newImage.onload = () => {
        const resized = resize(image, newImage);
        image.width = resized.width;
        image.height = resized.height;
      };
    });
  }
}
