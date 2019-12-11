/* global PIXI */

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

export const POINT_ZERO = new PIXI.Point(0, 0);
