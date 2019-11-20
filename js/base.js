
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
}

const DEFAULT_SPEED = 5;
const STREET_X_OFFSET = 228;
const STREET_Y_OFFSET = 318;
const STREET_LANE_OFFSET = 25;
const OFF_SCREEN_LIMIT = 440;

const DRIVE_LEFT = new DriveDirection(270, -DEFAULT_SPEED, 0);
const DRIVE_RIGHT = new DriveDirection(90, DEFAULT_SPEED, 0);
const DRIVE_UP = new DriveDirection(0, 0, -DEFAULT_SPEED);
const DRIVE_DOWN = new DriveDirection(180, 0, DEFAULT_SPEED);

const LANES = [
    createVerticalLane(STREET_X_OFFSET - STREET_LANE_OFFSET, DRIVE_UP),
    createVerticalLane(STREET_X_OFFSET + STREET_LANE_OFFSET, DRIVE_DOWN),

    createVerticalLane(-STREET_X_OFFSET - STREET_LANE_OFFSET, DRIVE_UP),
    createVerticalLane(-STREET_X_OFFSET + STREET_LANE_OFFSET, DRIVE_DOWN),

    createHorizontalLane(STREET_Y_OFFSET + STREET_LANE_OFFSET, DRIVE_LEFT),
    createHorizontalLane(STREET_Y_OFFSET - STREET_LANE_OFFSET, DRIVE_RIGHT),

    createHorizontalLane(-STREET_Y_OFFSET + STREET_LANE_OFFSET, DRIVE_LEFT),
    createHorizontalLane(-STREET_Y_OFFSET - STREET_LANE_OFFSET, DRIVE_RIGHT),
];
function setOppositeLanes(laneA, laneB) {
    laneA.oppositeLane = laneB;
    laneB.oppositeLane = laneA;
}
setOppositeLanes(LANES[0], LANES[1]);
setOppositeLanes(LANES[2], LANES[3]);
setOppositeLanes(LANES[4], LANES[5]);
setOppositeLanes(LANES[6], LANES[7]);

function createHorizontalLane(verticalOffset, driveDirection) {
    dirMultiplier = driveDirection.carSpeed.x > 0 ? -1 : 1;
    return new Lane(new PIXI.Point(OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset), new PIXI.Point(-OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset), driveDirection);
}

function createVerticalLane(horizontalOffset, driveDirection) {
    dirMultiplier = driveDirection.carSpeed.y > 0 ? -1 : 1;
    return new Lane(new PIXI.Point(-horizontalOffset, OFF_SCREEN_LIMIT * dirMultiplier), new PIXI.Point(-horizontalOffset, -OFF_SCREEN_LIMIT * dirMultiplier), driveDirection);
}

let noState = new ExhibitState();
