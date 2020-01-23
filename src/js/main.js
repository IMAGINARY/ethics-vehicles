/* globals $ */
import View from './view';
import Report from './report';
import InfoBoxes from './info-boxes';

import Situation from './situation';
import SituationRunner from './situation-runner';
import './situations/car-enters-lane';
import './situations/tree-falls';
import './situations/child-runs';
import Menu from './menu.js';

const view = new View($('#game')[0]);
const report = new Report($('#report')[0]);
const infoBoxes = new InfoBoxes($('#info_elements')[0]);
const runner = new SituationRunner(view, report, infoBoxes);

$('#startButton').on('click', () => {
  const policyID = $('#option_policy').val();
  const situationID = $('#option_situation').val();
  startSituation(situationID, policyID);
});

const SituationMenu = new Menu('menu', [
  {text: 'A tree falls', action: () => startSituation('tree-falls') },
  {text: 'A car enters your lane', action: () => startSituation('car-enters-lane') },
  {text: 'A child runs in the street', action: () => startSituation('child-runs') },
]);

function startSituation(situationID, policyID = 'humanist') {
  SituationMenu.hide();
  const SituationClass = Situation.getSituation(situationID);
  view.queueAction(() => { runner.run(new SituationClass(view), policyID); });
}

$('#debugButton').on('click', () => {
  if (view.debugLayer.visible)
    view.debugLayer.hide();
  else
    view.debugLayer.show();
});

view.startIdleAnimation();

view.app.ticker.add( () => TWEEN.update() );

SituationMenu.show();

