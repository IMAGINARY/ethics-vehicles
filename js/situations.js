var tempElementsInSituation = new Set();
var tempInfoElements = new Set();

const InfoTextSize = 80;

const InfoBoxStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fill: '#000000',
    wordWrap: true,
    wordWrapWidth: InfoTextSize + 20,
});

var currentDecision;

function executeSituation(situation, policyId) {

    currentDecision = situation.decisions[policyId];

    situation.setup();

    situation.start().then(waitForKeyPress)

    .then(highlight(situation.elements)).then(waitForKeyPress).then(removeHighligts)

    .then(showDecision(policyId)).then(waitForKeyPress).then(hideDecision)
    .then(playOutDecision).then(waitForKeyPress)
    .then(cleanTempElements)
    .then(situation.teardown)
    .then(startIdleAnimation)
    ;   
}

function highlight(elements) {
    return () => {
        new Promise((resolve, reject) => {
        elements.forEach( (element) => {
            highlightSprite(element.sprite, element.color, element.text, element.placement);
        });
        resolve('highlight');
    })};
}

function removeHighligts() {
    return new Promise((resolve, reject) => {
        tempInfoElements.forEach( (element) => {
            container.removeChild(element);
        });
        resolve('clean');
    });
}

function waitForKeyPress() {
    return new Promise((resolve, reject) => {
        window.onkeydown = function() {
            window.onkeydown = function() {}
            resolve("keydown");
        }
    });
}

function highlightSituationElements() {
    HighlightedElements.forEach( (element) => {
        highlightSprite(element.sprite, element.color, element.text, element.placement);
    });
}

function highlightSprite(sprite, color, text, placement = 'right') {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color, 0.5);
    graphics.drawRect(sprite.x - sprite.width/2, sprite.y - sprite.height/2, sprite.width, sprite.height);
    graphics.endFill();
    tempInfoElements.add(graphics);
    container.addChild(graphics);
    addInfoText(sprite, text, placement);
}

function addInfoText(sprite, text, placement = 'right', style = InfoBoxStyle) {
    const infoText = new PIXI.Text(text, style);
    infoText.x = sprite.x - sprite.width/2;
    infoText.y = sprite.y - sprite.height/2;

    switch (placement) {
        case 'right':
            infoText.x += sprite.width;
            break;
        case 'left':
            infoText.x -= sprite.width + InfoTextSize;
            break;
        case 'up':
            infoText.y -= sprite.height + InfoTextSize;
            break;
        case 'down':
            infoText.y += sprite.height;
            break;
    }

    tempInfoElements.add(infoText);
    container.addChild(infoText);
}

function addCarToSituation(car) {
    container.addChild(car.sprite);
    tempElementsInSituation.add(car.sprite);
    return car;
}

function showDecision(policyId) {
    return () => {
        document.getElementById("report_decision").innerHTML = currentDecision.text;
        document.getElementById("report_policy_name").innerHTML = Policies[policyId].name;
        document.getElementById("report_policy_objective").innerHTML = Policies[policyId].objective;

        return setVisible("report", "visible");
    };
}

function hideDecision() {
    return setVisible("report", "hidden");
}

function setVisible(elementName, visibility = 'visible') {
    return new Promise((resolve, reject) => {
        document.getElementById(elementName).style.visibility = visibility;
        resolve('clean');
    });
}

function removeTempInfoElements() {
    return new Promise((resolve, reject) => {
        tempInfoElements.forEach(element => {
            container.removeChild(element);
        });
        resolve('clean');
    });
}

function cleanTempElements() {
    return new Promise((resolve, reject) => {
        tempElementsInSituation.forEach(element => {
            container.removeChild(element);
        });
        resolve('clean');
    });
}

function playOutDecision() {
    return currentDecision.actionFunction();
}

