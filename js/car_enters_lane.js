const BUS_STOP_X = -0.16 * VIEW_SIZE;
const BUS_STOP_Y = -0.06 * VIEW_SIZE;

const TRUCK_STOP_POSITION = 0.45;
const BLACK_CAR_STOP_POSITION = 0.38;
const AGENT_STOP_POSITION = 0.45;

var blackCar = new Car("images/car_black.png");
var truck = new Car("images/small_truck.png");
var busStop = new SceneElement('images/bus_stop.png', new PIXI.Point(BUS_STOP_X, BUS_STOP_Y));

var agentLane;
var parkedLane;

const carEntersLane = {
    setup: () => {
        agentLane = LANES[0];
        parkedLane = agentLane.oppositeLane;
        busStop.show();
    },
    start: () => {
        return moveTruckInPosition()
                .then(moveBlackCarInPosition)
                .then(moveAgentInPosition)
                .then(blackCarCrossesLane);
    },
    elements: [
        { sprite: agentCar.sprite, color: 0x3220DE,
            text: 'autonomous car\nProperty value: medium', placement: 'down'},
        { sprite: blackCar.sprite, color: 0xDE3220,
            text: 'car entering lane\nPassengers: 1\nProperty Value: high\nInsurance: yes', placement: 'up'},
        { sprite: truck.sprite, color: 0xDE3220,
            text: 'parked car\nPassengers: 4\nProperty value: low\nInsurance: none', placement: 'left' },
        { sprite: busStop.sprite, color: 0xDE3220,
            text: 'bus stop\nPeople: 10\nProperty value: medium', placement: 'right' }
    ],
    decisions: {
        'humanist': {
            text : "Turning left will risk 4 lives. Turning right with certainly kill people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities, so it’s the action taken",
            actionFunction : decisionAdvace },
        'profit': {
            text : "the car ahead is very expensive, so braking is not recommended. Turning right will risk high payouts to the victims or their families. Solution: turn left towards the parked car, as it is cheap and if the risk of casualties is lower.",
            actionFunction : decisionTurnLeft },
        'protector': {
            text : "breaking and turning left mean crashing into heavy, hard objects and potentially harming you. Solution: turning right has almost no risk for you and your car, as people are softer than cars.",
            actionFunction : decisionTurnRight }
    }
};

function startCarEntersLane(policyId) {
    executeSituation(carEntersLane, policyId);
}

function moveTruckInPosition() {
    addCarToSituation(truck);
    truck.placeInLane(parkedLane);
    return truck.driveInLaneUntilPosition(TRUCK_STOP_POSITION);
}

function moveBlackCarInPosition(result) {
    addCarToSituation(blackCar);
    blackCar.placeInLane(parkedLane);
    return blackCar.driveInLaneUntilPosition(BLACK_CAR_STOP_POSITION);
}

function moveAgentInPosition(result) {
    agentCar.placeInLane(agentLane);
    return agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION);
}

function blackCarCrossesLane() {
    return new Promise( (resolve, reject) => {
        carCrossLane(blackCar, parkedLane);
        resolve();
    });
}

// TODO: move to car
function carCrossLane(car, startingLane) {
    car.placeInLane(startingLane.oppositeLane, 1 - startingLane.getCarPosition(car), false);
}

function decisionAdvace() {
    return agentCar.driveInLaneUntilPosition(agentLane.getCarPosition(blackCar));
}

function decisionTurnLeft() {
    carCrossLane(agentCar, agentLane, forceAngle = false);
}

function decisionTurnRight() {
    agentCar.x += STREET_LANE_OFFSET * 2;
}
