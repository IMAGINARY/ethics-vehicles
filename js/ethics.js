
const app = new PIXI.Application({
    width: 800, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

class Street {
    constructor(start, end, carAngle, carSpeed) {
        this.start = start;
        this.end = end;
        this.carAngle = carAngle;
        this.carSpeed = carSpeed;
    }
}

const DEFAULT_SPEED = 5;

const STREETS = [
    new Street(new PIXI.Point(400, -340), new PIXI.Point(-400, -340), 270, new PIXI.Point(-DEFAULT_SPEED, 0)),
    new Street(new PIXI.Point(-253, -400), new PIXI.Point(-253, 400), 180, new PIXI.Point(0, DEFAULT_SPEED))
];

const CAR_SCALE = 0.2;
const STREET_SCALE = 0.8;

function setupBackground(container) {
    const backgroundTexture = PIXI.Texture.from('images/street.png');
    const background = new PIXI.Sprite(backgroundTexture);
    background.scale.x = STREET_SCALE;
    background.scale.y = STREET_SCALE;
    background.anchor.set(0.5);
    container.addChild(background);
}

function setupCar(container) {
    const carTexture = PIXI.Texture.from('images/car.png');
    const car = new PIXI.Sprite(carTexture);
    car.anchor.set(0.5);
    car.scale.x = CAR_SCALE;
    car.scale.y = CAR_SCALE;
    car.angle = 90;
    container.addChild(car);
    return car;
}

function setCarInStreet(street) {
    car.x = street.start.x;
    car.y = street.start.y;
    car.angle = street.carAngle;
}

function isCarOutOfScreen() {
    return (car.x < -400 || car.x > 400 || car.y < -400 || car.y > 400);
}

function carUpdate() {
    car.x += currentStreet.carSpeed.x * app.ticker.deltaTime;
    car.y += currentStreet.carSpeed.y * app.ticker.deltaTime;
    if (isCarOutOfScreen()) {
        resetCarMovement();
    }
}

function resetCarMovement() {
    index = Math.floor((Math.random() * STREETS.length)); 
    currentStreet = STREETS[index];
    setCarInStreet(currentStreet);
}

function startCarMovement() {
    resetCarMovement();
    app.ticker.add(carUpdate);
}

const container = new PIXI.Container();
app.stage.addChild(container);
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

setupBackground(container);
const car = setupCar(container);

startCarMovement();
