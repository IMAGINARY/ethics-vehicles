
class Car {
    constructor(imageFile, lane = NO_LANE) {
        this.sprite = createSprite(imageFile, CAR_SCALE, 0.5);
        this.currentLane = lane;
        this.driveDirection = lane.driveDirection;
    }

    get x() { return this.sprite.x; }
    set x(x) { this.sprite.x = x; }
    get y() { return this.sprite.y; }
    set y(y) { this.sprite.y = y; }

    update(elapsed) {
        this.x += this.driveDirection.carSpeed.x * elapsed;
        this.y += this.driveDirection.carSpeed.y * elapsed;
    }
    
    placeInLane(lane, position = 0.0, forceDirection = true) {
        this.lane = lane;
        this.x = lane.start.x + (lane.end.x - lane.start.x) * position;
        this.y = lane.start.y + (lane.end.y - lane.start.y) * position;
        if (forceDirection)
            this.forceLaneDirection();
    }

    forceLaneDirection() {
        this.driveDirection = this.lane.driveDirection;
        this.sprite.angle = this.lane.driveDirection.carAngle;
    }

    driveInLaneUntilPosition(endPosition = 1.0) {
        // force driving direction, or it might never stop
        this.forceLaneDirection();

        return new Promise((resolve, reject) => {
            let update = () => {
                if (this.lane.getCarPosition(this) >= endPosition) {
                    app.ticker.remove(update);
                    resolve( 'arrived' );
                }
                this.update(app.ticker.deltaTime);
            };
            app.ticker.add(update);
        });
    }

    turnAround() {
        this.driveDirection = new DriveDirection(
            360 - this.driveDirection.carAngle,
            -this.driveDirection.speedX,
            -this.driveDirection.speedY);
    }
}