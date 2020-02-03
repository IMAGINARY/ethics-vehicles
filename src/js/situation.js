/* eslint-disable class-methods-use-this */
export default class Situation {
  constructor(view) {
    this.view = view;
    this.sprites = [];
  }

  addSprite(sprite) {
    this.sprites.push(sprite);
    this.view.container.addChild(sprite);
  }

  clearSprites() {
    this.sprites.forEach((aSprite) => {
      this.view.container.removeChild(aSprite);
    });
  }

  setup() {

  }

  start() {

  }

  teardown() {

  }

  getElements() {

  }

  getDecisions() {

  }

  getDescription() {
    
  }

  getDecision(policyId) {
    return this.getDecisions()[policyId];
  }

  static registerSituation(key, aSituation) {
    Situation.situations[key] = aSituation;
  }

  static getSituation(key, view) {
    const situationClass = Situation.situations[key];
    return new situationClass(view);
  }

  wait(time = 1000) {
    return new Promise( resolve => setTimeout(resolve, time) );
  }
}

Situation.situations = {};
Situation.HighlightAgentColor = 0xFFF200;
Situation.HighlightOthersColor = 0xFF8000;
