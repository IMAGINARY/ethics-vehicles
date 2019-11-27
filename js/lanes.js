
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
    return new Lane(new PIXI.Point(OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset),
                    new PIXI.Point(-OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset),
                    driveDirection);
}

function createVerticalLane(horizontalOffset, driveDirection) {
    dirMultiplier = driveDirection.carSpeed.y > 0 ? -1 : 1;
    return new Lane(new PIXI.Point(-horizontalOffset, OFF_SCREEN_LIMIT * dirMultiplier),
                    new PIXI.Point(-horizontalOffset, -OFF_SCREEN_LIMIT * dirMultiplier),
                    driveDirection);
}