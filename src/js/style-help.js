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

export function tweenStyle(element, props, time = 1000) {
    console.log('tweenStyle : ' + props);

    return new Promise ((resolve) => {
        new TWEEN.Tween(element.style)
            .to( props, time)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete( () => resolve('tween_done') )
            .start();
    });
}

export function setLeftTopCSSFromCoord(element, coord) {
    element.style.left = coord.x + 'px';
    element.style.top = coord.y + 'px';
}

