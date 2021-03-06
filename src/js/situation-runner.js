/* eslint-disable max-classes-per-file */
import { Policies } from './policies';
import { highlightSprite } from './pixi-help';
import Menu from './menu';
import createAdvanceButton from './create-advance-button';
import InfoBox from './info-boxes';

import HighlightColor from './design';
import { eventFilters, waitForEvent } from './event-help';

class SituationRunnerInternal {
  constructor(view, report, situation) {
    this.view = view;
    this.t = (...args) => this.view.i18next.t(...args);
    this.report = report;
    this.situation = situation;
    this.elements = situation.getElements();
    this.currentDecision = null;
    this.tempElements = [];
    this.currentPolicy = null;
    this.policyMenu = null;
    this.setInfoTextsHandler = this.setInfoTexts.bind(this);
  }

  async run() {
    this.view.agentCar.hide();
    await this.situation.setup();
    await this.situation.start();
    await this.situation.wait(1000);
    await this.showElementsInfo();

    const setReportTitle = () => this.report.setTitle(this.t('Report'));
    this.view.i18next.on('languageChanged', setReportTitle);

    const situationDescriptionKey = this.situation.getDescriptionKey();
    const setReportDescription = () => this.report.setDescription(this.t(situationDescriptionKey));
    setReportDescription();
    this.view.i18next.on('languageChanged', setReportDescription);

    await this.report.show();
    await this.waitForAdvanceButton('Next', 3000);

    await this.waitForPolicy();

    const policyNameKey = this.currentPolicy.nameKey;
    const policyObjectiveKey = this.currentPolicy.objectiveKey;
    const setReportPolicy = () => {
      this.report.setPolicy(this.t(policyNameKey), this.t(policyObjectiveKey));
    };
    setReportPolicy();
    this.view.i18next.on('languageChanged', setReportPolicy);
    await this.report.revealPolicy();

    await this.situation.wait(1000);
    await this.hideElementsInfo();
    await this.situation.wait(1000);

    await this.playOutDecision();
    await this.situation.wait(1000);

    const setReportDecision = () => this.report.setDecision(this.t(this.currentDecision.textKey));
    setReportDecision();
    this.view.i18next.on('languageChanged', setReportDecision);
    await this.report.revealDecision();

    await this.waitForAdvanceButton('Restart', 15000);

    await this.report.hide();
    await this.situation.clearSprites();
    await this.situation.teardown();
    await this.view.start();

    this.view.i18next.off('languageChanged', setReportDescription);
    this.view.i18next.off('languageChanged', setReportPolicy);
    this.view.i18next.off('languageChanged', setReportDecision);
  }

  async waitForPolicy() {
    const languageChangedHandler = () => this.policyMenu.refreshTexts();
    // eslint-disable-next-line no-async-promise-executor
    const policyId = await new Promise(async (resolve) => {
      const options = Policies.map((policy) => ({
        label: () => `${this.t(policy.nameKey)}: ${this.t(policy.objectiveKey)}`,
        action: () => {
          this.currentPolicy = policy;
          this.currentDecision = this.situation.getDecision(policy.id);
          resolve(policy.id);
        },
      }));
      const title = () => this.t('ChoosePolicy');
      this.policyMenu = new Menu('menu', options, title, 'bottom_menu');
      this.view.i18next.on('languageChanged', languageChangedHandler);
      await this.policyMenu.show();
    });
    this.view.i18next.off('languageChanged', languageChangedHandler);
    return policyId;
  }

  async waitForAdvanceButton(key = 'Next', timeout = 10000) {
    const advanceButton = this.view.config.autoAdvance
      ? createAdvanceButton(this.t(key), timeout)
      : createAdvanceButton(this.t(key));
    const languageChangedHandler = () => advanceButton.setLabel(this.t(key));
    this.view.i18next.on('languageChanged', languageChangedHandler);
    await advanceButton.wait();
    this.view.i18next.off('languageChanged', languageChangedHandler);
  }

  // eslint-disable-next-line class-methods-use-this
  async waitForKeyPress() {
    const eventType = 'keydown';
    await waitForEvent(window, eventType, eventFilters.TRUE);
    return eventType;
  }

  setInfoTexts() {
    for (let i = 0; i < this.elements.length; i += 1) {
      const element = this.elements[i];
      const infoBox = InfoBox.get(i);
      infoBox.setName(this.t(element.nameKey));
      infoBox.setDescription(this.t(element.descriptionKey));
    }
  }

  async showElementsInfo() {
    this.setInfoTexts();
    this.view.i18next.on('languageChanged', this.setInfoTextsHandler);
    for (let i = 0; i < this.elements.length; i += 1) {
      const element = this.elements[i];
      const { infoBoxOptions: { refRect, width, height, placement, alignment } } = element;
      const infoBox = InfoBox.get(i);
      infoBox.setRefRect(refRect);
      infoBox.setSize(width, height);
      infoBox.setPlacement(placement);
      infoBox.setAlignment(alignment);
      this.highlight(element.sprite);
      await infoBox.fadeShow(1000); // eslint-disable-line no-await-in-loop
    }
  }

  async hideElementsInfo(time = 1000) {
    this.removeTempElements();
    InfoBox.hideAll(time);
    await new Promise((resolve) => setTimeout(resolve, time));
    this.view.i18next.off('languageChanged', this.setInfoTextsHandler);
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

export default class SituationRunner {
  constructor(view, report) {
    this.view = view;
    this.report = report;
  }

  async run(situation) {
    await new SituationRunnerInternal(this.view, this.report, situation).run();
  }
}
