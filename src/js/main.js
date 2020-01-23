/* globals $ */
import View from './view';
import './situations/car-enters-lane';
import './situations/tree-falls';
import './situations/child-runs';

const view = new View($('#game')[0]);
/*
$('#debugButton').on('click', () => {
  if (view.debugLayer.visible)
    view.debugLayer.hide();
  else
    view.debugLayer.show();
});
*/
view.start();
