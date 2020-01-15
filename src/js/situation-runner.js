/* eslint-disable class-methods-use-this */
/* globals PIXI */
import { Policies } from './policies';
import { highlightSprite } from './pixi-help';

export default class SituationRunner {
  constructor(view, report, infoBoxes) {
    this.view = view;
    this.report = report;
    this.infoBoxes = infoBoxes;
    this.currentDecision = null;
    this.tempElements = [];
  }

  run(situation, policyID) {
    this.currentDecision = situation.getDecisions()[policyID];
    this.view.agentCar.hide();
    situation.setup()
      .then(() => this.view.agentCar.show())
      .then(() => situation.start())
      .then(() => this.wait(1000))
      .then(() => this.showElementsInfo(situation.getElements()))
      .then(() => this.waitForAdvanceButton('Analyze'))
      .then(() => this.hideElementsInfo())

      .then(() => this.showDecision(situation, policyID))
      .then(() => this.wait(1000))
      .then(() => this.waitForAdvanceButton('Show'))
      .then(() => this.hideDecision())

      .then(() => this.playOutDecision())
      .then(() => this.wait(1000))
      .then(() => this.waitForAdvanceButton('Restart'))
      .then(() => situation.clearSprites())
      .then(() => situation.teardown())
      .then(() => this.view.startIdleAnimation());
  }

  wait(time = 1000) {
    return new Promise( resolve => setTimeout(resolve, time) );
  }

  waitForAdvanceButton(text = 'Next') {
    return new Promise ((resolve) => {
      $('#advanceText').text(text);

      const button = $('#advanceButton');
      button.show();
      button.on('click', () => {
        button.hide();
        resolve('clicked');
      })
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
        return this.infoBoxes.fadeShow(index, element.text, 1000);
       });
    });
   return promise;
  }

  hideElementsInfo() {
    return new Promise((resolve) => {
      this.removeTempElements();
      this.infoBoxes.hideAll();

      resolve('clean');
    });
  }

  showDecision(situation, policyID) {
    return this.report.show(situation, Policies[policyID], this.currentDecision.text);
  }

  hideDecision() {
    return this.report.hide();
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
