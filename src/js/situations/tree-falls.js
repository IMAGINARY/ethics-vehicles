/* globals PIXI */
import SceneElement from '../scene-element';
import Car from '../car';
import Situation from '../situation';
import { VIEW_SIZE, STREET_LANE_OFFSET } from '../constants';
import { LANES } from '../lanes';

const TREE_STOP_POSITION = 0.45;
const CYCLIST_STOP_POSITION = 0.40;

export default class TreeFallsSituation extends Situation {
  constructor(view) {
    super(view);

    this.waterPuddle = new SceneElement(
      this.view,
      'assets/images/water_puddle.png',
      new PIXI.Point(0.225 * VIEW_SIZE, -0.05 * VIEW_SIZE)
    );
    this.tree = new SceneElement(
      this.view,
      'assets/images/tree.png',
      new PIXI.Point(0.18 * VIEW_SIZE, 0)
    );
    this.cyclist = new Car(
      this.view,
      'assets/images/cyclist.png'
    );

    this.agentLane = LANES[3];
    this.bicycleLane = this.agentLane.oppositeLane;

    // this.moveCyclistInPosition = this.moveCyclistInPosition.bind(this);
    // this.moveAgentInPosition = this.moveAgentInPosition.bind(this);
    // this.fellTree = this.fellTree.bind(this);
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
        actionFunction: () => {
          this.view.agentCar.x -= STREET_LANE_OFFSET;
          this.view.agentCar.y += STREET_LANE_OFFSET;
        },
      },
      profit: {
        text: 'Crashing with the tree will cost the insurers money. Swerving might avoid the collision with the tree, but as the floor is wet it could also potentially turn around the car, damaging it. As the car has warned the passenger to wear the seat belt but they have not, any injury will be their own responsibility. Changing lanes would kill the cyclist, but its insurance status is unknown, so its a financial risk. Solution: a sudden break, fully protecting the car and passengers that wear a seat belt.',
        actionFunction: () => {
          this.view.agentCar.y += STREET_LANE_OFFSET * 2;
        },
      },
      protector: {
        text: 'Crashing with the tree or swerving would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.',
        actionFunction: () => {
          this.view.agentCar.x += STREET_LANE_OFFSET * 2;
          this.view.agentCar.y += STREET_LANE_OFFSET;
        },
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


  moveAgentInPosition() {
    this.view.agentCar.placeInLane(this.agentLane);
    return this.view.agentCar.driveInLaneUntilPosition(TREE_STOP_POSITION);
  }

  fellTree() {
    this.tree.sprite.x += STREET_LANE_OFFSET * 2;
    this.tree.sprite.angle = 90;
  }
}

Situation.registerSituation('tree-falls', TreeFallsSituation);
