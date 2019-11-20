
var tempElementsInScene = new Set();

function endPrototypeSituation(container) {
    console.log("car out of screen during prototype situation");
    app.ticker.remove(carUpdate);

    tempElementsInScene.forEach(element => {
        container.removeChild(element);
    });
    startCarMovement();
}

function addTempCarInLane(imageFile, lane, position = null) {
    carInLane = createSprite(imageFile, CAR_SCALE);
    placeCarInLane(carInLane, lane, position);
    container.addChild(carInLane);
    tempElementsInScene.add(carInLane);
    return carInLane;
}

function startPrototypeSituation(container) {
    app.ticker.remove(carUpdate);

    tempElementsInScene.clear();

    console.log('startPrototypeSituation');
    currentLane = LANES[0]; //    createVerticalLane(STREET_X_OFFSET - STREET_LANE_OFFSET, DRIVE_UP),

    addTempCarInLane("images/car_black.png", currentLane.oppositeLane, -80);
    addTempCarInLane("images/small_truck.png", currentLane.oppositeLane, -10);

    placeCarInLane(agentCar, currentLane);
    onCarLeavesScreen = () => { 
        endPrototypeSituation(container);
    };
    app.ticker.add(carUpdate);
}

