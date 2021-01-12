import { tweenOpacity } from './style-help';

export default class Report {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;

    this.situationDescriptionElement = this.htmlElement.querySelector('#situation_description');

    this.policyBlock = this.htmlElement.querySelector('#policy');
    this.policyNameElement = this.htmlElement.querySelector('#policy_name');
    this.policyObjectiveElement = this.htmlElement.querySelector('#policy_objective');

    this.decisionBlock = this.htmlElement.querySelector('#decision');
    this.decisionElement = this.htmlElement.querySelector('#decision_text');

    this.hide(0)
      .then();
  }

  show(timeMs = 500) {
    return tweenOpacity(this.htmlElement, 1, timeMs);
  }

  setDescription(description) {
    this.situationDescriptionElement.innerHTML = description;
  }

  setPolicy(name, objective) {
    this.policyNameElement.innerHTML = name;
    this.policyObjectiveElement.innerHTML = objective;
  }

  setDecision(decision) {
    this.decisionElement.innerHTML = decision;
  }

  revealPolicy() {
    return tweenOpacity(this.policyBlock, 1, 500);
  }

  revealDecision() {
    return tweenOpacity(this.decisionBlock, 1, 500);
  }

  hidePolicyAndDecision(timeMs = 250) {
    const hidePolicyPromise = tweenOpacity(this.policyBlock, 0, timeMs);
    const hideDecisionPromise = tweenOpacity(this.decisionBlock, 0, timeMs);
    return Promise.all([
      hidePolicyPromise,
      hideDecisionPromise,
    ]);
  }

  hide(timeMs = 250) {
    const hidePolicyAndDecision = this.hidePolicyAndDecision(timeMs);
    const hideElementPromise = tweenOpacity(this.htmlElement, 0, timeMs);
    return Promise.all([
      hidePolicyAndDecision,
      hideElementPromise,
    ]);
  }
}
