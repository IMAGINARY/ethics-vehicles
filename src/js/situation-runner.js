/* eslint-disable class-methods-use-this */
/* globals PIXI */
import { Policies } from './policies';
import { highlightSprite } from './pixi-help';
import Menu from './menu';
import CountdownButton from './countdown-button';
import { Texts } from './texts';
import InfoBox from './info-boxes';

import { HighlightColor } from './design';

export default class SituationRunner {
  constructor(view, report) {
    this.view = view;
    this.report = report;
    this.currentDecision = null;
    this.tempElements = [];
    this.currentPolicy = null;
    this.policyMenu = null;
  }

  run(situation) {
    this.view.agentCar.hide();
    situation.setup()
      .then(() => situation.start())
      .then(() => situation.wait(1000))
      .then(() => this.showElementsInfo(situation.getElements()))

      .then(() => this.report.setSituation(situation))
      .then(() => this.report.show())
      .then(() => this.waitForAdvanceButton(Texts.Next, 60000))

      .then(() => this.waitForPolicy(situation))
      .then(() => this.report.setPolicy(this.currentPolicy))
      .then(() => situation.wait(1000))
      .then(() => this.hideElementsInfo())
      .then(() => situation.wait(1000))

      .then(() => this.playOutDecision())
      .then(() => situation.wait(1000))
      .then(() => this.report.setDecision(this.currentDecision.text))
      .then(() => this.waitForAdvanceButton(Texts.Restart, 120000))

      .then(() => this.report.hide())
      .then(() => situation.clearSprites())
      .then(() => situation.teardown())
      .then(() => this.view.start());
  }

  waitForPolicy(situation) {

    return new Promise ( resolve => {
      const options = Policies.map ( policy => {
        return {
          text: policy.name + ": " + policy.objective,
          action: () => {
            this.currentPolicy = policy;
            this.currentDecision = situation.getDecision(policy.id);
            this.policyMenu.hide();
            resolve(policy.name);
          }
        };
      });
      this.policyMenu = new Menu('menu', options, Texts.ChoosePolicy, 'bottom_menu');
      this.policyMenu.show();
    });
  }

  waitForAdvanceButton(text = Texts.Next, timeout = 10000) {
    return new Promise ((resolve) => {
      const cb = new CountdownButton(text, resolve);
      cb.setTimeout(timeout);
   });
  }

  waitForKeyPress() {
    return new Promise((resolve) => {
      window.onkeydown = () => {
        window.onkeydown = () => {};
        resolve('keydown');
      };
    });
  }

  showElementsInfo(elements) {
    var promise = new Promise( (r) => r('start fades') );
    elements.forEach((element, index) => {
      promise = promise.then( r => {
        this.highlight(element.sprite);
        return InfoBox.get(index).fadeShow(element, 1000);
       });
    });
   return promise;
  }

  hideElementsInfo(time = 1000) {
    return new Promise((resolve) => {
      this.removeTempElements();
      InfoBox.hideAll(time);
      setTimeout(resolve, time);
    });
  }

  playOutDecision() {
    return this.currentDecision.actionFunction();
  }

  highlight(sprite) {
    this.addTempElement(highlightSprite(sprite, HighlightColor));
  }

  addTempElement(element) {
    this.tempElements.push(element);
    this.view.container.addChild(element);
  }

  removeTempElements() {
    this.tempElements.forEach((element) => {
      this.view.container.removeChild(element);
    });
    this.tempElements = [];
  }
}
