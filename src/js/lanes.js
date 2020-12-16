import { Lane } from './lane';
import { STREET_LANE_OFFSET, StreetOffsetFromCenter, ViewSize } from './constants';

function createHorizontalLane(verticalOffset, dirMultiplier) {
  return new Lane(
    new PIXI.Point((ViewSize.width / 2) * dirMultiplier, -verticalOffset),
    new PIXI.Point(-(ViewSize.width / 2) * dirMultiplier, -verticalOffset)
  );
}

function createVerticalLane(horizontalOffset, dirMultiplier) {
  return new Lane(
    new PIXI.Point(-horizontalOffset, (ViewSize.height / 2) * dirMultiplier),
    new PIXI.Point(-horizontalOffset, -(ViewSize.height / 2) * dirMultiplier)
  );
}

// eslint-disable-next-line import/prefer-default-export
export const LANES = [
  createVerticalLane(StreetOffsetFromCenter.x - STREET_LANE_OFFSET, 1),
  createVerticalLane(StreetOffsetFromCenter.x + STREET_LANE_OFFSET, -1),

  createVerticalLane(-StreetOffsetFromCenter.x - STREET_LANE_OFFSET, 1),
  createVerticalLane(-StreetOffsetFromCenter.x + STREET_LANE_OFFSET, -1),

  createHorizontalLane(StreetOffsetFromCenter.y + STREET_LANE_OFFSET, 1),
  createHorizontalLane(StreetOffsetFromCenter.y - STREET_LANE_OFFSET, -1),

  createHorizontalLane(-StreetOffsetFromCenter.y + STREET_LANE_OFFSET, 1),
  createHorizontalLane(-StreetOffsetFromCenter.y - STREET_LANE_OFFSET, -1),
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
