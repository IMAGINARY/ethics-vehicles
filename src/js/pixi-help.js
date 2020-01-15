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

export function vectorBetweenPoints(a, b) {
  const v1 = new PIXI.Point(0, -1);
  const v2 = new PIXI.Point(b.x - a.x, b.y - a.y);
  const radians = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
  return radians * 180 / Math.PI;
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

export function moveToFraction(sprite, x, y) {
  const pos = screenPosFromFraction(x, y);
  sprite.x = pos.x;
  sprite.y = pos.y;
}

export function pixiFadeIn(element, toOpacity, time = 1000) {
  return new Promise ((resolve) => {
      new TWEEN.Tween(element)
          .to( { alpha: toOpacity }, time)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete( () => resolve('visible') )
          .start();
  });
}


export const POINT_ZERO = new PIXI.Point(0, 0);
