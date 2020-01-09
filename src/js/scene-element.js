import { createSprite, POINT_ZERO } from './pixi-help';
import { CAR_SCALE } from './constants';

export default class SceneElement {
  constructor(view, imageFile, position = POINT_ZERO, scale = CAR_SCALE) {
    this.view = view;
    this.sprite = createSprite(imageFile, scale);
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    this.initialPosition = position;
    this.visible = false;
  }

  show() {
    this.view.container.addChild(this.sprite);
    this.visible = true;
  }

  hide() {
    this.view.container.removeChild(this.sprite);
    this.visible = false;
  }

  reset() {
    this.sprite.x = this.initialPosition.x;
    this.sprite.y = this.initialPosition.y;
    this.sprite.angle = 0;
  }
}
