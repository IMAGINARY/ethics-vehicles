/* globals $ */
import View from './view';
import './situations/car-enters-lane';
import './situations/tree-falls';
import './situations/child-runs';

const view = new View($('#game')[0]);
view.start();
