
const app = new PIXI.Application({
    width: 800, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const CAR_SCALE = 0.25;
const STREET_SCALE = 0.8;
const CAR_START_POSITION = new PIXI.Point(250, 200);

function setupStreet(container) {
    const streetTexture = PIXI.Texture.from('images/street.png');
    const street = new PIXI.Sprite(streetTexture);
    street.scale.x = STREET_SCALE;
    street.scale.y = STREET_SCALE;
    street.anchor.set(0.5);
    container.addChild(street);
}
    
function setupCar(container) {
    const carTexture = PIXI.Texture.from('images/car.png');
    const car = new PIXI.Sprite(carTexture);
    car.x = CAR_START_POSITION.x;
    car.y = CAR_START_POSITION.y;
    car.scale.x = CAR_SCALE;
    car.scale.y = CAR_SCALE;
    car.anchor.set(0.5);
    container.addChild(car);
}

const container = new PIXI.Container();
app.stage.addChild(container);
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

setupStreet(container);
setupCar(container);

