
class DriveDirection {
    constructor(carAngle, speedX, speedY) {
        this.carAngle = carAngle;
        this.carSpeed = new PIXI.Point(speedX, speedY);
    }
    isVertical() {
        return this.carSpeed.x == 0;
    }
    isHorizontal() {
        return this.carSpeed.y == 0;
    }
}

const DRIVE_LEFT = new DriveDirection(270, -DEFAULT_SPEED, 0);
const DRIVE_RIGHT = new DriveDirection(90, DEFAULT_SPEED, 0);
const DRIVE_UP = new DriveDirection(0, 0, -DEFAULT_SPEED);
const DRIVE_DOWN = new DriveDirection(180, 0, DEFAULT_SPEED);

class Lane {
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
        if (this.isVertical())
            return (car.y - this.start.y) / (this.end.y - this.start.y);
        else
            return (car.x - this.start.x) / (this.end.x - this.start.x);
    }
}
