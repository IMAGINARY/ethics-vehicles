
var tempElementsInSituation = new Set();
var blackCar;
var truck;
var busStop;

const InfoTextSize = 80;

const infoTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fill: '#000000',
    wordWrap: true,
    wordWrapWidth: InfoTextSize + 20,
});

function startSituation() {
    console.log('start situation');
    agentLane = LANES[0];
    parkedLane = agentLane.oppositeLane;

    addBusStop();

    moveTruckInPosition()
    .then(moveBlackCarInPosition)
    .then(moveAgentInPosition)
    .then(waitForKeyPress)
    .then(blackCarCrossesLane)
    .then(waitForKeyPress)
    .then(highlightSituationElements)
    .then(waitForKeyPress)
    .then(cleanTempElements)
    .then(startIdleAnimation)
    ;
}

function moveTruckInPosition() {
    truck = addCarToSituation("images/small_truck.png");
    return advanceCarThroughLane(truck, parkedLane, 0, 0.45);
}

function moveBlackCarInPosition(result) {
    blackCar = addCarToSituation("images/car_black.png");
    return advanceCarThroughLane(blackCar, parkedLane, 0, 0.35);
}

function moveAgentInPosition(result) {
    return advanceCarThroughLane(agentCar, agentLane, 0, 0.5);
}

function blackCarCrossesLane() {
    placeCarInLane(blackCar, agentLane, 1 - parkedLane.getCarPosition(blackCar));
    blackCar.angle = agentLane.oppositeLane.driveDirection.carAngle;
}

function waitForKeyPress() {
    return new Promise((resolve, reject) => {
        window.onkeydown = function() {
            console.log("keydown");
            resolve("keydown");
            window.onkeydown = function() {}
        }
    });
}

function highlightSituationElements() {
    highlightSprite(agentCar, 0x3220DE, 'autonomous car\nProperty value: medium', 'down');
    highlightSprite(blackCar, 0xDE3220, 'car entering lane\nPassengers: 1\nProperty Value: high\nInsurance: yes', 'up');
    highlightSprite(truck, 0xDE3220, 'parked car\nPassengers: 4\nProperty value: low\nInsurance: none', 'left');
    highlightSprite(busStop, 0xDEDE20, 'bus stop\nPeople: 10\nProperty value: medium', 'right');
}

function highlightSprite(sprite, color, text = null, placement = 'right') {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color, 0.5);
    graphics.drawRect(sprite.x - sprite.width/2, sprite.y - sprite.height/2, sprite.width, sprite.height);
    graphics.endFill();
    tempElementsInSituation.add(graphics);
    container.addChild(graphics);

    if (text != null)
        addInfoText(sprite, text, placement);
}

function addInfoText(sprite, text, placement = 'right') {
    const infoText = new PIXI.Text(text, infoTextStyle);
    infoText.x = sprite.x - sprite.width/2;
    infoText.y = sprite.y - sprite.height/2;

    switch (placement) {
        case 'right':
            infoText.x += sprite.width;
            break;
        case 'left':
            infoText.x -= sprite.width + InfoTextSize;
            break;
        case 'up':
            infoText.y -= sprite.height + InfoTextSize;
            break;
        case 'down':
            infoText.y += sprite.height;
            break;
    }

    tempElementsInSituation.add(infoText);
    container.addChild(infoText);
}

function addCarToSituation(imageFile) {
    car = addCarToScene(imageFile);
    tempElementsInSituation.add(car);
    return car;
}

function addBusStop() {
    busStop = createSprite('images/bus_stop.png', CAR_SCALE);
    busStop.x = -150;
    busStop.y = -50;
    container.addChild(busStop);
    tempElementsInSituation.add(busStop);
}

function cleanTempElements() {
    return new Promise((resolve, reject) => {
        tempElementsInSituation.forEach(element => {
            container.removeChild(element);
        });
        resolve('clean');
    });
}
