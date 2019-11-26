
var tempElementsInSituation = new Set();
var blackCar;
var truck;
var busStop;

function startSituation() {
    console.log('start situation');
    agentLane = LANES[0];
    parkedLane = agentLane.oppositeLane;

    addBusStop();

    moveTruckInPosition()
    .then(moveBlackCarInPosition)
    .then(moveAgentInPosition)
    .then(waitForKeyPress)
    .then(blackCarCrossesLane)
    .then(waitForKeyPress)
    .then(highlightSituationElements)
    .then(waitForKeyPress)
    .then(cleanTempElements)
    .then(startIdleAnimation)
    ;
}

function moveTruckInPosition() {
    truck = addCarToSituation("images/small_truck.png");
    return advanceCarThroughLane(truck, parkedLane, 0, 0.45);
}

function moveBlackCarInPosition(result) {
    blackCar = addCarToSituation("images/car_black.png");
    return advanceCarThroughLane(blackCar, parkedLane, 0, 0.35);
}

function moveAgentInPosition(result) {
    return advanceCarThroughLane(agentCar, agentLane, 0, 0.5);
}

function blackCarCrossesLane() {
    placeCarInLane(blackCar, agentLane, 1 - parkedLane.getCarPosition(blackCar));
    blackCar.angle = agentLane.oppositeLane.driveDirection.carAngle;
}

function waitForKeyPress() {
    return new Promise((resolve, reject) => {
        window.onkeydown = function() {
            console.log("keydown");
            resolve("keydown");
            window.onkeydown = function() {}
        }
    });
}

function highlightSituationElements() {
    highlightSprite(agentCar, 0x3220DE);
    highlightSprite(blackCar, 0xDE3220);
    highlightSprite(truck, 0xDE3220);
    highlightSprite(busStop, 0xDEDE20);
}

function highlightSprite(car, color) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color, 0.5);
    graphics.drawRect(car.x - car.width/2, car.y - car.height/2, car.width, car.height);
    graphics.endFill();
    tempElementsInSituation.add(graphics);
    container.addChild(graphics);
}

function addCarToSituation(imageFile) {
    car = addCarToScene(imageFile);
    tempElementsInSituation.add(car);
    return car;
}

function addBusStop() {
    busStop = createSprite('images/bus_stop.png', CAR_SCALE);
    busStop.x = -150;
    busStop.y = -50;
    container.addChild(busStop);
    tempElementsInSituation.add(busStop);
}

function cleanTempElements() {
    return new Promise((resolve, reject) => {
        tempElementsInSituation.forEach(element => {
            container.removeChild(element);
        });
        resolve('clean');
    });
}
