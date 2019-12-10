/* global PIXI */

export function createSprite(sourceImage, scale, anchor = 0.5) {
  const texture = PIXI.Texture.from(sourceImage);
  const sprite = new PIXI.Sprite(texture);
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.anchor.set(anchor);
  return sprite;
}

export const POINT_ZERO = new PIXI.Point(0, 0);
