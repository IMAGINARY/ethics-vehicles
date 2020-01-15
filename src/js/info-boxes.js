/* globals PIXI, TWEEN */
import { tweenOpacity } from './style-help';

const INFO_BOX_OPACITY = 0.75;

export default class InfoBoxes {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.infoElements = Array.from($('.info_element'));
  }

  show(index, text) {
    this.infoElements[index].querySelector("#description").innerText = text;
    this.infoElements[index].style.visibility = 'visible';
  }

  fadeShow(index, text, time) {
    this.show(index, text);
    var infoElement = this.infoElements[index];
    infoElement.style.opacity = 0;
    return tweenOpacity(infoElement, INFO_BOX_OPACITY, time);
  }

  hide(index) {
    this.infoElements[index].style.visibility = 'hidden';
  }

  hideAll() {
    this.infoElements.forEach( (element, index) => this.hide(index) );
  }
}