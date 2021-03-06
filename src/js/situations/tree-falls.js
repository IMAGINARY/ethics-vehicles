import SceneElement from '../scene-element';
import Car from '../car';
import Situation from '../situation';
import {
  CAR_SCALE,
  STREET_LANE_OFFSET,
  STREET_WIDTH,
  StreetOffsetFromCenter,
  ViewCenter,
} from '../constants';
import { LANES } from '../lanes';
import { createAnimatedSprite } from '../pixi-help';

const AGENT_LANE = 1;
const CYCLIST_STOP_POSITION = 3 / 8;
const AGENT_STOP_POSITION = 3 / 8;

const SETUP_TIME = 1000;
const TREE_FALL_TIME = 250;
const CRASH_TIME = 250;

export default class TreeFallsSituation extends Situation {
  constructor(view) {
    super(view);

    this.waterPuddle = new SceneElement(
      this.view,
      'assets/images/water_puddle.png',
      new PIXI.Point(-StreetOffsetFromCenter.x - STREET_LANE_OFFSET, -STREET_LANE_OFFSET)
    );
    this.tree = new SceneElement(
      this.view,
      'assets/images/tree.png',
      new PIXI.Point(-StreetOffsetFromCenter.x - STREET_LANE_OFFSET * 3, 0)
    );
    this.cyclist = new Car(
      this.view,
      'assets/images/cyclist.png'
    );
    this.cyclist.sprite = createAnimatedSprite([1, 2,
      3].map((index) => `assets/images/cyclist_${index}.png`), CAR_SCALE);

    this.agentLane = LANES[AGENT_LANE];
    this.bicycleLane = this.agentLane.oppositeLane;
  }

  setup() {
    this.tree.reset();
    this.waterPuddle.reset();
    return this.tree.fadeIn(250)
      .then(() => this.waterPuddle.fadeIn(250));
  }

  start() {
    return Promise.all([this.moveAgentInPosition(), this.moveCyclistInPosition(), this.fellTree()]);
  }

  teardown() {
    this.tree.hide();
    this.waterPuddle.hide();
    this.cyclist.hide();
  }

  getElements() {
    const refRects = {
      agentCar: new DOMRect(
        (ViewCenter.x - StreetOffsetFromCenter.x) - STREET_WIDTH / 2,
        (ViewCenter.y - StreetOffsetFromCenter.y) + STREET_WIDTH / 2,
        STREET_WIDTH / 2,
        STREET_WIDTH / 4
      ),
      cyclist: new DOMRect(
        (ViewCenter.x - StreetOffsetFromCenter.x),
        (ViewCenter.y + StreetOffsetFromCenter.y) - STREET_WIDTH / 2 - STREET_WIDTH / 4,
        STREET_WIDTH / 2,
        STREET_WIDTH / 4
      ),
      tree: new DOMRect(
        (ViewCenter.x - StreetOffsetFromCenter.x) - STREET_WIDTH / 2,
        (ViewCenter.y + StreetOffsetFromCenter.y) - STREET_WIDTH / 2 - STREET_WIDTH / 4,
        STREET_WIDTH / 2,
        STREET_WIDTH / 4
      ),
    };

    return [
      {
        sprite: this.view.agentCar.sprite,
        color: Situation.HighlightAgentColor,
        infoBoxOptions: {
          refRect: refRects.agentCar,
          width: 2 * refRects.agentCar.x + refRects.agentCar.width,
          placement: 'top',
          alignment: 'center',
        },
        ...this._getElementsI18nKeys('AutonomousCar'),
      },
      {
        sprite: this.cyclist.sprite,
        color: Situation.HighlightOthersColor,
        infoBoxOptions: {
          refRect: refRects.cyclist,
          width: StreetOffsetFromCenter.x,
          placement: 'bottom-start',
          alignment: 'left',
        },
        ...this._getElementsI18nKeys('Cyclist'),
      },
      {
        sprite: this.tree.sprite,
        color: Situation.HighlightOthersColor,
        infoBoxOptions: {
          refRect: refRects.tree,
          width: refRects.tree.x + refRects.tree.width,
          placement: 'bottom-end',
          alignment: 'right',
        },
        ...this._getElementsI18nKeys('FallenTree'),
      },
    ];
  }

  getDecisions() {
    return this._buildDecisionsWithActions({
      humanist: () => this.softlyCrashTree(),
      profit: () => this.fullBreak(),
      protector: () => this.crashCyclist(),
    });
  }

  moveCyclistInPosition() {
    this.cyclist.show();
    this.cyclist.placeInLane(this.bicycleLane);
    this.cyclist.sprite.play();
    return this.cyclist.driveInLaneUntilPosition(CYCLIST_STOP_POSITION, SETUP_TIME)
      .then(() => this.cyclist.sprite.stop());
  }

  moveAgentInPosition() {
    this.view.agentCar.show();
    this.view.agentCar.placeInLane(this.agentLane);
    return this.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION, SETUP_TIME);
  }

  fellTree() {
    const toOptions = {
      angle: 90,
      x: this.tree.sprite.x + (STREET_LANE_OFFSET * 1.5),
    };
    return new Promise((resolve) => {
      new TWEEN.Tween(this.tree.sprite)
        .to(toOptions, SETUP_TIME - TREE_FALL_TIME)
        .easing(TWEEN.Easing.Quadratic.In)
        .delay(TREE_FALL_TIME)
        .onComplete(() => resolve('fell'))
        .start();
    });
  }

  crashCyclist() {
    const toOptions = {
      x: this.view.agentCar.x + STREET_LANE_OFFSET * 2,
      y: this.view.agentCar.y + STREET_LANE_OFFSET * 2,
      angle: this.view.agentCar.angle - 45,
    };
    const carMovement = new Promise((resolve) => {
      new TWEEN.Tween(this.view.agentCar)
        .to(toOptions, CRASH_TIME)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => resolve('crash'))
        .start();
    });
    const bicycleMovement = this.cyclist.driveInLaneUntilPosition(0.5, CRASH_TIME);
    return Promise.all([carMovement, bicycleMovement]);
  }

  fullBreak() {
    return this.view.agentCar.driveInLaneUntilPosition(7 / 16, CRASH_TIME);
  }

  softlyCrashTree() {
    const toOptions = {
      x: this.view.agentCar.x - STREET_LANE_OFFSET,
      y: this.view.agentCar.y + STREET_LANE_OFFSET * 2,
      angle: this.view.agentCar.angle + 70,
    };
    return new Promise((resolve) => {
      new TWEEN.Tween(this.view.agentCar)
        .to(toOptions, CRASH_TIME)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => resolve('crash'))
        .start();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _getI18nPrefix() {
    return 'TreeFalls';
  }
}

Situation.registerSituation('tree-falls', TreeFallsSituation);
