
function advanceCarThroughLane(car, lane, startPosition = 0.0, endPosition = 1.0, forceAngle = true) {
    return new Promise((resolve, reject) => {
        placeCarInLane(car, lane, startPosition, forceAngle);

        let update = () => {
            car.update(app.ticker.deltaTime);
            if (lane.getCarPosition(car) >= endPosition) {
                app.ticker.remove(update);
                resolve( 'arrived' );
            }
        };
        app.ticker.add(update);
    });
}
