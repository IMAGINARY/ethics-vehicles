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

  static registerSituation(key, aSituation) {
    Situation.situations[key] = aSituation;
  }

  static getSituation(key) {
    return Situation.situations[key];
  }
}

Situation.situations = {};
