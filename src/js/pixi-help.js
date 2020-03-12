/* global PIXI */
import { ViewSize } from './constants';

export function createAnimatedSprite(sourceImages, scale, anchor = 0.5) {
  const textures = sourceImages.map( image => PIXI.Texture.from(image) );
  const sprite = new PIXI.AnimatedSprite(textures);
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.anchor.set(anchor);
  return sprite;
}

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
  graphics.lineStyle(5, color, 1, 0.5);
  graphics.drawCircle(
    sprite.x,
    sprite.y,
    Math.max(sprite.width, sprite.height)/2 + 10,
  );
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
  return new PIXI.Point((x - 0.5) * ViewSize.width,
                        (y - 0.5) * ViewSize.height);
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

export function pixiMoveTo(element, dest, time = 1000) {
  return new Promise ((resolve) => {
    new TWEEN.Tween(element)
        .to( { x: dest.x, y: dest.y }, time)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete( () => resolve('moved') )
        .start();
  });
}

export const POINT_ZERO = new PIXI.Point(0, 0);
