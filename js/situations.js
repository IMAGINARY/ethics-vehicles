
var tempElementsInScene = new Set();

function endPrototypeSituation(container) {
    console.log("car out of screen during prototype situation");
    app.ticker.remove(carUpdate);

    tempElementsInScene.forEach(element => {
        container.removeChild(element);
    });
    startCarMovement();
}

function startPrototypeSituation(container) {
    app.ticker.remove(carUpdate);

    tempElementsInScene.clear();

    console.log('startPrototypeSituation');
    currentLane = LANES[0]; //    createVerticalLane(STREET_X_OFFSET - STREET_LANE_OFFSET, DRIVE_UP),

    carInLane = createSprite("images/car_black.png", CAR_SCALE);
    placeCarInLane(currentLane.oppositeLane, carInLane, 0);
/*    
    carInLane.x = -STREET_X_OFFSET - STREET_LANE_OFFSET;
    carInLane.y = 0;
    carInLane.angle = DRIVE_DOWN.carAngle;
*/    
    container.addChild(carInLane);

    tempElementsInScene.add(carInLane);

    placeCarInLane(currentLane);
    onCarLeavesScreen = () => { 
        endPrototypeSituation(container);
    };
    app.ticker.add(carUpdate);
}

