
export default class Report {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.decisionElement = this.htmlElement.querySelector('#decision');
    this.policyNameElement = this.htmlElement.querySelector('#policy_name');
    this.policyObjectiveElement = this.htmlElement.querySelector('#policy_objective');
    this.situationDescriptionElement = this.htmlElement.querySelector('#situation_description');
  }
  
  show(situation, policy, decision) {
    this.decisionElement.innerHTML = decision;
    this.policyNameElement.innerHTML = policy.name;
    this.policyObjectiveElement.innerHTML = policy.objective;
    this.situationDescriptionElement.innerHTML = situation.getDescription();
    this.htmlElement.style.visibility = 'visible';
  }
  
  hide () {
    this.htmlElement.style.visibility = 'hidden';
  }
}
  