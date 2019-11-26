
var tempElementsInSituation = new Set();

function startSituation() {
    console.log('start situation');
    agentLane = LANES[0];
    parkedLane = agentLane.oppositeLane;

    moveTruckInPosition()
    .then(moveBlackCarInPosition)
    .then(moveAgentInPosition)
    .then(waitForKeyPress)
    .then(blackCarCrossesLane)
    .then(waitForKeyPress)
    .then(highlightSituationElements)
//    .then(result => cleanTempElements())
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
    highlightCar(agentCar);
}

function highlightCar(car) {
    console.log("hightlighting car " + car + " @" + car.x + "," + car.y + " - " + car.width + "x" + car.height);
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xDE3280, 0.5);
    graphics.drawRect(car.x - car.width/2, car.y - car.height/2, car.width, car.height);
    graphics.endFill();
    container.addChild(graphics);
}

function addCarToSituation(imageFile) {
    car = addCarToScene(imageFile);
    tempElementsInSituation.add(car);
    return car;
}

function cleanTempElements() {
    console.log('cleanTempElements');
    tempElementsInSituation.forEach(element => {
        container.removeChild(element);
    });
}
