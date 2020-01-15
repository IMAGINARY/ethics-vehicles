
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
    var infoElement = this.infoElements[index];
    infoElement.querySelector("#description").innerText = text;
    infoElement.style.visibility = 'visible';
    infoElement.style.opacity = 0;
    return new Promise ((resolve) => {
      new TWEEN.Tween(infoElement.style)
        .to( { opacity: 0.75 }, time)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete( () => resolve('visible') )
        .start();
    });
  }

  hide(index) {
    this.infoElements[index].style.visibility = 'hidden';
  }

  hideAll() {
    this.infoElements.forEach( (element, index) => this.hide(index) );
  }
}