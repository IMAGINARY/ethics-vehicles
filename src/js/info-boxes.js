import { setLeftTopCSSFromCoord, tweenOpacity } from './style-help';

const INFO_BOX_OPACITY = 0.75;

export default class InfoBox {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }

  setName(name) {
    this.htmlElement.querySelector('#name').innerText = name;
  }

  setDescription(description) {
    this.htmlElement.querySelector('#description').innerHTML = description;
  }

  show(pos) {
    setLeftTopCSSFromCoord(this.htmlElement, pos);
  }

  fadeShow(pos, time) {
    this.show(pos);
    return tweenOpacity(this.htmlElement, INFO_BOX_OPACITY, time);
  }

  hide(time = 1000) {
    return tweenOpacity(this.htmlElement, 0, time);
  }

  static hideAll(time = 1000) {
    InfoBox.Boxes.forEach((box) => box.hide(time));
  }

  static get(index) {
    return InfoBox.Boxes[index];
  }
}

InfoBox.Boxes = $('.info_element')
  .get()
  .map((html) => new InfoBox(html));
