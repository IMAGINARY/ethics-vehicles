const TREE_STOP_POSITION = 0.45;
const CYCLIST_STOP_POSITION = 0.40;

const waterPuddle = new SceneElement('images/water_puddle.png',
                        new PIXI.Point(0.225 * VIEW_SIZE, -0.05 * VIEW_SIZE));
const tree = new SceneElement('images/tree.png',
                        new PIXI.Point(0.18 * VIEW_SIZE, 0.0 * VIEW_SIZE));
const cyclist = new Car('images/cyclist.png');


const aTreeFalls = {
    setup: () => {
        agentLane = LANES[3];
        bicycleLane = agentLane.oppositeLane;
        tree.reset();
        tree.show();
        waterPuddle.reset();
        waterPuddle.show();
    },
    start: () => {
        return moveCyclistInPosition()
                .then(moveAgentInPosition)
                .then(fellTree);
    },
    teardown: () => {
        tree.hide();
        waterPuddle.hide();
        cyclist.hide();
    },
    elements: [
        { sprite: agentCar.sprite, color: 0x3220DE,
            text: 'autonomous car\nProperty value: medium', placement: 'down'},
        { sprite: cyclist.sprite, color: 0xDE3220,
            text: 'A cyclist. Insurance: unknown', placement: 'up'},
        { sprite: tree.sprite, color: 0xDE3220,
            text: 'A tree. It is hard.', placement: 'left' }
    ],
    decisions: {
        'humanist': {
            text : "a sudden break would send the passenger without seatbelt forward through the glass, potentially killing them. Swerving might avoid the collision with the tree, but could also harm the passenger. Solution: turn right and break, crashing into the tree softly, with the passenger without seatbelt protected by the one on its side and by its airbag.",
            actionFunction : () => {
                agentCar.x -= STREET_LANE_OFFSET;
                agentCar.y += STREET_LANE_OFFSET;
            } },
        'profit': {
            text : "Crashing with the tree will cost the insurers money. Swerving might avoid the collision with the tree, but as the floor is wet it could also potentially turn around the car, damaging it. As the car has warned the passenger to wear the seat belt but they have not, any injury will be their own responsibility. Changing lanes would kill the cyclist, but its insurance status is unknown, so its a financial risk. Solution: a sudden break, fully protecting the car and passengers that wear a seat belt.",
            actionFunction : () => {
                agentCar.y += STREET_LANE_OFFSET * 2;
            } },
        'protector': {
            text : "Crashing with the tree or swerving would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.",
            actionFunction : () => {
                agentCar.x += STREET_LANE_OFFSET * 2;
                agentCar.y += STREET_LANE_OFFSET;
            } },
    }
};

function moveCyclistInPosition() {
    cyclist.show();
    cyclist.placeInLane(bicycleLane);
    return cyclist.driveInLaneUntilPosition(CYCLIST_STOP_POSITION);
}

function moveAgentInPosition() {
    agentCar.placeInLane(agentLane);
    return agentCar.driveInLaneUntilPosition(TREE_STOP_POSITION);
}

function fellTree() {
    tree.sprite.x += STREET_LANE_OFFSET * 2;
    tree.sprite.angle = 90;
}
