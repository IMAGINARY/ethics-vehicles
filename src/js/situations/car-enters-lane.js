/* globals PIXI */
import { VIEW_SIZE, STREET_LANE_OFFSET, BORDER_BLOCK_SIZE, SPRITE_WIDTH} from '../constants';
import SceneElement from '../scene-element';
import Situation from '../situation';
import Car from '../car';
import { LANES } from '../lanes';

const BUS_STOP_X = (VIEW_SIZE/2) - BORDER_BLOCK_SIZE + (SPRITE_WIDTH/2);
const BUS_STOP_Y = -0.06 * VIEW_SIZE;

const TRUCK_STOP_POSITION = 0.45;
const BLACK_CAR_STOP_POSITION = 0.38;
const AGENT_STOP_POSITION = 0.45;

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
    this.busStop.show();
  }

  teardown() {
    this.busStop.hide();
  }

  start() {
    return this.moveTruckInPosition()
      .then(() => this.moveBlackCarInPosition())
      .then(() => this.moveAgentInPosition())
      .then(() => this.blackCarCrossesLane());
  }

  getElements() {
    return [
      {
        sprite: this.view.agentCar.sprite,
        color: 0x3220DE,
        text: 'autonomous car\nProperty value: medium',
        placement: 'down',
      },
      {
        sprite: this.blackCar.sprite,
        color: 0xDE3220,
        text: 'car entering lane\nPassengers: 1\nProperty Value: high\nInsurance: yes',
        placement: 'up',
      },
      {
        sprite: this.truck.sprite,
        color: 0xDE3220,
        text: 'parked car\nPassengers: 4\nProperty value: low\nInsurance: none',
        placement: 'left',
      },
      {
        sprite: this.busStop.sprite,
        color: 0xDE3220,
        text: 'bus stop\nPeople: 10\nProperty value: medium',
        placement: 'right',
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
  carCrossLane(car, startingLane) {
    car.placeInLane(startingLane.oppositeLane, 1 - startingLane.getCarPosition(car), false);
  }

  decisionAdvace() {
    return this.view.agentCar.driveInLaneUntilPosition(
      this.agentLane.getCarPosition(this.blackCar)
    );
  }

  decisionTurnLeft() {
    this.carCrossLane(this.view.agentCar, this.agentLane, false);
  }

  decisionTurnRight() {
    this.view.agentCar.x += STREET_LANE_OFFSET * 2;
  }


  moveTruckInPosition() {
    this.addSprite(this.truck.sprite);
    this.truck.placeInLane(this.parkedLane);
    return this.truck.driveInLaneUntilPosition(TRUCK_STOP_POSITION);
  }

  moveBlackCarInPosition() {
    this.addSprite(this.blackCar.sprite);
    this.blackCar.placeInLane(this.parkedLane);
    return this.blackCar.driveInLaneUntilPosition(BLACK_CAR_STOP_POSITION);
  }

  moveAgentInPosition() {
    this.view.agentCar.placeInLane(this.agentLane);
    return this.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION);
  }

  blackCarCrossesLane() {
    return new Promise((resolve) => {
      this.carCrossLane(this.blackCar, this.parkedLane);
      resolve();
    });
  }
}

Situation.registerSituation('car-enters-lane', CarEntersLaneSituation);
