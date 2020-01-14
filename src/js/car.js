import { CAR_SCALE } from './constants';
import { createSprite } from './pixi-help';
import { NO_LANE } from './lane';

export default class Car {
  constructor(view, imageFile, lane = NO_LANE) {
    this.view = view;
    this.sprite = createSprite(imageFile, CAR_SCALE, 0.5);
    this.sprite.zIndex = 100;
    this.lane = lane;
  }

  get x() {
    return this.sprite.x;
  }

  set x(x) {
    this.sprite.x = x;
  }

  get y() {
    return this.sprite.y;
  }

  set y(y) {
    this.sprite.y = y;
  }

  get angle() {
    return this.sprite.angle;
  }

  set angle(angle) {
    this.sprite.angle = angle;
  }

  placeInLane(lane, position = 0.0, forceDirection = true) {
    this.lane = lane;
    this.x = lane.start.x + (lane.end.x - lane.start.x) * position;
    this.y = lane.start.y + (lane.end.y - lane.start.y) * position;
    if (forceDirection) {
      this.forceLaneDirection();
    }
  }

  forceLaneDirection() {
    this.sprite.angle = this.lane.getDrivingAngle();
  }

  driveInLaneUntilPosition(endPosition = 1.0, time = 500) {
    const stopPosition = this.lane.getPositionCoordinates(endPosition);
    return new Promise( (resolve) => {
      new TWEEN.Tween(this.sprite)
      .to( { x: stopPosition.x,
             y: stopPosition.y},
          time)
      .easing(TWEEN.Easing.Linear.None)
      .onComplete( () => resolve('arrived') )
      .start();
    });
  }

  crossLane() {
    this.placeInLane(this.lane.oppositeLane, 1 - this.lane.getCarPosition(this), false);
  }

  show() {
    this.view.container.addChild(this.sprite);
  }

  hide() {
    this.view.container.removeChild(this.sprite);
  }
}
