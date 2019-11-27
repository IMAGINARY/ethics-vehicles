const BUS_STOP_X = -0.16 * VIEW_SIZE;
const BUS_STOP_Y = -0.06 * VIEW_SIZE;

const TRUCK_STOP_POSITION = 0.45;
const BLACK_CAR_STOP_POSITION = 0.38;
const AGENT_STOP_POSITION = 0.45;

var tempElementsInSituation = new Set();
var tempInfoElements = new Set();

var blackCar = new Car("images/car_black.png");
var truck = new Car("images/small_truck.png");

var busStop;
var agentLane;
var parkedLane;


var decisionFunction = () => {};
var decisionText = "";

const InfoTextSize = 80;

const InfoBoxStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fill: '#000000',
    wordWrap: true,
    wordWrapWidth: InfoTextSize + 20,
});

const DecisionBoxStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fill: '#000000',
    wordWrap: true,
    wordWrapWidth: 700,
});

const Options = [{
    action: 'attempt to break',
    propertyCosts: 'high',
    injuries: 'low',
    selfDamage: 'high'
}, {
    action: 'turn left',
    propertyCosts: 'low',
    injuries: 'medium',
    selfDamage: 'high'
}, {
    action: 'turn right',
    propertyCosts: 'high',
    injuries: 'high',
    selfDamage: 'low'
}];

function startCarEntersLane(policy) {
    agentLane = LANES[0];
    parkedLane = agentLane.oppositeLane;

    addBusStop();

    moveTruckInPosition()
    .then(moveBlackCarInPosition)
    .then(moveAgentInPosition).then(waitForKeyPress)
    .then(blackCarCrossesLane).then(waitForKeyPress)
    .then(highlightSituationElements).then(waitForKeyPress).then(removeTempInfoElements)

    .then(makeDecision(policy))

    .then(showDecision).then(waitForKeyPress).then(hideDecision)
    .then(playOutDecision).then(waitForKeyPress)
    .then(cleanTempElements)
    .then(startIdleAnimation)
    ;
}

function makeDecision(policy) {
    console.log('make decision ' + policy);
    return new Promise((resolve, reject) => {
        switch (policy) {
            case 'humanist':
                decisionText = "Turning left will risk 4 lives. Turning right with certainly kill people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities, so it’s the action taken";
                decisionFunction = decisionAdvace;
                break;
            case 'profit':
                decisionText = "the car ahead is very expensive, so braking is not recommended. Turning right will risk high payouts to the victims or their families. Solution: turn left towards the parked car, as it is cheap and if the risk of casualties is lower.";
                decisionFunction = decisionTurnLeft;
                break;
            case 'protector':
                break;
        }

        resolve(policy);
    });
}

function moveTruckInPosition() {
    addCarToSituation(truck);
    truck.placeInLane(parkedLane);
    return truck.driveInLaneUntilPosition(TRUCK_STOP_POSITION);
//    return advanceCarThroughLane(truck, parkedLane, 0, TRUCK_STOP_POSITION);
}

function moveBlackCarInPosition(result) {
    addCarToSituation(blackCar);
    blackCar.placeInLane(parkedLane);
    return blackCar.driveInLaneUntilPosition(BLACK_CAR_STOP_POSITION);
//    return advanceCarThroughLane(blackCar, parkedLane, 0, BLACK_CAR_STOP_POSITION);
}

function moveAgentInPosition(result) {
    agentCar.placeInLane(agentLane);
    return agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION);
//    return advanceCarThroughLane(agentCar, agentLane, 0, AGENT_STOP_POSITION);
}

function blackCarCrossesLane() {
    carCrossLane(blackCar, parkedLane);
}

function carCrossLane(car, startingLane) {
    car.placeInLane(startingLane.oppositeLane, 1 - startingLane.getCarPosition(car), false);
//    placeCarInLane(car, startingLane.oppositeLane, 1 - startingLane.getCarPosition(car), forceAngle = false);
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

function playOutDecision() {
    return decisionFunction();
}

function decisionAdvace() {
    return agentCar.driveInLaneUntilPosition(agentLane.getCarPosition(blackCar));
//    return advanceCarThroughLane(agentCar, agentLane, agentLane.getCarPosition(agentCar), agentLane.getCarPosition(blackCar));
}

function decisionTurnLeft() {
    carCrossLane(agentCar, agentLane, forceAngle = false);
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
    tempInfoElements.add(graphics);
    container.addChild(graphics);

    if (text != null)
        addInfoText(sprite, text, placement);
}

function addInfoText(sprite, text, placement = 'right', style = InfoBoxStyle) {
    const infoText = new PIXI.Text(text, style);
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

    tempInfoElements.add(infoText);
    container.addChild(infoText);
}

function addCarToSituation(car) {
    container.addChild(car.sprite);
    tempElementsInSituation.add(car.sprite);
    return car;
}

function addBusStop() {
    busStop = createSprite('images/bus_stop.png', CAR_SCALE);
    busStop.x = BUS_STOP_X;
    busStop.y = BUS_STOP_Y;
    container.addChild(busStop);
    tempElementsInSituation.add(busStop);
}

function showDecision() {
    document.getElementById("report_decision").innerHTML = decisionText;

    return setVisible("report", "visible");
}

function hideDecision() {
    return setVisible("report", "hidden");
}

function setVisible(elementName, visibility = 'visible') {
    return new Promise((resolve, reject) => {
        document.getElementById(elementName).style.visibility = visibility;
        resolve('clean');
    });
}

function removeTempInfoElements() {
    return new Promise((resolve, reject) => {
        tempInfoElements.forEach(element => {
            container.removeChild(element);
        });
        resolve('clean');
    });
}

function cleanTempElements() {
    return new Promise((resolve, reject) => {
        tempElementsInSituation.forEach(element => {
            container.removeChild(element);
        });
        resolve('clean');
    });
}
