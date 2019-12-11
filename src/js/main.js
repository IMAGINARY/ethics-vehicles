/* globals $ */
import View from './view';
import Report from './report';
import InfoBoxes from './info-boxes';

import Situation from './situation';
import SituationRunner from './situation-runner';
import './situations/car-enters-lane';
import './situations/tree-falls';
import './situations/child-runs';

const view = new View($('#game')[0]);
const report = new Report($('#report')[0]);
const infoBoxes = new InfoBoxes($('#info_elements')[0]);
const runner = new SituationRunner(view, report, infoBoxes);

$('#startButton').on('click', () => {
  const policyID = $('#option_policy').val();
  const situationID = $('#option_situation').val();
  const SituationClass = Situation.getSituation(situationID);
  view.queueAction(() => { runner.run(new SituationClass(view), policyID); });
});

view.startIdleAnimation();
