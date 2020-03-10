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
    this.htmlElement.style.visibility = 'visible';
  }

  fadeShow(element, time) {
    this.show(element);
    return tweenOpacity(this.htmlElement, INFO_BOX_OPACITY, time);
  }

  hide() {
    this.htmlElement.style.visibility = 'hidden';
  }

  static hideAll() {
    InfoBox.Boxes.forEach( box => box.hide() );
  }
  static get(index) {
    return InfoBox.Boxes[index];
  }
}

InfoBox.Boxes = $(".info_element").get().map( html => new InfoBox(html) );