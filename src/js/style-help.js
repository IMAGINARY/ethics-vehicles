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
