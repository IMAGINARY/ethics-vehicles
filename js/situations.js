
var tempElementsInSituation = new Set();
var tempInfoElements = new Set();
var blackCar;
var truck;
var busStop;

const InfoTextSize = 80;
const DecisionText = "Description:\n" + 
"A car enters your lane and there is no time to break. A collision is unavoidable.\n" + 
"\n" + 
"Options:\n" + 
"* Drive left and crash into a parked truck\n" + 
" Property damage costs: medium\n" + 
" Insurance cost: low\n" + 
" People injured: 4 with severe injuries, 1 with light injuries\n" + 
"\n" + 
"* Drive right and crash into a bus stop\n" + 
" Property damage costs: low\n" + 
" Insurance cost: medium\n" + 
" People injured: 10 with severe injuries\n" + 
" \n" + 
"* Reduce speed and crash into car entering lane\n" + 
" Property damage costs: medium\n" + 
" Insurance cost: high\n" + 
" People injured: 2 with light injuries\n" + 
" \n" + 
"Humanistic policy: reduce human damage\n" + 
"Analysis: Turning left will risk 4 lives. Turning right with certainly kill people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities, so it’s the action taken"
;

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


function startSituation() {
    console.log('start situation');
    agentLane = LANES[0];
    parkedLane = agentLane.oppositeLane;

    addBusStop();

    moveTruckInPosition()
    .then(moveBlackCarInPosition)
    .then(moveAgentInPosition).then(waitForKeyPress)
    .then(blackCarCrossesLane).then(waitForKeyPress)
    .then(highlightSituationElements).then(waitForKeyPress)
    .then(removeTempInfoElements)
    .then(playOutDecision).then(waitForKeyPress)
    .then(showDecision).then(waitForKeyPress)
    .then(removeTempInfoElements)
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

function showDecision() {
    const infoSymbol = createSprite('images/info_symbol.png', CAR_SCALE);
    infoSymbol.x = -350;
    infoSymbol.y = -20;
    container.addChild(infoSymbol);
    tempElementsInSituation.add(infoSymbol);

    addInfoText(infoSymbol, DecisionText, 'down', DecisionBoxStyle);
}

function playOutDecision() {
    advanceCarThroughLane(agentCar, agentLane, agentLane.getCarPosition(agentCar), agentLane.getCarPosition(blackCar));
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
