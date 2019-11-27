
function doIdleAnimation() {
    const currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    agentCar.placeInLane(currentLane, 0, true);
    return agentCar.driveInLaneUntilPosition(1.0);
}

function startIdleAnimation() {
    afterIdleAction = startIdleAnimation;
    doIdleAnimation().then((value) => afterIdleAction());
}

function onStartClicked() {
    const policy = document.getElementById("option_policy").value;
    const situation = document.getElementById("option_situation").value;
    afterIdleAction = () => { startSituation(situation, policy);} ;
}

function startSituation(situation, policy) {
    switch (situation) {
        case 'car_enters_lane':
            startCarEntersLane(policy);
            break;
        case 'tree_falls':
            startTreeFalls(policy);
            break;
        default:
            startIdleAnimation();
    }
}

setupScene();

const agentCar = addCarToScene('images/car.png');

startIdleAnimation();