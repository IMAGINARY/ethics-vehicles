/* globals PIXI */
import { ViewSize, STREET_LANE_OFFSET, BorderBlockSize, SPRITE_WIDTH} from '../constants';
import SceneElement from '../scene-element';
import Situation from '../situation';
import Car from '../car';
import { LANES } from '../lanes';
import { Texts } from '../texts';
import InfoPos from '../info-positions';

const BUS_STOP_X = (ViewSize.width/2) - BorderBlockSize.width + (SPRITE_WIDTH/2);
const BUS_STOP_Y = -0.06 * ViewSize.height;

const TRUCK_STOP_POSITION = 0.45;
const BLACK_CAR_STOP_POSITION = 0.35;
const AGENT_STOP_POSITION = 0.45;

const BlackCarCrossVector = new PIXI.Point(STREET_LANE_OFFSET, STREET_LANE_OFFSET);

const BlackCarCrashVector = new PIXI.Point(0, 40);
const AgentCrashVector = new PIXI.Point(0, -40);
const TurnLeftVector = new PIXI.Point(-STREET_LANE_OFFSET * 1.5, -STREET_LANE_OFFSET * 1.5);
const TurnRightVector = new PIXI.Point(STREET_LANE_OFFSET * 1.5, -STREET_LANE_OFFSET * 1.5);

/*
Timeline:
0 - 1000: truck enters and parks
1000 - 1500: black car enters and stops behind truck
1500 - 2500: agent enters and reaches position
2250 - 2500: black car crosses lane
*/

const SETUP_TIME = 1500;
const ENTER_TRUCK_TIME = 1000;
const AGENT_ENTER_DELAY = 700;
const BLACK_CAR_ENTRY_TIME = 500;
const BLACK_CAR_PARKED_DELAY = 500;
const BLACK_CAR_CROSS_TIME = 500;


export default class CarEntersLaneSituation extends Situation {
  constructor(view) {
    super(view);
    this.agentLane = LANES[2];
    this.parkedLane = this.agentLane.oppositeLane;

    this.blackCar = new Car(view, 'assets/images/car_black.png');
    this.truck = new Car(view, 'assets/images/small_truck.png');
    this.busStop = new SceneElement(view, 'assets/images/bus_stop.png', new PIXI.Point(BUS_STOP_X, BUS_STOP_Y));
    this.Texts = Texts.CarEntersLane;
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
        color: Situation.HighlightOthersColor,
        infopos: InfoPos.BottomRight,
        ...this.Texts.AutonomousCar,
      },
      {
        sprite: this.blackCar.sprite,
        color: Situation.HighlightOthersColor,
        infopos: InfoPos.TopRight,
        ...this.Texts.LuxuryCar,
      },
      {
        sprite: this.truck.sprite,
        color: Situation.HighlightOthersColor,
        infopos: InfoPos.TopRight.left(),
        ...this.Texts.Truck,
      },
      {
        sprite: this.busStop.sprite,
        color: Situation.HighlightOthersColor,
        infopos: InfoPos.TopRight.right(),
        ...this.Texts.BusStop
      },
    ];
  }

  getDecisions() {
    return {
      'humanist': {
        text: this.Texts.Humanist,
        actionFunction: () => this.decisionAdvace(),
      },
      'profit': {
        text: this.Texts.Profit,
        actionFunction: () => this.decisionTurnLeft(),
      },
      'protector': {
        text: this.Texts.Protector,
        actionFunction: () => this.decisionTurnRight(),
      },
    };
  }

  getDescription() {
    return this.Texts.description;
  }

  // eslint-disable-next-line class-methods-use-this
  decisionAdvace() {
    return Promise.all([this.blackCar.advanceAndTurn(BlackCarCrashVector, 0, 150),
                        this.view.agentCar.advanceAndTurn(AgentCrashVector, 0, 150)]);
  }

  decisionTurnLeft() {
    return Promise.all([this.moveBlackCarToFinalPosition(),
                        this.view.agentCar.advanceAndTurn(TurnLeftVector, -30, 250)]);
  }

  decisionTurnRight() {
    return Promise.all([this.moveBlackCarToFinalPosition(),
                        this.view.agentCar.advanceAndTurn(TurnRightVector, 30, 250)]);
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
      .then( () => this.blackCar.advanceAndTurn(BlackCarCrossVector, -45, BLACK_CAR_CROSS_TIME/2, TWEEN.Easing.Quadratic.In))
      .then( () => this.blackCar.advanceAndTurn(BlackCarCrossVector, 45, BLACK_CAR_CROSS_TIME/2, TWEEN.Easing.Quadratic.Out));
  }

  moveBlackCarToFinalPosition() {
    return this.blackCar.advanceAndTurn(new PIXI.Point(0, STREET_LANE_OFFSET * 2), 0, 250, TWEEN.Easing.Linear.None);
  }

  moveAgentInPosition() {
    return this.wait(AGENT_ENTER_DELAY)
            .then( () => {
              this.view.agentCar.show();
              this.view.agentCar.placeInLane(this.agentLane);
              this.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION, SETUP_TIME - AGENT_ENTER_DELAY);
            });
  }
}

Situation.registerSituation('car-enters-lane', CarEntersLaneSituation);
