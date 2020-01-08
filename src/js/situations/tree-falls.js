/* globals PIXI, TWEEN */
import SceneElement from '../scene-element';
import Car from '../car';
import Situation from '../situation';
import { VIEW_SIZE, STREET_LANE_OFFSET } from '../constants';
import { LANES } from '../lanes';
import { screenPosFromFraction } from '../pixi-help';

const AGENT_LANE = 1;
const CYCLIST_STOP_POSITION = 1/2;
const AGENT_STOP_POSITION = 3/8;

export default class TreeFallsSituation extends Situation {
  constructor(view) {
    super(view);

    this.waterPuddle = new SceneElement(
      this.view,
      'assets/images/water_puddle.png',
      screenPosFromFraction(1/8, 3/8 + 1/16)
    );
    this.tree = new SceneElement(
      this.view,
      'assets/images/tree.png',
      screenPosFromFraction(1/16, 0.5)
    );
    this.cyclist = new Car(
      this.view,
      'assets/images/cyclist.png'
    );

    this.agentLane = LANES[AGENT_LANE];
    this.bicycleLane = this.agentLane.oppositeLane;
  }

  setup() {
    this.tree.reset();
    this.tree.show();
    this.waterPuddle.reset();
    this.waterPuddle.show();
  }

  start() {
    return this.moveCyclistInPosition()
      .then(() => this.moveAgentInPosition())
      .then(() => this.fellTree());
  }

  teardown() {
    this.tree.hide();
    this.waterPuddle.hide();
    this.cyclist.hide();
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
        sprite: this.cyclist.sprite,
        color: 0xDE3220,
        text: 'A cyclist. Insurance: unknown',
        placement: 'up',
      },
      {
        sprite: this.tree.sprite,
        color: 0xDE3220,
        text: 'A tree. It is hard.',
        placement: 'left',
      },
    ];
  }

  getDecisions() {
    return {
      humanist: {
        text: 'a sudden break would send the passenger without seatbelt forward through the glass, potentially killing them. Swerving might avoid the collision with the tree, but could also harm the passenger. Solution: turn right and break, crashing into the tree softly, with the passenger without seatbelt protected by the one on its side and by its airbag.',
        actionFunction: () => this.softlyCrashTree()
      },
      profit: {
        text: 'Crashing with the tree will cost the insurers money. Swerving might avoid the collision with the tree, but as the floor is wet it could also potentially turn around the car, damaging it. As the car has warned the passenger to wear the seat belt but they have not, any injury will be their own responsibility. Changing lanes would kill the cyclist, but its insurance status is unknown, so its a financial risk. Solution: a sudden break, fully protecting the car and passengers that wear a seat belt.',
        actionFunction: () => this.fullBreak()
      },
      protector: {
        text: 'Crashing with the tree or swerving would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.',
        actionFunction: () => this.crashCyclist()
      },
    };
  }

  getDescription() {
    return 'a tree falls in front of the car. The person in the front passenger seat has no seat belt. A cyclist is riding through the opposite lane. Options: Sudden break, slow down and turn left, slow down and turn right.';
  }

  moveCyclistInPosition() {
    this.cyclist.show();
    this.cyclist.placeInLane(this.bicycleLane);
    return this.cyclist.driveInLaneUntilPosition(CYCLIST_STOP_POSITION);
  }

  crashCyclist() {
    return new Promise( (resolve) => {
      new TWEEN.Tween(this.view.agentCar)
        .to( { x: this.view.agentCar.x + STREET_LANE_OFFSET * 2,
               y: this.view.agentCar.y + STREET_LANE_OFFSET * 2,
              angle: this.view.agentCar.angle - 45},
            500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete( () => resolve('crash') )
        .start();
    });
  }

  fullBreak() {
    return new Promise( (resolve) => {
      new TWEEN.Tween(this.view.agentCar)
        .to( { y: this.view.agentCar.y + STREET_LANE_OFFSET},
            250)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete( () => resolve('crash') )
        .start();
    });
  }

  softlyCrashTree() {
    return new Promise( (resolve) => {
      new TWEEN.Tween(this.view.agentCar)
        .to( { x: this.view.agentCar.x - STREET_LANE_OFFSET,
               y: this.view.agentCar.y + STREET_LANE_OFFSET*2,
               angle: this.view.agentCar.angle + 70},
            500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete( () => resolve('crash') )
        .start();
    });
  }

  moveAgentInPosition() {
    this.view.agentCar.placeInLane(this.agentLane);
    return this.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION);
  }

  fellTree() {

    return new Promise((resolve) => {
      const anim = { angle: 0, x: this.tree.sprite.x };
      var tween = new TWEEN.Tween(anim)
        .to( { angle: 90, x: this.tree.sprite.x + (STREET_LANE_OFFSET * 1.5)}, 250)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate( () => {
          this.tree.sprite.angle = anim.angle;
          this.tree.sprite.x = anim.x;
        })
        .onComplete( () => {
          resolve('fell');
        })
        .start();
        
    });
  }
}

Situation.registerSituation('tree-falls', TreeFallsSituation);
