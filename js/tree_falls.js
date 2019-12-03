const TREE_STOP_POSITION = 0.45;
const CYCLIST_STOP_POSITION = 0.40;

const waterPuddle = new SceneElement('images/water_puddle.png',
                        new PIXI.Point(0.225 * VIEW_SIZE, -0.05 * VIEW_SIZE));
const tree = new SceneElement('images/tree.png',
                        new PIXI.Point(0.18 * VIEW_SIZE, 0.0 * VIEW_SIZE));
const cyclist = new Car('images/cyclist.png');

function startTreeFalls(policyId) {
    currentPolicyId = policyId;
    agentLane = LANES[3];
    bicycleLane = agentLane.oppositeLane;

    showSceneElements()

    moveCyclistInPosition()
    .then(moveAgentInPosition).then(waitForKeyPress)

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
    cyclist.hide();
}

function moveCyclistInPosition() {
    cyclist.show();
    cyclist.placeInLane(bicycleLane);
    return cyclist.driveInLaneUntilPosition(CYCLIST_STOP_POSITION);
}

function moveAgentInPosition() {
    agentCar.placeInLane(agentLane);
    return agentCar.driveInLaneUntilPosition(TREE_STOP_POSITION);
}
