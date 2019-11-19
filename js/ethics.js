
const app = new PIXI.Application({
    width: 800, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

const streetTexture = PIXI.Texture.from('images/street.png');
const street = new PIXI.Sprite(streetTexture);
street.anchor.set(0.5);
street.scale.x = 0.8;
street.scale.y = 0.8;

container.addChild(street);

const carTexture = PIXI.Texture.from('images/car.png');
const car = new PIXI.Sprite(carTexture);
car.x = 250;
car.y = 200;
car.scale.x = 0.25;
car.scale.y = 0.25;
car.anchor.set(0.5);
container.addChild(car);

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
