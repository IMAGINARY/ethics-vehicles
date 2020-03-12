/* globals PIXI, TWEEN */
import { tweenOpacity, setLeftTopCSSFromCoord } from './style-help';

const INFO_BOX_OPACITY = 0.75;

export default class InfoBox {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }

  show(element) {
    this.htmlElement.querySelector('#name').innerText = element.name;
    this.htmlElement.querySelector('#description').innerHTML = element.description;
    setLeftTopCSSFromCoord(this.htmlElement, element.infopos);
  }

  fadeShow(element, time) {
    this.show(element);
    return tweenOpacity(this.htmlElement, INFO_BOX_OPACITY, time);
  }

  hide(time = 1000) {
    return tweenOpacity(this.htmlElement, 0, time);
  }

  static hideAll(time = 1000) {
    InfoBox.Boxes.forEach( box => box.hide(time) );
  }
  static get(index) {
    return InfoBox.Boxes[index];
  }
}

InfoBox.Boxes = $(".info_element").get().map( html => new InfoBox(html) );
