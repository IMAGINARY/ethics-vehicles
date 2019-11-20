
const app = new PIXI.Application({
    width: 800, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.getElementById("game").appendChild(app.view);

const CAR_SCALE = 0.2;
const STREET_SCALE = 0.8;

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

function placeCarInLane(car, lane, position = 0.0) {
    car.x = lane.start.x + (lane.end.x - lane.start.x) * position;
    car.y = lane.start.y + (lane.end.y - lane.start.y) * position;
    console.log("lane start: " + lane.start.x + "," + lane.start.y + ", lane end: " + lane.end.x + "," + lane.end.y);
    console.log("position: " + position);
    console.log("car.x: " + car.x);
    console.log("car.y: " + car.y);
    car.angle = lane.driveDirection.carAngle;
}

function isCarOutOfScreen() {
    return (agentCar.x < -OFF_SCREEN_LIMIT || agentCar.x > OFF_SCREEN_LIMIT || agentCar.y < -OFF_SCREEN_LIMIT || agentCar.y > OFF_SCREEN_LIMIT);
}

function resetCarMovement() {
    currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    placeCarInLane(agentCar, currentLane);
}

function onStartClicked() {
    policy = document.getElementById("option_policy").value;
    situation = document.getElementById("option_situation").value;
    console.log("prepare situation " + situation + " with policy " + policy);
    startSimulation = true;
}

function advanceAgentCar() {
    agentCar.x += currentLane.driveDirection.carSpeed.x * app.ticker.deltaTime;
    agentCar.y += currentLane.driveDirection.carSpeed.y * app.ticker.deltaTime;
}

function advanceCarThroughLane(car, lane, startPosition = 0.0, endPosition = 1.0) {
    return new Promise((resolve, reject) => {
        placeCarInLane(car, lane);

    });
}

function doIdleAnimation() {
    return new Promise((resolve, reject) => {
        currentLane = LANES[Math.floor((Math.random() * LANES.length))];
        placeCarInLane(agentCar, currentLane);

        let update = () => {
            advanceAgentCar();
            if (isCarOutOfScreen()) {
                resolve( startSimulation ? 'simulate' : 'idle' );
                app.ticker.remove(update);
            }
        };
        app.ticker.add(update);
    })
};

function startIdleAnimation() {
    startSimulation = false;
    doIdleAnimation().then( (value) => {
        console.log(value);
        if (value == 'idle')
            startIdleAnimation();
        else
            startSituation();
    });    
}

const container = new PIXI.Container();
app.stage.addChild(container);
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

setupBackground(container);
const agentCar = setupCar(container);

startSimulation = false;

startIdleAnimation();