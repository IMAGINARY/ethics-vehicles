/* globals $ */
import View from './view';
import Situation from './situation';
import SituationRunner from './situation-runner';
import './situations/car-enters-lane';
import './situations/tree-falls';

const view = new View($('#game')[0]);
const runner = new SituationRunner(view);

$('#startButton').on('click', () => {
  const policyID = $('#option_policy').val();
  const situationID = $('#option_situation').val();
  const SituationClass = Situation.getSituation(situationID);
  view.queueAction(() => { runner.run(new SituationClass(view), policyID); });
});

view.startIdleAnimation();
