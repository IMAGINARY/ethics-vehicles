/* globals PIXI */
import { Lane } from './lane';
import {
  VIEW_SIZE, STREET_X_OFFSET, STREET_Y_OFFSET, STREET_LANE_OFFSET,
} from './constants';

function createHorizontalLane(verticalOffset, dirMultiplier) {
  return new Lane(
    new PIXI.Point( (VIEW_SIZE/2) * dirMultiplier, -verticalOffset),
    new PIXI.Point(-(VIEW_SIZE/2) * dirMultiplier, -verticalOffset));
}

function createVerticalLane(horizontalOffset, dirMultiplier) {
  return new Lane(
    new PIXI.Point(-horizontalOffset,  (VIEW_SIZE/2) * dirMultiplier),
    new PIXI.Point(-horizontalOffset, -(VIEW_SIZE/2) * dirMultiplier));
}

// eslint-disable-next-line import/prefer-default-export
export const LANES = [
  createVerticalLane(STREET_X_OFFSET - STREET_LANE_OFFSET, 1),
  createVerticalLane(STREET_X_OFFSET + STREET_LANE_OFFSET, -1),

  createVerticalLane(-STREET_X_OFFSET - STREET_LANE_OFFSET, 1),
  createVerticalLane(-STREET_X_OFFSET + STREET_LANE_OFFSET, -1),

  createHorizontalLane(STREET_Y_OFFSET + STREET_LANE_OFFSET, 1),
  createHorizontalLane(STREET_Y_OFFSET - STREET_LANE_OFFSET, -1),

  createHorizontalLane(-STREET_Y_OFFSET + STREET_LANE_OFFSET, 1),
  createHorizontalLane(-STREET_Y_OFFSET - STREET_LANE_OFFSET, -1),
];

function setOppositeLanes(laneA, laneB) {
  // eslint-disable-next-line no-param-reassign
  laneA.oppositeLane = laneB;
  // eslint-disable-next-line no-param-reassign
  laneB.oppositeLane = laneA;
}

setOppositeLanes(LANES[0], LANES[1]);
setOppositeLanes(LANES[2], LANES[3]);
setOppositeLanes(LANES[4], LANES[5]);
setOppositeLanes(LANES[6], LANES[7]);
