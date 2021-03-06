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

  _buildDecisionsWithActions({
    humanist,
    profit,
    protector,
  }) {
    return {
      humanist: {
        textKey: this._getI18nKey('Humanist'),
        actionFunction: humanist,
      },
      profit: {
        textKey: this._getI18nKey('Profit'),
        actionFunction: profit,
      },
      protector: {
        textKey: this._getI18nKey('Protector'),
        actionFunction: protector,
      },
    };
  }

  getDescriptionKey() {
    return this._getI18nKey('description');
  }

  getDecision(policyId) {
    return this.getDecisions()[policyId];
  }

  static registerSituation(key, aSituation) {
    Situation.situations[key] = aSituation;
  }

  static getSituation(key, view) {
    const SituationClass = Situation.situations[key];
    return new SituationClass(view);
  }

  wait(time = 1000) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  _getI18nPrefix() {

  }

  _getI18nKey(...keyParts) {
    return [this._getI18nPrefix(), ...keyParts].join('.');
  }

  _getElementsI18nKeys(elementName) {
    return {
      nameKey: this._getI18nKey(elementName, 'name'),
      descriptionKey: this._getI18nKey(elementName, 'description'),
    };
  }
}

Situation.situations = {};
Situation.HighlightAgentColor = 0xFFF200;
Situation.HighlightOthersColor = 0xFF8000;
