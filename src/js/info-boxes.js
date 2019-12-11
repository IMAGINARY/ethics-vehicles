
export default class InfoBoxes {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.infoElements = Array.from($('.info_element'));
  }

  show(text, index) {
    this.infoElements[index].querySelector("#description").innerText = text;
    this.infoElements[index].style.visibility = 'visible';
  }

  hide(index) {
    this.infoElements[index].style.visibility = 'hidden';
  }

  hideAll() {
    this.infoElements.forEach( (element, index) => this.hide(index) );
  }
}