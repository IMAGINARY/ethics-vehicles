import { tweenOpacity, tweenStyle } from './style-help';

export default class Report {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;

    this.situationDescriptionElement = this.htmlElement.querySelector('#situation_description');
    
    this.policyBlock = this.htmlElement.querySelector('#policy');
    this.policyNameElement = this.htmlElement.querySelector('#policy_name');
    this.policyObjectiveElement = this.htmlElement.querySelector('#policy_objective');

    this.decisionElement = this.htmlElement.querySelector('#decision_text');
  }

  show() {
    this.decisionElement.style.display = "none";
    this.policyBlock.style.display = "none";
    return tweenOpacity(this.htmlElement, 1, 500);
  }

  pullUp(time = 1000) {
    this.htmlElement.classList.add('report_up');
    return new Promise(r => setTimeout(r, time));
  }

  pullDown(time = 1000) {
    this.htmlElement.classList.add('report_down');
    return new Promise(r => setTimeout(r, time));
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
    this.decisionElement.style.display = "block";
    this.decisionElement.innerHTML = decision;
  }

  hide () {
    return tweenOpacity(this.htmlElement, 0, 250);
  }
}
  