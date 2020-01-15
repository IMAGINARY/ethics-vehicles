/* globals PIXI */
import DriveDirection from './drive-direction';
import { POINT_ZERO, vectorBetweenPoints } from './pixi-help';

PIXI.Point.Lerp = function (start, end, k) {
  return new PIXI.Point(start.x + k * (end.x - start.x),
                        start.y + k * (end.y - start.y));
}

export class Lane {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.oppositeLane = null;
  }

  isVertical() {
    return this.start.x == this.end.x;
  }

  isHorizontal() {
    return this.start.y == this.end.y;
  }

  getDrivingAngle() {
    return vectorBetweenPoints(this.start, this.end);
  }

  getPositionCoordinates(position) {
    return PIXI.Point.Lerp(this.start, this.end, position);
  }

  getCarPosition(car) {
    if (this.isVertical()) {
      return (car.y - this.start.y) / (this.end.y - this.start.y);
    }
    return (car.x - this.start.x) / (this.end.x - this.start.x);
  }
}

export const NO_LANE = new Lane(POINT_ZERO, new PIXI.Point(1, 0), DriveDirection.RIGHT);
