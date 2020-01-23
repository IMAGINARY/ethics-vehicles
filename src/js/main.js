/* globals $ */
import View from './view';
import Report from './report';
import InfoBoxes from './info-boxes';

import Situation from './situation';
import SituationRunner from './situation-runner';
import './situations/car-enters-lane';
import './situations/tree-falls';
import './situations/child-runs';
import { showMenu, hideMenu, addMenuButton } from './menu.js';

const view = new View($('#game')[0]);
const report = new Report($('#report')[0]);
const infoBoxes = new InfoBoxes($('#info_elements')[0]);
const runner = new SituationRunner(view, report, infoBoxes);

$('#startButton').on('click', () => {
  const policyID = $('#option_policy').val();
  const situationID = $('#option_situation').val();
  startSituation(situationID, policyID);
});

function showSituationMenu() {
  showMenu();
  addMenuButton('A Tree Falls', function() { startSituation('tree-falls'); });
  addMenuButton('A car enters your lane', function() { startSituation('car-enters-lane'); });
  addMenuButton('A child runs in the street', function() { startSituation('child-runs'); });
}

function startSituation(situationID, policyID = 'humanist') {
  hideMenu();
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

showSituationMenu();
