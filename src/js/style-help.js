/* globals TWEEN, PIXI */

export function tweenOpacity(element, toOpacity, time = 1000) {
    return new Promise ((resolve) => {
        new TWEEN.Tween(element.style)
            .to( { opacity: toOpacity }, time)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete( () => resolve('visible') )
            .start();
    });
}

export function setLeftTopCSSFromCoord(element, coord) {
    element.style.left = coord.x + 'px';
    element.style.top = coord.y + 'px';
}
