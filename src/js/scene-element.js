/* globals TWEEN */
import { createSprite, pixiFadeIn, POINT_ZERO } from './pixi-help';
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

  fadeIn(time) {
    this.show();
    this.sprite.alpha = 0;
    return pixiFadeIn(this.sprite, 1, time);
  }

  show() {
    return new Promise( resolve => {
      this.view.container.addChild(this.sprite);
      this.visible = true;
      resolve();
    });
  }

  hide() {
    return new Promise( resolve => {
      this.view.container.removeChild(this.sprite);
      this.visible = false;
    resolve();
  });
}

  reset() {
    this.sprite.x = this.initialPosition.x;
    this.sprite.y = this.initialPosition.y;
    this.sprite.angle = 0;
  }
}
