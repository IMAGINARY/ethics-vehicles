
var waterPuddle = new SceneElement('images/water_puddle.png',
                        new PIXI.Point(-0.16 * VIEW_SIZE, -0.16 * VIEW_SIZE));
var tree = new SceneElement('images/tree.png',
                        new PIXI.Point(-0.16 * VIEW_SIZE, -0.16 * VIEW_SIZE));


function startTreeFalls(policyId) {
    currentPolicyId = policyId;

    showSceneElements()

    waitForKeyPress()
    .then(hideSceneElements)
    .then(startIdleAnimation);
}

function showSceneElements() {
    tree.show();
    waterPuddle.show();
}

function hideSceneElements() {
    tree.hide();
    waterPuddle.hide();
}
