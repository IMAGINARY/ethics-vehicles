
function setupBackground() {
    const background = createSprite('images/street.png', GLOBAL_SCALE);
    container.addChild(background);
}

function addCarToScene(imageFile) {
    car = createSprite(imageFile, CAR_SCALE);
    container.addChild(car);
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
    setupBackground();
}