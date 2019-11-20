
var tempElementsInSituation = new Set();

function startSituation() {
    console.log('start situation');
    agentLane = LANES[0];
    parkedLane = agentLane.oppositeLane;

    moveTruckInPosition()
    .then(moveBlackCarInPosition)
    .then(moveAgentInPosition)
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
