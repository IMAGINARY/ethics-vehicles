

function doIdleAnimation() {
    currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    return advanceCarThroughLane(agentCar, currentLane);
};

function startIdleAnimation() {
    afterIdleAction = startIdleAnimation;
    doIdleAnimation().then( (value) => afterIdleAction() );
}

function onStartClicked() {
    policy = document.getElementById("option_policy").value;
    situation = document.getElementById("option_situation").value;
    console.log("policy: " + policy + ", situation: " + situation);
    afterIdleAction = startSituation;
}

setupScene();

const agentCar = addCarToScene('images/car.png');

startIdleAnimation();