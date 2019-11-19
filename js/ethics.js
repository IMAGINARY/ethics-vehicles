
const app = new PIXI.Application({
    width: 800, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.getElementById("game").appendChild(app.view);

class Lane {
    constructor(start, end, driveDirection) {
        this.start = start;
        this.end = end;
        this.driveDirection = driveDirection;
    }
}

class DriveDirection {
    constructor(carAngle, speedX, speedY) {
        this.carAngle = carAngle;
        this.carSpeed = new PIXI.Point(speedX, speedY);
    }
}

const DEFAULT_SPEED = 3;
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

function createHorizontalLane(verticalOffset, driveDirection) {
    dirMultiplier = driveDirection.carSpeed.x > 0 ? -1 : 1;
    return new Lane(new PIXI.Point(OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset), new PIXI.Point(-OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset), driveDirection);
}

function createVerticalLane(horizontalOffset, driveDirection) {
    dirMultiplier = driveDirection.carSpeed.y > 0 ? -1 : 1;
    return new Lane(new PIXI.Point(-horizontalOffset, OFF_SCREEN_LIMIT * dirMultiplier), new PIXI.Point(horizontalOffset, -OFF_SCREEN_LIMIT * dirMultiplier), driveDirection);
}

function setupBackground(container) {
    const backgroundTexture = PIXI.Texture.from('images/street.png');
    const background = new PIXI.Sprite(backgroundTexture);
    background.scale.x = STREET_SCALE;
    background.scale.y = STREET_SCALE;
    background.anchor.set(0.5);
    container.addChild(background);
}

function setupCar(container) {
    const carTexture = PIXI.Texture.from('images/car.png');
    const car = new PIXI.Sprite(carTexture);
    car.anchor.set(0.5);
    car.scale.x = CAR_SCALE;
    car.scale.y = CAR_SCALE;
    car.angle = 90;
    container.addChild(car);
    return car;
}

function setCarInLane(lane) {
    car.x = lane.start.x;
    car.y = lane.start.y;
    car.angle = lane.driveDirection.carAngle;
}

function isCarOutOfScreen() {
    return (car.x < -OFF_SCREEN_LIMIT || car.x > OFF_SCREEN_LIMIT || car.y < -OFF_SCREEN_LIMIT || car.y > OFF_SCREEN_LIMIT);
}

function carUpdate() {
    car.x += currentLane.driveDirection.carSpeed.x * app.ticker.deltaTime;
    car.y += currentLane.driveDirection.carSpeed.y * app.ticker.deltaTime;
    if (isCarOutOfScreen())
        onCarLeavesScreen();
}

function resetCarMovement() {
    currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    setCarInLane(currentLane);
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
    app.ticker.remove(carUpdate);
    console.log("starting simulation of " + situation + " with policy " + policy);
    setTimeout(startCarMovement, 4000);
}

const container = new PIXI.Container();
app.stage.addChild(container);
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

setupBackground(container);
const car = setupCar(container);

startCarMovement();
