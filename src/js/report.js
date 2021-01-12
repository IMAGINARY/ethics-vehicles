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
  }

  show() {
    this.decisionBlock.style.display = 'none';
    this.policyBlock.style.display = 'none';
    return tweenOpacity(this.htmlElement, 1, 500);
  }

  setDescription(description) {
    this.situationDescriptionElement.innerHTML = description;
  }

  setPolicy(name, objective) {
    this.policyBlock.style.display = 'block';
    this.policyNameElement.innerHTML = name;
    this.policyObjectiveElement.innerHTML = objective;
  }

  setDecision(decision) {
    this.decisionBlock.style.display = 'block';
    this.decisionElement.innerHTML = decision;
  }

  hide() {
    return tweenOpacity(this.htmlElement, 0, 250);
  }
}
