
function startSituation() {
    doApproachAnimation().then( (value) => {
        console.log(value);
    });    
}

function doApproachAnimation() {
    return new Promise((resolve, reject) => {
        setupSituation();

        let update = () => {
            advanceAgentCar();
            if (agentCar.y < 0) {
                resolve( 'agent arrived' );
                app.ticker.remove(update);
                tearDownSituation();
                startIdleAnimation();
            }
        };
        app.ticker.add(update);
    })
};

function setupSituation() {
    tempElementsInScene.clear();

    currentLane = LANES[0];
    
    addTempCarInLane("images/car_black.png", currentLane.oppositeLane, 0.35);
    addTempCarInLane("images/small_truck.png", currentLane.oppositeLane, 0.45);

    placeCarInLane(agentCar, currentLane);
}

function tearDownSituation() {
    tempElementsInScene.forEach(element => {
        container.removeChild(element);
    });
}

var tempElementsInScene = new Set();

function addTempCarInLane(imageFile, lane, position = null) {
    carInLane = createSprite(imageFile, CAR_SCALE);
    placeCarInLane(carInLane, lane, position);
    container.addChild(carInLane);
    tempElementsInScene.add(carInLane);
    return carInLane;
}
