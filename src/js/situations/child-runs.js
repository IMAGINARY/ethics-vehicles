import SceneElement from '../scene-element';
import Car from '../car';
import Situation from '../situation';
import { LANES } from '../lanes';
import { createAnimatedSprite, pixiMoveTo, screenPosFromFraction } from '../pixi-help';
import { CAR_SCALE, STREET_LANE_OFFSET } from '../constants';
import InfoPos from '../info-positions';

const AGENT_LANE = 4;
const CROSSING_CAR_POSITION = 1 / 4 + 1 / 32;
const AGENT_CAR_POSITION = 1 / 2 + 1 / 8;
const AMBULANCE_POSITION = 1 / 2 + 1 / 16;
const childStartPos = screenPosFromFraction(1 / 4 + 1 / 32, 1 / 16);
const childEndPos = screenPosFromFraction(9 / 32, 1 / 8);

const SETUP_TIME = 1500;
const CROSSING_CAR_DELAY = 1000;
const AMBULANCE_DELAY = 400;
const CHILD_DELAY = 1000;
const CRASH_TIME = 250;

export default class ChildRunsSituation extends Situation {
  constructor(view) {
    super(view);
    this.agentLane = LANES[AGENT_LANE];
    this.oppositeLane = this.agentLane.oppositeLane;

    this.child = new SceneElement(this.view, 'assets/images/child.png', childStartPos);
    this.child.setSprite(createAnimatedSprite([1, 2,
      3].map((index) => `assets/images/child_sprite_${index}.png`), CAR_SCALE));
    this.crossingCar = new Car(this.view, 'assets/images/blue_car.png');
    this.ambulance = new Car(this.view, 'assets/images/ambulance.png');
  }

  setup() {
    return this.child.show();
  }

  start() {
    return Promise.all([
      this.moveAgentInPosition(),
      this.moveCrossingCarInPosition(),
      this.moveAmbulanceInPosition(),
      this.childRuns(),
    ]);
  }

  teardown() {
    this.child.hide();
  }

  getElements() {
    return [
      {
        sprite: this.view.agentCar.sprite,
        color: Situation.HighlightAgentColor,
        infopos: InfoPos.TopRight.left()
          .left(),
        ...this._getElementsI18nKeys('AutonomousCar'),
      },
      {
        sprite: this.ambulance.sprite,
        color: Situation.HighlightOthersColor,
        infopos: InfoPos.TopRight.left(),
        ...this._getElementsI18nKeys('Ambulance'),
      },
      {
        sprite: this.child.sprite,
        color: Situation.HighlightOthersColor,
        infopos: InfoPos.TopLeft,
        ...this._getElementsI18nKeys('Child'),
      },
      {
        sprite: this.crossingCar.sprite,
        color: Situation.HighlightOthersColor,
        infopos: InfoPos.TopLeft.down(),
        ...this._getElementsI18nKeys('OtherCar'),
      },
    ];
  }

  getDecisions() {
    return this._buildDecisionsWithActions({
      humanist: () => this.decisionCrashCrossingCar(),
      profit: () => this.decisionAdvance(),
      protector: () => this.decisionAdvance(),
    });
  }

  decisionAdvance() {
    return this.view.agentCar.driveInLaneUntilPosition(0.75, CRASH_TIME);
  }

  decisionCrashCrossingCar() {
    const toOptions = {
      x: this.view.agentCar.x - STREET_LANE_OFFSET,
      y: this.view.agentCar.y + STREET_LANE_OFFSET * 1.5,
      angle: this.view.agentCar.angle - 60,
    };
    const carMovement = new Promise((resolve) => {
      new TWEEN.Tween(this.view.agentCar)
        .to(toOptions, CRASH_TIME)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => resolve('crash'))
        .start();
    });
    const endPosition = 1 / 4 + 1 / 16;
    const crossingCarMovement = this.crossingCar.driveInLaneUntilPosition(endPosition, CRASH_TIME);
    return Promise.all([carMovement, crossingCarMovement]);
  }

  moveAgentInPosition() {
    this.view.agentCar.show();
    this.view.agentCar.placeInLane(this.agentLane);
    return this.view.agentCar.driveInLaneUntilPosition(AGENT_CAR_POSITION, SETUP_TIME);
  }

  moveCrossingCarInPosition() {
    return this.wait(CROSSING_CAR_DELAY)
      .then(
        () => {
          this.addSprite(this.crossingCar.sprite);
          this.crossingCar.placeInLane(this.oppositeLane);
          return this.crossingCar.driveInLaneUntilPosition(CROSSING_CAR_POSITION,
            SETUP_TIME - CROSSING_CAR_DELAY);
        }
      );
  }

  moveAmbulanceInPosition() {
    return this.wait(AMBULANCE_DELAY)
      .then(
        () => {
          this.addSprite(this.ambulance.sprite);
          this.ambulance.placeInLane(this.agentLane);
          return this.ambulance.driveInLaneUntilPosition(AMBULANCE_POSITION,
            SETUP_TIME - AMBULANCE_DELAY);
        }
      );
  }

  childRuns() {
    this.child.sprite.loop = true;
    return this.wait(CHILD_DELAY)
      .then(() => this.child.sprite.play())
      .then(() => pixiMoveTo(this.child.sprite, childEndPos, SETUP_TIME - CHILD_DELAY))
      .then(() => this.child.sprite.stop());
  }


  // eslint-disable-next-line class-methods-use-this
  _getI18nPrefix() {
    return 'ChildRuns';
  }
}

Situation.registerSituation('child-runs', ChildRunsSituation);
