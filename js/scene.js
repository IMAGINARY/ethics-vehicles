
class SceneElement {
    constructor(imageFile, position, scale = CAR_SCALE) {
        this.sprite = createSprite(imageFile, scale);
        this.sprite.x = position.x;
        this.sprite.y = position.y;
    }
    show() {
        container.addChild(this.sprite);
    }
    hide() {
        container.removeChild(this.sprite);
    }
}

const background = new SceneElement('images/street.png', POINT_ZERO, scale = GLOBAL_SCALE);

function addCarToScene(imageFile) {
    const car = new Car(imageFile);
    container.addChild(car.sprite);
    return car;
}

function createSprite(sourceImage, scale, anchor = 0.5) {
    const texture = PIXI.Texture.from(sourceImage);
    const sprite = new PIXI.Sprite(texture);
    sprite.scale.x = scale;
    sprite.scale.y = scale;
    sprite.anchor.set(anchor);
    return sprite;
}

const app = new PIXI.Application({
    width: VIEW_SIZE, height: VIEW_SIZE, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
});
document.getElementById("game").appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

function setupScene() {
    background.show();
}