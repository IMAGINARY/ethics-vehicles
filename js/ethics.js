
function placeCarInLane(car, lane, position = 0.0) {
    car.x = lane.start.x + (lane.end.x - lane.start.x) * position;
    car.y = lane.start.y + (lane.end.y - lane.start.y) * position;
    car.angle = lane.driveDirection.carAngle;
}

function updateCar(car, lane, elapsed) {
    car.x += lane.driveDirection.carSpeed.x * elapsed;
    car.y += lane.driveDirection.carSpeed.y * elapsed;
}

function advanceCarThroughLane(car, lane, startPosition = 0.0, endPosition = 1.0) {
    return new Promise((resolve, reject) => {
        placeCarInLane(car, lane, startPosition);

        let update = () => {
            updateCar(car, lane, app.ticker.deltaTime);
            if (lane.getCarPosition(car) >= endPosition) {
                app.ticker.remove(update);
                resolve( 'arrived' );
            }
        };
        app.ticker.add(update);
    });
}

function doIdleAnimation() {
    currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    return advanceCarThroughLane(agentCar, currentLane);
};

function startIdleAnimation() {
    afterIdleAction = startIdleAnimation;
    doIdleAnimation().then( (value) => afterIdleAction() );
}

function onStartClicked() {
    policy = document.getElementById("option_policy").value;
    situation = document.getElementById("option_situation").value;
    console.log("policy: " + policy + ", situation: " + situation);
    afterIdleAction = startSituation;
}

setupScene();

const agentCar = addCarToScene('images/car.png');

startIdleAnimation();