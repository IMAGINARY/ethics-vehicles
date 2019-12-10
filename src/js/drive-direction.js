/* globals PIXI */
import { DEFAULT_SPEED } from './constants';

export default class DriveDirection {
  constructor(carAngle, speedX, speedY) {
    this.carAngle = carAngle;
    this.carSpeed = new PIXI.Point(speedX, speedY);
  }

  isVertical() {
    return this.carSpeed.x === 0;
  }

  isHorizontal() {
    return this.carSpeed.y === 0;
  }
}

DriveDirection.LEFT = new DriveDirection(270, -DEFAULT_SPEED, 0);
DriveDirection.RIGHT = new DriveDirection(90, DEFAULT_SPEED, 0);
DriveDirection.UP = new DriveDirection(0, 0, -DEFAULT_SPEED);
DriveDirection.DOWN = new DriveDirection(180, 0, DEFAULT_SPEED);
