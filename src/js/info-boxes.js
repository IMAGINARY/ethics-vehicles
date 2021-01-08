import { tweenOpacity } from './style-help';

const INFO_BOX_OPACITY = 0.75;

export default class InfoBox {
  constructor(parentElement) {
    this.refElement = document.createElement('div');
    this.refElement.classList.add('ref');
    parentElement.appendChild(this.refElement);

    this.popperElement = document.createElement('div');
    this.popperElement.classList.add('info_element');
    parentElement.appendChild(this.popperElement);

    this.alignmnetElement = document.createElement('div');
    this.alignmnetElement.classList.add('alignment');
    this.popperElement.appendChild(this.alignmnetElement);

    this.nameElement = document.createElement('h3');
    this.nameElement.classList.add('name');
    this.alignmnetElement.appendChild(this.nameElement);

    this.descriptionElement = document.createElement('div');
    this.descriptionElement.classList.add('description');
    this.alignmnetElement.appendChild(this.descriptionElement);

    const popperOptions = { modifiers: { preventOverflow: { enabled: false } } };
    this.popper = new Popper(this.refElement, this.popperElement, popperOptions);
  }

  setName(name) {
    this.nameElement.innerText = name;
    this.popper.update();
  }

  setDescription(description) {
    this.descriptionElement.innerHTML = description;
    this.popper.update();
  }

  setRefRect(domRect) {
    this.refElement.style.left = `${domRect.x}px`;
    this.refElement.style.top = `${domRect.y}px`;
    this.refElement.style.width = `${domRect.width}px`;
    this.refElement.style.height = `${domRect.height}px`;
    this.popper.update();
  }

  setPlacement(placement) {
    this.popper.options.placement = placement;
    this.popper.update();
  }

  setAlignment(alignment) {
    this.alignmnetElement.style.textAlign = alignment;
  }

  setSize(width, height) {
    if (typeof width === 'undefined') {
      this.popperElement.style.maxWidth = 'unset';
    } else {
      this.popperElement.style.maxWidth = `${width}px`;
    }

    if (typeof height === 'undefined') {
      this.popperElement.style.maxHeight = 'unset';
    } else {
      this.popperElement.style.maxHeight = `${height}px`;
    }
  }

  fadeShow(domRect, time) {
    this.setRefRect(domRect);
    return tweenOpacity(this.popperElement, INFO_BOX_OPACITY, time);
  }

  hide(time = 1000) {
    return tweenOpacity(this.popperElement, 0, time);
  }

  static hideAll(time = 1000) {
    InfoBox.Boxes.forEach((box) => box.hide(time));
  }

  static get(index) {
    return InfoBox.Boxes[index];
  }
}

const parentElement = document.querySelector('.info_elements');

InfoBox.Boxes = Array(4)
  .fill(null)
  .map(() => new InfoBox(parentElement));
