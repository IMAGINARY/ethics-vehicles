/* globals PIXI */
import DriveDirection from './drive-direction';
import { POINT_ZERO } from './pixi-help';

export class Lane {
  constructor(start, end, driveDirection) {
    this.start = start;
    this.end = end;
    this.driveDirection = driveDirection;
    this.oppositeLane = null;
  }

  isVertical() {
    return this.driveDirection.isVertical();
  }

  isHorizontal() {
    return this.driveDirection.isHorizontal();
  }

  getCarPosition(car) {
    if (this.isVertical()) {
      return (car.y - this.start.y) / (this.end.y - this.start.y);
    }
    return (car.x - this.start.x) / (this.end.x - this.start.x);
  }
}

export const NO_LANE = new Lane(POINT_ZERO, new PIXI.Point(1, 0), DriveDirection.RIGHT);
