
var tempElementsInScene = new Set();

function startSituation() {
    console.log('start situation');
    agentLane = LANES[0];
    parkedLane = agentLane.oppositeLane;

    moveTruckInPosition()
    .then(moveBlackCarInPosition)
    .then(moveAgentInPosition)
/*    
    .then(result => cleanTempElements())
*/    
    ;
}

function moveTruckInPosition() {
    truck = addTempCar("images/small_truck.png");
    return advanceCarThroughLane(truck, parkedLane, 0, 0.45);
}

function moveBlackCarInPosition(result) {
    blackCar = addTempCar("images/car_black.png");
    return advanceCarThroughLane(blackCar, parkedLane, 0, 0.35);
}

function moveAgentInPosition(result) {
    return advanceCarThroughLane(agentCar, agentLane, 0, 0.5);
}

function addTempCar(imageFile) {
    car = createSprite(imageFile, CAR_SCALE);
    container.addChild(car);
    tempElementsInScene.add(car);
    return car;
}

function cleanTempElements() {
    console.log('cleanTempElements');
    tempElementsInScene.forEach(element => {
        container.removeChild(element);
    });
}
