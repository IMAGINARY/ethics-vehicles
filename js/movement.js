
function placeCarInLane(car, lane, position = 0.0, forceAngle = true) {
    car.x = lane.start.x + (lane.end.x - lane.start.x) * position;
    car.y = lane.start.y + (lane.end.y - lane.start.y) * position;
    if (forceAngle)
        car.angle = lane.driveDirection.carAngle;
}

function updateCar(car, lane, elapsed) {
    car.x += lane.driveDirection.carSpeed.x * elapsed;
    car.y += lane.driveDirection.carSpeed.y * elapsed;
}

function advanceCarThroughLane(car, lane, startPosition = 0.0, endPosition = 1.0, forceAngle = true) {
    return new Promise((resolve, reject) => {
        placeCarInLane(car, lane, startPosition, forceAngle);

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
