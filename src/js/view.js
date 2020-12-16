import Car from './car';
import SceneElement from './scene-element';
import { LANES } from './lanes';
import { IDLE_ANIMATION_TIME, ViewSize } from './constants';
import { POINT_ZERO } from './pixi-help';
import Report from './report';
import './info-boxes';

import Situation from './situation';
import SituationRunner from './situation-runner';
import Menu from './menu';
import LanguageButton from './language-button';

export default class View {
  constructor(element, i18next, config) {
    this.app = new PIXI.Application({
      width: ViewSize.width,
      height: ViewSize.height,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
    });
    element.appendChild(this.app.view);

    this.i18next = i18next;
    this.config = config;

    this.container = new PIXI.Container();
    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;

    this.background = new SceneElement(this, 'assets/images/street.png', POINT_ZERO, 1);
    this.agentCar = new Car(this, 'assets/images/car.png');
    this.background.show();

    this.afterIdleAction = () => {
    };

    const tf = (...args) => () => this.i18next.t(...args);
    const buildMenuOption = (key, situationId) => ({
      label: tf(key),
      action: () => this.startSituation(situationId),
    });
    const menuOptions = [
      buildMenuOption('TreeFalls.name', 'tree-falls'),
      buildMenuOption('CarEntersLane.name', 'car-enters-lane'),
      buildMenuOption('ChildRuns.name', 'child-runs'),
    ];
    this.SituationMenu = new Menu('menu', menuOptions, () => tf('ChooseSituation'), 'top_menu');
    this.languageButton = new LanguageButton(this.i18next, this.config);
    this.i18next.on('languageChanged', () => this.SituationMenu.refreshTexts());

    this.runner = new SituationRunner(this, new Report($('#report')[0]));

    this.app.ticker.add(() => TWEEN.update());
  }

  spriteToScreenPos(sprite) {
    return {
      x: sprite.x + this.app.screen.width / 2,
      y: sprite.y + this.app.screen.height / 2,
    };
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
    this.doIdleAnimation()
      .then(() => this.afterIdleAction());
  }

  start() {
    this.SituationMenu.show();
    this.startIdleAnimation();
  }

  startSituation(situationID) {
    this.SituationMenu.hide();
    this.queueAction(() => {
      const situationInstance = Situation.getSituation(situationID, this);
      this.runner.run(situationInstance);
    });
  }

  queueAction(action) {
    this.afterIdleAction = action;
  }
}
