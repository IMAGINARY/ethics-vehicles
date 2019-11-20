
const app = new PIXI.Application({
    width: 800, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.getElementById("game").appendChild(app.view);

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

const DEFAULT_SPEED = 5;
const OFF_SCREEN_LIMIT = 440;
const STREET_X_OFFSET = 228;
const STREET_Y_OFFSET = 318;
const STREET_LANE_OFFSET = 25;
const DRIVE_LEFT = new DriveDirection(270, -DEFAULT_SPEED, 0);
const DRIVE_RIGHT = new DriveDirection(90, DEFAULT_SPEED, 0);
const DRIVE_UP = new DriveDirection(0, 0, -DEFAULT_SPEED);
const DRIVE_DOWN = new DriveDirection(180, 0, DEFAULT_SPEED);

const CAR_SCALE = 0.2;
const STREET_SCALE = 0.8;

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
    return new Lane(new PIXI.Point(-horizontalOffset, OFF_SCREEN_LIMIT * dirMultiplier), new PIXI.Point(horizontalOffset, -OFF_SCREEN_LIMIT * dirMultiplier), driveDirection);
}

function createSprite(sourceImage, scale, anchor = 0.5) {
    const texture = PIXI.Texture.from(sourceImage);
    const sprite = new PIXI.Sprite(texture);
    sprite.scale.x = scale;
    sprite.scale.y = scale;
    sprite.anchor.set(anchor);
    return sprite;
}

function setupBackground(container) {
    const background = createSprite('images/street.png', STREET_SCALE);
    container.addChild(background);
}

function setupCar(container) {
    const car = createSprite('images/car.png', CAR_SCALE);
    container.addChild(car);
    return car;
}

function placeCarInLane(lane, car = agentCar, position = null) {
    car.x = lane.start.x;
    car.y = lane.start.y;

    if (position != null) {
        if (lane.isHorizontal())
            car.x = position;
        else
            car.y = position;

    }
    car.angle = lane.driveDirection.carAngle;
}

function isCarOutOfScreen() {
    return (agentCar.x < -OFF_SCREEN_LIMIT || agentCar.x > OFF_SCREEN_LIMIT || agentCar.y < -OFF_SCREEN_LIMIT || agentCar.y > OFF_SCREEN_LIMIT);
}

function carUpdate() {
    agentCar.x += currentLane.driveDirection.carSpeed.x * app.ticker.deltaTime;
    agentCar.y += currentLane.driveDirection.carSpeed.y * app.ticker.deltaTime;
    if (isCarOutOfScreen())
        onCarLeavesScreen();
}

function resetCarMovement() {
    currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    placeCarInLane(currentLane);
}

function startCarMovement() {
    app.ticker.remove(carUpdate);
    resetCarMovement();
    onCarLeavesScreen = resetCarMovement;
    app.ticker.add(carUpdate);
}

function startSimulation() {
    policy = document.getElementById("option_policy").value;
    situation = document.getElementById("option_situation").value;
    console.log("prepare situation " + situation + " with policy " + policy);

    // Start the simulation only when the idling car leaves the screen
    onCarLeavesScreen = () => { simulate(policy, situation); }
}

function simulate(policy, situation) {
    console.log("starting simulation of " + situation + " with policy " + policy);

    if (policy == 'humanistic' && situation == 'car_enters_lane') {
        startPrototypeSituation(container);
    }
}

const container = new PIXI.Container();
app.stage.addChild(container);
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

setupBackground(container);
const agentCar = setupCar(container);

startCarMovement();
