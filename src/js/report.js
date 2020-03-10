import { tweenOpacity, tweenStyle } from './style-help';

export default class Report {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;

    this.situationDescriptionElement = this.htmlElement.querySelector('#situation_description');
    
    this.policyBlock = this.htmlElement.querySelector('#policy');
    this.policyNameElement = this.htmlElement.querySelector('#policy_name');
    this.policyObjectiveElement = this.htmlElement.querySelector('#policy_objective');

    this.decisionBlock = this.htmlElement.querySelector('#decision')
    this.decisionElement = this.htmlElement.querySelector('#decision_text');
  }

  show() {
    this.decisionBlock.style.display = "none";
    this.policyBlock.style.display = "none";
    this.htmlElement.style.top = "300px";
    return tweenOpacity(this.htmlElement, 1, 250);
  }

  pullUp() {
    this.htmlElement.style.top = "30px";
  }

  setSituation(situation) {
    this.situationDescriptionElement.innerHTML = situation.getDescription();
  }

  setPolicy(policy) {
    this.policyBlock.style.display = "block";
    this.policyNameElement.innerHTML = policy.name;
    this.policyObjectiveElement.innerHTML = policy.objective;
  }

  setDecision(decision) {
    this.decisionBlock.style.display = "block";
    this.decisionElement.innerHTML = decision;
  }

  hide () {
    return tweenOpacity(this.htmlElement, 0, 250);
  }
}
  