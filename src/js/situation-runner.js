/* eslint-disable class-methods-use-this */
/* globals PIXI */
import { Policies } from './policies';

export default class SituationRunner {
  constructor(view) {
    this.view = view;
    this.currentDecision = null;
    this.infoElements = [];
  }

  run(situation, policyID) {
    this.currentDecision = situation.getDecisions()[policyID];
    situation.setup();
    situation.start()
      .then(() => this.waitForKeyPress())
      .then(() => this.showElementsInfo(situation.getElements()))
      .then(() => this.waitForKeyPress())
      .then(() => this.hideElementsInfo())

      .then(() => this.showDecision(situation, policyID))
      .then(() => this.waitForKeyPress())
      .then(() => this.hideDecision())

      .then(() => this.playOutDecision())
      .then(() => this.waitForKeyPress())
      .then(() => situation.clearSprites())
      .then(() => situation.teardown())
      .then(() => this.view.startIdleAnimation());
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
    return new Promise((resolve) => {
      elements.forEach((element, index) => {
        this.highlightSprite(element.sprite, element.color);
        this.showInfoElement(element.text, index);
      });
      resolve('highlight');
    });
  }

  hideElementsInfo() {
    return new Promise((resolve) => {
      this.infoElements.forEach((element, index) => {
        this.view.container.removeChild(element);
        this.hideInfoElement(index);
      });
      resolve('clean');
    });
  }

  highlightSprite(sprite, color) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color, 0.5);
    graphics.drawRect(
      sprite.x - sprite.width / 2,
      sprite.y - sprite.height / 2,
      sprite.width,
      sprite.height
    );
    graphics.endFill();
    this.infoElements.push(graphics);
    this.view.container.addChild(graphics);
  }

  showInfoElement(text, elementIndex) {
    const htmlInfoBox = document.getElementById('info_element_' + elementIndex);
    const descriptionElement = htmlInfoBox.querySelector("#description");
    descriptionElement.innerText = text;
    htmlInfoBox.style.visibility = "visible";
  }

  hideInfoElement(elementIndex) {
    const htmlInfoBox = document.getElementById('info_element_' + elementIndex);
    htmlInfoBox.style.visibility = "hidden";
  }

  showDecision(situation, policyID) {
    document.getElementById('report_decision').innerHTML = this.currentDecision.text;
    document.getElementById('report_policy_name').innerHTML = Policies[policyID].name;
    document.getElementById('report_policy_objective').innerHTML = Policies[policyID].objective;
    document.getElementById('report_situation_description').innerHTML = situation.getDescription();
    return this.setVisible('report', 'visible');
  }

  hideDecision() {
    return this.setVisible('report', 'hidden');
  }

  setVisible(elementName, visibility = 'visible') {
    document.getElementById(elementName).style.visibility = visibility;
  }

  playOutDecision() {
    return this.currentDecision.actionFunction();
  }
}