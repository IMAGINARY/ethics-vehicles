/* eslint-disable class-methods-use-this */
/* globals PIXI */
import { Policies } from './policies';
import { highlightSprite } from './pixi-help';
import Menu from './menu';
import CountdownButton from './countdown-button';
import { Texts } from './texts';
import InfoBox from './info-boxes';

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
      .then(() => this.waitForAdvanceButton(Texts.Next), 3000)
      .then(() => this.report.pullDown())

      .then(() => this.waitForPolicy(situation))
      .then(() => this.report.setPolicy(this.currentPolicy))
      .then(() => this.hideElementsInfo())
      .then(() => this.report.pullUp())
      .then(() => situation.wait(1000))
      
      .then(() => this.playOutDecision())
      .then(() => situation.wait(1000))
      .then(() => this.report.setDecision(this.currentDecision.text))
      .then(() => this.waitForAdvanceButton(Texts.Restart), 15000)

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
      this.policyMenu = new Menu('menu', options, Texts.ChoosePolicy);
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
        this.highlight(element.sprite, element.color);
        return InfoBox.get(index).fadeShow(element, 1000);
       });
    });
   return promise;
  }

  hideElementsInfo() {
    return new Promise((resolve) => {
      this.removeTempElements();
      InfoBox.hideAll();

      resolve('clean');
    });
  }

  playOutDecision() {
    return this.currentDecision.actionFunction();
  }
  
  highlight(sprite, color) {
    this.addTempElement(highlightSprite(sprite, color));
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
