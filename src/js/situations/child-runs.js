/* globals PIXI */
import SceneElement from '../scene-element';
import Car from '../car';
import Situation from '../situation';
import { LANES } from '../lanes';
import { screenPosFromFraction, moveToFraction } from '../pixi-help';

const AGENT_LANE = 4;
const CROSSING_CAR_POSITION = 1/4;
const AGENT_CAR_POSITION = 1/2 + 1/8;
const AMBULANCE_POSITION = 1/2 + 1/32;
const childStartPos = screenPosFromFraction(1/4 + 1/32, 1/16);

export default class ChildRunsSituation extends Situation {
  constructor(view) {
    super(view);
    this.agentLane = LANES[AGENT_LANE];
    this.oppositeLane = this.agentLane.oppositeLane;

    this.child = new SceneElement(this.view, 'assets/images/child.png', childStartPos);
    this.crossingCar = new Car(this.view, 'assets/images/blue_car.png');
    this.ambulance = new Car(this.view, 'assets/images/ambulance.png');
  }

  setup() {
      return this.child.show();
  }

  start() {
    return this.moveCrossingCarInPosition()
      .then(() => this.moveAgentInPosition())
      .then(() => this.moveAmbulanceInPosition())
      .then(() => this.childRuns());
  }

  teardown() {
    this.child.hide();
  }

  getElements() {
    return [
      {
        sprite: this.view.agentCar.sprite,
        color: 0x3220DE,
        name: 'Autonomous car',
        description: 'About to cross the intersection with green light.',
      },
      {
        sprite: this.ambulance.sprite,
        color: 0xDE3220,
        name: 'Ambulance',
        description: 'Carrying a patient to the hospital',
      },
      {
        sprite: this.child.sprite,
        color: 0xDE3220,
        name: 'Child',
        description: 'Suddenly runs in the street',
      },
      {
        sprite: this.crossingCar.sprite,
        color: 0xDE3220,
        name: 'A Car',
        description: 'Probably will not stop',
      },
    ];
  }

  getDecisions() {
    return {
      humanist: {
        text: 'both breaking and continuing have a high risk on human lives, so crash onto the car parked on the left.',
        actionFunction: () => this.decisionCrashCrossingCar()
      },
      profit: {
        text: 'the child appeared out of nowhere and you had a green light, so you are protected by the law. Breaking or turning left will incur in higher car damage and costs.',
        actionFunction: () => this.decisionAdvance()
      },
      protector: {
        text: 'breaking or turning left will damage the car and potentially hurt you, continuing will only produce minor aesthetical damage in the car.',
        actionFunction: () => this.decisionAdvance()
      },
    };
  }

  decisionAdvance() {
    return this.view.agentCar.driveInLaneUntilPosition(0.75);
  }

  decisionCrashCrossingCar() {
    this.view.agentCar.crossLane();
  }

  getDescription() {
    return 'When reaching a crossing and having a green light, a child suddenly runs onto the street from behind a parked car. At the same time, an ambulance with lights and siren is coming behind you fast.';
  }

  moveCrossingCarInPosition() {
    this.addSprite(this.crossingCar.sprite);
    this.crossingCar.placeInLane(this.oppositeLane);
    return this.crossingCar.driveInLaneUntilPosition(CROSSING_CAR_POSITION);
  }

  moveAgentInPosition() {
    this.view.agentCar.placeInLane(this.agentLane);
    return this.view.agentCar.driveInLaneUntilPosition(AGENT_CAR_POSITION);
}

  moveAmbulanceInPosition() {
    this.addSprite(this.ambulance.sprite);
    this.ambulance.placeInLane(this.agentLane);
    return this.ambulance.driveInLaneUntilPosition(AMBULANCE_POSITION);
  }

  childRuns() {
    return new Promise( (resolve, reject) => {
      moveToFraction(this.child.sprite, 9/32, 1/8);
      resolve('ran');
    });
  }
}

Situation.registerSituation('child-runs', ChildRunsSituation);
