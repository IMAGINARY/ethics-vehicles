/* global PIXI */
import { VIEW_SIZE } from './constants';

export function createSprite(sourceImage, scale, anchor = 0.5) {
  const texture = PIXI.Texture.from(sourceImage);
  const sprite = new PIXI.Sprite(texture);
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.anchor.set(anchor);
  return sprite;
}

export function highlightSprite(sprite, color) {
  const graphics = new PIXI.Graphics();
  graphics.beginFill(color, 0.5);
  graphics.drawRect(
    sprite.x - sprite.width / 2,
    sprite.y - sprite.height / 2,
    sprite.width,
    sprite.height
  );
  graphics.endFill();
  return graphics;
}

/**
 * 
 * @param {fraction [0,1] of the screen, horizontally, starting from left} x 
 * @param {fraction [0,1] of the screen, vertically, starting from top} y 
 */
export function screenPosFromFraction(x, y) {
  return new PIXI.Point((x - 0.5) * VIEW_SIZE,
                        (y - 0.5) * VIEW_SIZE);
}

export const POINT_ZERO = new PIXI.Point(0, 0);
