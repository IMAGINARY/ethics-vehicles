
function doIdleAnimation() {
    const currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    agentCar.hide();
    agentCar.show();
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
            executeSituation(carEntersLane, policy);
            break;
        case 'tree_falls':
            executeSituation(aTreeFalls, policy);
            break;
        default:
            startIdleAnimation();
    }
}

setupScene();

startIdleAnimation();