/* eslint-disable class-methods-use-this */
/* globals PIXI */
import { Policies } from './policies';
const Handlebars = require("handlebars");

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
      .then(() => this.highlight(situation.getElements()))
      .then(() => this.waitForKeyPress())
      .then(() => this.removeHighligts())
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

  highlight(elements) {
    return new Promise((resolve) => {
      elements.forEach((element) => {
        this.highlightSprite(element.sprite, element.color, element.text, element.placement);
      });
      resolve('highlight');
    });
  }

  removeHighligts() {
    return new Promise((resolve) => {
      this.infoElements.forEach((element) => {
        this.view.container.removeChild(element);
      });
      resolve('clean');
    });
  }

  highlightSprite(sprite, color, text, placement = 'right') {
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
    this.addInfoText(sprite, text, placement);
  }

  addInfoText(sprite, text, placement = 'right', style = SituationRunner.InfoBoxStyle) {
    const infoText = new PIXI.Text(text, style);
    infoText.x = sprite.x - sprite.width / 2;
    infoText.y = sprite.y - sprite.height / 2;

    switch (placement) {
      case 'right':
        infoText.x += sprite.width;
        break;
      case 'left':
        infoText.x -= sprite.width + SituationRunner.InfoTextSize;
        break;
      case 'up':
        infoText.y -= sprite.height + SituationRunner.InfoTextSize;
        break;
      case 'down':
        infoText.y += sprite.height;
        break;
      default:
        infoText.x += sprite.width;
        break;
    }

    this.infoElements.push(infoText);
    this.view.container.addChild(infoText);
  }


  showDecision(situation, policyID) {
    document.getElementById('report_decision').innerHTML = this.currentDecision.text;
    document.getElementById('report_policy_name').innerHTML = Policies[policyID].name;
    document.getElementById('report_policy_objective').innerHTML = Policies[policyID].objective;
    document.getElementById('report_situation_description').innerHTML = situation.getDescription();
/*
    const template = Handlebars.compile("<p><u>{{description}}</u><br>Property and Insurance costs:{{damage_costs}}<br>Injuries to humans:{{human_injuries}}<br>Risk to passenger and car:{{car_safety}}</p>");
    template( {

    })
*/
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

SituationRunner.InfoTextSize = 80;

SituationRunner.InfoBoxStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 16,
  fill: '#000000',
  wordWrap: true,
  wordWrapWidth: SituationRunner.InfoTextSize + 20,
});
