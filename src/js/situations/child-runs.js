/* globals PIXI */
import SceneElement from '../scene-element';
import Car from '../car';
import Situation from '../situation';
import { VIEW_SIZE, STREET_LANE_OFFSET } from '../constants';
import { LANES } from '../lanes';

export default class ChildRunsSituation extends Situation {
  constructor(view) {
    super(view);

    this.ambulance = new SceneElement(
      this.view,
      'assets/images/ambulance.png',
      new PIXI.Point(0.225 * VIEW_SIZE, -0.05 * VIEW_SIZE)
    );
    this.child = new SceneElement(
      this.view,
      'assets/images/child.png',
      new PIXI.Point(0.18 * VIEW_SIZE, 0)
    );
    this.parkedCar = new Car(
      this.view,
      'assets/images/blue_car.png'
    );

    this.agentLane = LANES[4];
    this.parkedLane = this.agentLane.oppositeLane;
  }

  setup() {
      this.child.show();
  }

  start() {
    return this.moveParkedCarInPosition()
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
        sprite: this.ambulance.sprite,
        color: 0x3220DE,
        text: 'Ambulance carrying a patient to the hospital',
      },
      {
        sprite: this.child.sprite,
        color: 0xDE3220,
        text: 'A child running onto the street',
      },
      {
        sprite: this.parkedCar.sprite,
        color: 0xDE3220,
        text: 'A parked car',
      },
    ];
  }

  getDecisions() {
    return {
      humanist: {
        text: 'both breaking and continuing have a high risk on human lives, so crash onto the car parked on the left.',
        actionFunction: () => this.decisionCrashParkedCar()
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
    return this.view.agentCar.driveInLaneUntilPosition(0.5);
  }

  decisionCrashParkedCar() {
    this.view.agentCar.x -= STREET_LANE_OFFSET;
    this.view.agentCar.y += STREET_LANE_OFFSET;
  }

  getDescription() {
    return 'When reaching a crossing, and with green light in your favor, a child suddenly runs onto the street from behind a parked car. At the same time, an ambulance with lights and siren is coming behind you fast.';
  }

  moveParkedCarInPosition() {
      return new Promise( (resolve, reject) => { resolve('parked')} );
  }

  moveAgentInPosition() {
    return new Promise( (resolve, reject) => { resolve('moved')} );
}

  moveAmbulanceInPosition() {
    return new Promise( (resolve, reject) => { resolve('moved')} );
  }

  childRuns() {
    return new Promise( (resolve, reject) => { resolve('ran')} );
  }
}

Situation.registerSituation('child-runs', ChildRunsSituation);
