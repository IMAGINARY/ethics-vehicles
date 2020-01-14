/* globals PIXI */
import Car from './car';
import SceneElement from './scene-element';
import { LANES } from './lanes';
import { VIEW_SIZE, IDLE_ANIMATION_TIME } from './constants';
import { POINT_ZERO } from './pixi-help';

export default class View {
  constructor(element) {
    this.app = new PIXI.Application({
      width: VIEW_SIZE,
      height: VIEW_SIZE,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
    });
    element.appendChild(this.app.view);

    this.container = new PIXI.Container();
    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;

    this.background = new SceneElement(this, 'assets/images/street.png', POINT_ZERO, 1);
    this.debugLayer = new SceneElement(this, 'assets/images/debug.png', POINT_ZERO, 1);
    this.agentCar = new Car(this, 'assets/images/car.png');
    this.background.show();
    this.debugLayer.hide();

    this.afterIdleAction = () => {};
  }

  doIdleAnimation() {
    const currentLane = LANES[Math.floor((Math.random() * LANES.length))];
    this.agentCar.hide();
    this.agentCar.show();
    this.agentCar.placeInLane(currentLane, 0, true);
    return this.agentCar.driveInLaneUntilPosition(1.0, IDLE_ANIMATION_TIME);
  }

  startIdleAnimation() {
    this.afterIdleAction = this.startIdleAnimation;
    this.doIdleAnimation().then(() => this.afterIdleAction());
  }

  queueAction(action) {
    this.afterIdleAction = action;
  }
}
