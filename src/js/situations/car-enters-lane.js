/* globals PIXI */
import { VIEW_SIZE, STREET_LANE_OFFSET, BORDER_BLOCK_SIZE, SPRITE_WIDTH} from '../constants';
import SceneElement from '../scene-element';
import Situation from '../situation';
import Car from '../car';
import { LANES } from '../lanes';

const BUS_STOP_X = (VIEW_SIZE/2) - BORDER_BLOCK_SIZE + (SPRITE_WIDTH/2);
const BUS_STOP_Y = -0.06 * VIEW_SIZE;

const TRUCK_STOP_POSITION = 0.45;
const BLACK_CAR_STOP_POSITION = 0.35;
const AGENT_STOP_POSITION = 0.45;

const BLACK_CAR_CROSS_POSITION = new PIXI.Point(STREET_LANE_OFFSET * 2, STREET_LANE_OFFSET * 2);

/*
Timeline:
0 - 1000: truck enters and parks
1000 - 1500: black car enters and stops behind truck
1500 - 2500: agent enters and reaches position
2250 - 2500: black car crosses lane
*/

const SETUP_TIME = 1500;
const ENTER_TRUCK_TIME = 1000;
const AGENT_ENTER_DELAY = 500;
const BLACK_CAR_ENTRY_TIME = 500;
const BLACK_CAR_PARKED_DELAY = 750;
const BLACK_CAR_CROSS_TIME = 250;


export default class CarEntersLaneSituation extends Situation {
  constructor(view) {
    super(view);
    this.agentLane = LANES[2];
    this.parkedLane = this.agentLane.oppositeLane;

    this.blackCar = new Car(view, 'assets/images/car_black.png');
    this.truck = new Car(view, 'assets/images/small_truck.png');
    this.busStop = new SceneElement(view, 'assets/images/bus_stop.png', new PIXI.Point(BUS_STOP_X, BUS_STOP_Y));
  }

  setup() {
    return this.busStop.fadeIn(500);
  }

  teardown() {
    this.busStop.hide();
  }

  start() {
    this.view.agentCar.hide();
    return this.moveTruckInPosition().then(
      () => Promise.all([this.moveBlackCarInPosition(),
                         this.moveAgentInPosition()]));
  }

  getElements() {
    return [
      {
        sprite: this.view.agentCar.sprite,
        color: 0x3220DE,
        name: 'Autonomous car',
        description: 'Property value: medium',
      },
      {
        sprite: this.blackCar.sprite,
        color: 0xDE3220,
        name: 'Luxury car',
        description: 'Suddenly enters your lane.<br>Property Value: high<br>Insurance: yes',
      },
      {
        sprite: this.truck.sprite,
        color: 0xDE3220,
        name: 'Parked car',
        description: 'Passengers: 4<br>Property value: low<br>Insurance: none',
      },
      {
        sprite: this.busStop.sprite,
        color: 0xDE3220,
        name: 'Bus Stop',
        description: 'People: 10<br>Property value: medium',
      },
    ];
  }

  getDecisions() {
    return {
      humanist: {
        text: 'Turning left will risk 4 lives. Turning right with certainly kill people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities, so it’s the action taken',
        actionFunction: () => this.decisionAdvace(),
      },
      profit: {
        text: 'the car ahead is very expensive, so braking is not recommended. Turning right will risk high payouts to the victims or their families. Solution: turn left towards the parked car, as it is cheap and if the risk of casualties is lower.',
        actionFunction: () => this.decisionTurnLeft(),
      },
      protector: {
        text: 'breaking and turning left mean crashing into heavy, hard objects and potentially harming you. Solution: turning right has almost no risk for you and your car, as people are softer than cars.',
        actionFunction: () => this.decisionTurnRight(),
      },
    };
  }

  getDescription() {
    return 'A car enters your lane and there is no time to break. The car can either crash against it, turn left and crash against a parked car, or turn right and drive over a bus stop full of people';
  }

  // eslint-disable-next-line class-methods-use-this
  decisionAdvace() {
    return this.view.agentCar.driveInLaneUntilPosition(
      this.agentLane.getCarPosition(this.blackCar)
    );
  }

  decisionTurnLeft() {
    this.view.agentCar.crossLane();
  }

  decisionTurnRight() {
    this.view.agentCar.x += STREET_LANE_OFFSET * 2;
  }

  moveTruckInPosition() {
    this.addSprite(this.truck.sprite);
    this.truck.placeInLane(this.parkedLane);
    return this.truck.driveInLaneUntilPosition(TRUCK_STOP_POSITION, ENTER_TRUCK_TIME, TWEEN.Easing.Cubic.Out);
  }

  moveBlackCarInPosition() {
    this.addSprite(this.blackCar.sprite);
    this.blackCar.placeInLane(this.parkedLane);
    return this.blackCar.driveInLaneUntilPosition(BLACK_CAR_STOP_POSITION, BLACK_CAR_ENTRY_TIME, TWEEN.Easing.Sinusoidal.Out)
      .then( () => this.wait(BLACK_CAR_PARKED_DELAY))
      .then( () => this.blackCar.advanceAndTurn(BLACK_CAR_CROSS_POSITION, -30, BLACK_CAR_CROSS_TIME, TWEEN.Easing.Quadratic.InOut));
  }

  moveAgentInPosition() {
    return this.wait(AGENT_ENTER_DELAY)
            .then( () => {
              this.view.agentCar.show();
              this.view.agentCar.placeInLane(this.agentLane);
              this.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION, SETUP_TIME - AGENT_ENTER_DELAY);
            });
  }

  blackCarCrossesLane() {
    return new Promise((resolve) => {
      this.blackCar.crossLane();
      resolve();
    });
  }
}

Situation.registerSituation('car-enters-lane', CarEntersLaneSituation);
