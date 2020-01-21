(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var _pixiHelp = require("./pixi-help");

var _lane = require("./lane");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Car =
/*#__PURE__*/
function () {
  function Car(view, imageFile) {
    var lane = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _lane.NO_LANE;

    _classCallCheck(this, Car);

    this.view = view;
    this.sprite = (0, _pixiHelp.createSprite)(imageFile, _constants.CAR_SCALE, 0.5);
    this.sprite.zIndex = 100;
    this.lane = lane;
  }

  _createClass(Car, [{
    key: "placeInLane",
    value: function placeInLane(lane) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
      var forceDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.lane = lane;
      this.x = lane.start.x + (lane.end.x - lane.start.x) * position;
      this.y = lane.start.y + (lane.end.y - lane.start.y) * position;

      if (forceDirection) {
        this.forceLaneDirection();
      }
    }
  }, {
    key: "forceLaneDirection",
    value: function forceLaneDirection() {
      this.sprite.angle = this.lane.getDrivingAngle();
    }
  }, {
    key: "driveInLaneUntilPosition",
    value: function driveInLaneUntilPosition() {
      var _this = this;

      var endPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      var stopPosition = this.lane.getPositionCoordinates(endPosition);
      return new Promise(function (resolve) {
        new TWEEN.Tween(_this.sprite).to({
          x: stopPosition.x,
          y: stopPosition.y
        }, time).easing(TWEEN.Easing.Linear.None).onComplete(function () {
          return resolve('arrived');
        }).start();
      });
    }
  }, {
    key: "crossLane",
    value: function crossLane() {
      this.placeInLane(this.lane.oppositeLane, 1 - this.lane.getCarPosition(this), false);
    }
  }, {
    key: "show",
    value: function show() {
      this.view.container.addChild(this.sprite);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.view.container.removeChild(this.sprite);
    }
  }, {
    key: "x",
    get: function get() {
      return this.sprite.x;
    },
    set: function set(x) {
      this.sprite.x = x;
    }
  }, {
    key: "y",
    get: function get() {
      return this.sprite.y;
    },
    set: function set(y) {
      this.sprite.y = y;
    }
  }, {
    key: "angle",
    get: function get() {
      return this.sprite.angle;
    },
    set: function set(angle) {
      this.sprite.angle = angle;
    }
  }]);

  return Car;
}();

exports["default"] = Car;

},{"./constants":2,"./lane":4,"./pixi-help":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPRITE_WIDTH = exports.STREET_LANE_OFFSET = exports.BORDER_BLOCK_SIZE = exports.BLOCK_SIZE = exports.STREET_WIDTH = exports.STREET_Y_OFFSET = exports.STREET_X_OFFSET = exports.IDLE_ANIMATION_TIME = exports.DEFAULT_SPEED = exports.VIEW_SIZE = exports.CAR_SCALE = void 0;
var CAR_SCALE = 0.25;
exports.CAR_SCALE = CAR_SCALE;
var VIEW_SIZE = 1024;
exports.VIEW_SIZE = VIEW_SIZE;
var DEFAULT_SPEED = 15;
exports.DEFAULT_SPEED = DEFAULT_SPEED;
var IDLE_ANIMATION_TIME = 2000;
exports.IDLE_ANIMATION_TIME = IDLE_ANIMATION_TIME;
var STREET_X_OFFSET = VIEW_SIZE / 2 - 176;
exports.STREET_X_OFFSET = STREET_X_OFFSET;
var STREET_Y_OFFSET = VIEW_SIZE / 2 - 176;
exports.STREET_Y_OFFSET = STREET_Y_OFFSET;
var STREET_WIDTH = 160;
exports.STREET_WIDTH = STREET_WIDTH;
var BLOCK_SIZE = 512;
exports.BLOCK_SIZE = BLOCK_SIZE;
var BORDER_BLOCK_SIZE = 96;
exports.BORDER_BLOCK_SIZE = BORDER_BLOCK_SIZE;
var STREET_LANE_OFFSET = STREET_WIDTH / 4;
exports.STREET_LANE_OFFSET = STREET_LANE_OFFSET;
var SPRITE_WIDTH = 256 * CAR_SCALE;
exports.SPRITE_WIDTH = SPRITE_WIDTH;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styleHelp = require("./style-help");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var INFO_BOX_OPACITY = 0.75;

var InfoBoxes =
/*#__PURE__*/
function () {
  function InfoBoxes(htmlElement) {
    _classCallCheck(this, InfoBoxes);

    this.htmlElement = htmlElement;
    this.infoElements = Array.from($('.info_element'));
  }

  _createClass(InfoBoxes, [{
    key: "show",
    value: function show(index, element) {
      var infoElement = this.infoElements[index];
      infoElement.querySelector('#name').innerText = element.name;
      infoElement.querySelector('#description').innerHTML = element.description;
      infoElement.style.visibility = 'visible';
    }
  }, {
    key: "fadeShow",
    value: function fadeShow(index, element, time) {
      this.show(index, element);
      var infoElement = this.infoElements[index];
      infoElement.style.opacity = 0;
      return (0, _styleHelp.tweenOpacity)(infoElement, INFO_BOX_OPACITY, time);
    }
  }, {
    key: "hide",
    value: function hide(index) {
      this.infoElements[index].style.visibility = 'hidden';
    }
  }, {
    key: "hideAll",
    value: function hideAll() {
      var _this = this;

      this.infoElements.forEach(function (element, index) {
        return _this.hide(index);
      });
    }
  }]);

  return InfoBoxes;
}();

exports["default"] = InfoBoxes;

},{"./style-help":16}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NO_LANE = exports.Lane = void 0;

var _pixiHelp = require("./pixi-help");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

PIXI.Point.Lerp = function (start, end, k) {
  return new PIXI.Point(start.x + k * (end.x - start.x), start.y + k * (end.y - start.y));
};

var Lane =
/*#__PURE__*/
function () {
  function Lane(start, end) {
    _classCallCheck(this, Lane);

    this.start = start;
    this.end = end;
    this.oppositeLane = null;
  }

  _createClass(Lane, [{
    key: "isVertical",
    value: function isVertical() {
      return this.start.x == this.end.x;
    }
  }, {
    key: "isHorizontal",
    value: function isHorizontal() {
      return this.start.y == this.end.y;
    }
  }, {
    key: "getDrivingAngle",
    value: function getDrivingAngle() {
      return (0, _pixiHelp.vectorBetweenPoints)(this.start, this.end);
    }
  }, {
    key: "getPositionCoordinates",
    value: function getPositionCoordinates(position) {
      return PIXI.Point.Lerp(this.start, this.end, position);
    }
  }, {
    key: "getCarPosition",
    value: function getCarPosition(car) {
      if (this.isVertical()) {
        return (car.y - this.start.y) / (this.end.y - this.start.y);
      }

      return (car.x - this.start.x) / (this.end.x - this.start.x);
    }
  }]);

  return Lane;
}();

exports.Lane = Lane;
var NO_LANE = new Lane(_pixiHelp.POINT_ZERO, new PIXI.Point(1, 0));
exports.NO_LANE = NO_LANE;

},{"./pixi-help":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LANES = void 0;

var _lane = require("./lane");

var _constants = require("./constants");

/* globals PIXI */
function createHorizontalLane(verticalOffset, dirMultiplier) {
  return new _lane.Lane(new PIXI.Point(_constants.VIEW_SIZE / 2 * dirMultiplier, -verticalOffset), new PIXI.Point(-(_constants.VIEW_SIZE / 2) * dirMultiplier, -verticalOffset));
}

function createVerticalLane(horizontalOffset, dirMultiplier) {
  return new _lane.Lane(new PIXI.Point(-horizontalOffset, _constants.VIEW_SIZE / 2 * dirMultiplier), new PIXI.Point(-horizontalOffset, -(_constants.VIEW_SIZE / 2) * dirMultiplier));
} // eslint-disable-next-line import/prefer-default-export


var LANES = [createVerticalLane(_constants.STREET_X_OFFSET - _constants.STREET_LANE_OFFSET, 1), createVerticalLane(_constants.STREET_X_OFFSET + _constants.STREET_LANE_OFFSET, -1), createVerticalLane(-_constants.STREET_X_OFFSET - _constants.STREET_LANE_OFFSET, 1), createVerticalLane(-_constants.STREET_X_OFFSET + _constants.STREET_LANE_OFFSET, -1), createHorizontalLane(_constants.STREET_Y_OFFSET + _constants.STREET_LANE_OFFSET, 1), createHorizontalLane(_constants.STREET_Y_OFFSET - _constants.STREET_LANE_OFFSET, -1), createHorizontalLane(-_constants.STREET_Y_OFFSET + _constants.STREET_LANE_OFFSET, 1), createHorizontalLane(-_constants.STREET_Y_OFFSET - _constants.STREET_LANE_OFFSET, -1)];
exports.LANES = LANES;

function setOppositeLanes(laneA, laneB) {
  // eslint-disable-next-line no-param-reassign
  laneA.oppositeLane = laneB; // eslint-disable-next-line no-param-reassign

  laneB.oppositeLane = laneA;
}

setOppositeLanes(LANES[0], LANES[1]);
setOppositeLanes(LANES[2], LANES[3]);
setOppositeLanes(LANES[4], LANES[5]);
setOppositeLanes(LANES[6], LANES[7]);

},{"./constants":2,"./lane":4}],6:[function(require,module,exports){
"use strict";

var _view = _interopRequireDefault(require("./view"));

var _report = _interopRequireDefault(require("./report"));

var _infoBoxes = _interopRequireDefault(require("./info-boxes"));

var _situation = _interopRequireDefault(require("./situation"));

var _situationRunner = _interopRequireDefault(require("./situation-runner"));

require("./situations/car-enters-lane");

require("./situations/tree-falls");

require("./situations/child-runs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* globals $ */
var view = new _view["default"]($('#game')[0]);
var report = new _report["default"]($('#report')[0]);
var infoBoxes = new _infoBoxes["default"]($('#info_elements')[0]);
var runner = new _situationRunner["default"](view, report, infoBoxes);
$('#startButton').on('click', function () {
  var policyID = $('#option_policy').val();
  var situationID = $('#option_situation').val();

  var SituationClass = _situation["default"].getSituation(situationID);

  view.queueAction(function () {
    runner.run(new SituationClass(view), policyID);
  });
});
$('#debugButton').on('click', function () {
  if (view.debugLayer.visible) view.debugLayer.hide();else view.debugLayer.show();
});
view.startIdleAnimation();
view.app.ticker.add(function () {
  return TWEEN.update();
});

},{"./info-boxes":3,"./report":9,"./situation":12,"./situation-runner":11,"./situations/car-enters-lane":13,"./situations/child-runs":14,"./situations/tree-falls":15,"./view":17}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSprite = createSprite;
exports.highlightSprite = highlightSprite;
exports.vectorBetweenPoints = vectorBetweenPoints;
exports.screenPosFromFraction = screenPosFromFraction;
exports.moveToFraction = moveToFraction;
exports.pixiFadeIn = pixiFadeIn;
exports.POINT_ZERO = void 0;

var _constants = require("./constants");

/* global PIXI */
function createSprite(sourceImage, scale) {
  var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
  var texture = PIXI.Texture.from(sourceImage);
  var sprite = new PIXI.Sprite(texture);
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.anchor.set(anchor);
  return sprite;
}

function highlightSprite(sprite, color) {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(color, 0.5);
  graphics.drawRect(sprite.x - sprite.width / 2, sprite.y - sprite.height / 2, sprite.width, sprite.height);
  graphics.endFill();
  return graphics;
}

function vectorBetweenPoints(a, b) {
  var v1 = new PIXI.Point(0, -1);
  var v2 = new PIXI.Point(b.x - a.x, b.y - a.y);
  var radians = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
  return radians * 180 / Math.PI;
}
/**
 * 
 * @param {fraction [0,1] of the screen, horizontally, starting from left} x 
 * @param {fraction [0,1] of the screen, vertically, starting from top} y 
 */


function screenPosFromFraction(x, y) {
  return new PIXI.Point((x - 0.5) * _constants.VIEW_SIZE, (y - 0.5) * _constants.VIEW_SIZE);
}

function moveToFraction(sprite, x, y) {
  var pos = screenPosFromFraction(x, y);
  sprite.x = pos.x;
  sprite.y = pos.y;
}

function pixiFadeIn(element, toOpacity) {
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  return new Promise(function (resolve) {
    new TWEEN.Tween(element).to({
      alpha: toOpacity
    }, time).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
      return resolve('visible');
    }).start();
  });
}

var POINT_ZERO = new PIXI.Point(0, 0);
exports.POINT_ZERO = POINT_ZERO;

},{"./constants":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Policies = void 0;
// eslint-disable-next-line import/prefer-default-export
var Policies = {
  humanist: {
    name: 'Humanist',
    objective: 'Minimize human injuries'
  },
  profit: {
    name: 'Profit-based',
    objective: 'Minimize costs (property and insurance)'
  },
  protector: {
    name: 'Protector',
    objective: 'Protect the autonomous car and its passengers'
  }
};
exports.Policies = Policies;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Report =
/*#__PURE__*/
function () {
  function Report(htmlElement) {
    _classCallCheck(this, Report);

    this.htmlElement = htmlElement;
    this.decisionElement = this.htmlElement.querySelector('#decision');
    this.policyNameElement = this.htmlElement.querySelector('#policy_name');
    this.policyObjectiveElement = this.htmlElement.querySelector('#policy_objective');
    this.situationDescriptionElement = this.htmlElement.querySelector('#situation_description');
  }

  _createClass(Report, [{
    key: "show",
    value: function show(situation, policy, decision) {
      this.decisionElement.innerHTML = decision;
      this.policyNameElement.innerHTML = policy.name;
      this.policyObjectiveElement.innerHTML = policy.objective;
      this.situationDescriptionElement.innerHTML = situation.getDescription();
      this.htmlElement.style.visibility = 'visible';
    }
  }, {
    key: "hide",
    value: function hide() {
      this.htmlElement.style.visibility = 'hidden';
    }
  }]);

  return Report;
}();

exports["default"] = Report;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pixiHelp = require("./pixi-help");

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SceneElement =
/*#__PURE__*/
function () {
  function SceneElement(view, imageFile) {
    var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _pixiHelp.POINT_ZERO;
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.CAR_SCALE;

    _classCallCheck(this, SceneElement);

    this.view = view;
    this.sprite = (0, _pixiHelp.createSprite)(imageFile, scale);
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    this.initialPosition = position;
    this.visible = false;
  }

  _createClass(SceneElement, [{
    key: "fadeIn",
    value: function fadeIn(time) {
      this.show();
      this.sprite.alpha = 0;
      return (0, _pixiHelp.pixiFadeIn)(this.sprite, 1, time);
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.view.container.addChild(_this.sprite);

        _this.visible = true;
        resolve();
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.view.container.removeChild(_this2.sprite);

        _this2.visible = false;
        resolve();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.sprite.x = this.initialPosition.x;
      this.sprite.y = this.initialPosition.y;
      this.sprite.angle = 0;
    }
  }]);

  return SceneElement;
}();

exports["default"] = SceneElement;

},{"./constants":2,"./pixi-help":7}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _policies = require("./policies");

var _pixiHelp = require("./pixi-help");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SituationRunner =
/*#__PURE__*/
function () {
  function SituationRunner(view, report, infoBoxes) {
    _classCallCheck(this, SituationRunner);

    this.view = view;
    this.report = report;
    this.infoBoxes = infoBoxes;
    this.currentDecision = null;
    this.tempElements = [];
  }

  _createClass(SituationRunner, [{
    key: "run",
    value: function run(situation, policyID) {
      var _this = this;

      this.currentDecision = situation.getDecisions()[policyID];
      this.view.agentCar.hide();
      situation.setup().then(function () {
        return _this.view.agentCar.show();
      }).then(function () {
        return situation.start();
      }).then(function () {
        return _this.wait(1000);
      }).then(function () {
        return _this.showElementsInfo(situation.getElements());
      }).then(function () {
        return _this.waitForAdvanceButton('Analyze');
      }).then(function () {
        return _this.hideElementsInfo();
      }).then(function () {
        return _this.showDecision(situation, policyID);
      }).then(function () {
        return _this.wait(1000);
      }).then(function () {
        return _this.waitForAdvanceButton('Show');
      }).then(function () {
        return _this.hideDecision();
      }).then(function () {
        return _this.playOutDecision();
      }).then(function () {
        return _this.wait(1000);
      }).then(function () {
        return _this.waitForAdvanceButton('Restart');
      }).then(function () {
        return situation.clearSprites();
      }).then(function () {
        return situation.teardown();
      }).then(function () {
        return _this.view.startIdleAnimation();
      });
    }
  }, {
    key: "wait",
    value: function wait() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      return new Promise(function (resolve) {
        return setTimeout(resolve, time);
      });
    }
  }, {
    key: "waitForAdvanceButton",
    value: function waitForAdvanceButton() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Next';
      return new Promise(function (resolve) {
        $('#advanceText').text(text);
        var button = $('#advanceButton');
        button.show();
        button.on('click', function () {
          button.hide();
          resolve('clicked');
        });
      });
    }
  }, {
    key: "waitForKeyPress",
    value: function waitForKeyPress() {
      return new Promise(function (resolve) {
        window.onkeydown = function () {
          window.onkeydown = function () {};

          resolve('keydown');
        };
      });
    }
  }, {
    key: "showElementsInfo",
    value: function showElementsInfo(elements) {
      var _this2 = this;

      var promise = new Promise(function (r) {
        return r('start fades');
      });
      elements.forEach(function (element, index) {
        promise = promise.then(function (r) {
          _this2.highlight(element.sprite, element.color);

          return _this2.infoBoxes.fadeShow(index, element, 1000);
        });
      });
      return promise;
    }
  }, {
    key: "hideElementsInfo",
    value: function hideElementsInfo() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.removeTempElements();

        _this3.infoBoxes.hideAll();

        resolve('clean');
      });
    }
  }, {
    key: "showDecision",
    value: function showDecision(situation, policyID) {
      return this.report.show(situation, _policies.Policies[policyID], this.currentDecision.text);
    }
  }, {
    key: "hideDecision",
    value: function hideDecision() {
      return this.report.hide();
    }
  }, {
    key: "playOutDecision",
    value: function playOutDecision() {
      return this.currentDecision.actionFunction();
    }
  }, {
    key: "highlight",
    value: function highlight(sprite, color) {
      this.addTempElement((0, _pixiHelp.highlightSprite)(sprite, color));
    }
  }, {
    key: "addTempElement",
    value: function addTempElement(element) {
      this.tempElements.push(element);
      this.view.container.addChild(element);
    }
  }, {
    key: "removeTempElements",
    value: function removeTempElements() {
      var _this4 = this;

      this.tempElements.forEach(function (element) {
        _this4.view.container.removeChild(element);
      });
      this.tempElements = [];
    }
  }]);

  return SituationRunner;
}();

exports["default"] = SituationRunner;

},{"./pixi-help":7,"./policies":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */
var Situation =
/*#__PURE__*/
function () {
  function Situation(view) {
    _classCallCheck(this, Situation);

    this.view = view;
    this.sprites = [];
  }

  _createClass(Situation, [{
    key: "addSprite",
    value: function addSprite(sprite) {
      this.sprites.push(sprite);
      this.view.container.addChild(sprite);
    }
  }, {
    key: "clearSprites",
    value: function clearSprites() {
      var _this = this;

      this.sprites.forEach(function (aSprite) {
        _this.view.container.removeChild(aSprite);
      });
    }
  }, {
    key: "setup",
    value: function setup() {}
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "teardown",
    value: function teardown() {}
  }, {
    key: "getElements",
    value: function getElements() {}
  }, {
    key: "getDecisions",
    value: function getDecisions() {}
  }, {
    key: "getDescription",
    value: function getDescription() {}
  }], [{
    key: "registerSituation",
    value: function registerSituation(key, aSituation) {
      Situation.situations[key] = aSituation;
    }
  }, {
    key: "getSituation",
    value: function getSituation(key) {
      return Situation.situations[key];
    }
  }]);

  return Situation;
}();

exports["default"] = Situation;
Situation.situations = {};

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

var _sceneElement = _interopRequireDefault(require("../scene-element"));

var _situation = _interopRequireDefault(require("../situation"));

var _car = _interopRequireDefault(require("../car"));

var _lanes = require("../lanes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BUS_STOP_X = _constants.VIEW_SIZE / 2 - _constants.BORDER_BLOCK_SIZE + _constants.SPRITE_WIDTH / 2;
var BUS_STOP_Y = -0.06 * _constants.VIEW_SIZE;
var TRUCK_STOP_POSITION = 0.45;
var BLACK_CAR_STOP_POSITION = 0.38;
var AGENT_STOP_POSITION = 0.45;

var CarEntersLaneSituation =
/*#__PURE__*/
function (_Situation) {
  _inherits(CarEntersLaneSituation, _Situation);

  function CarEntersLaneSituation(view) {
    var _this;

    _classCallCheck(this, CarEntersLaneSituation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CarEntersLaneSituation).call(this, view));
    _this.agentLane = _lanes.LANES[2];
    _this.parkedLane = _this.agentLane.oppositeLane;
    _this.blackCar = new _car["default"](view, 'assets/images/car_black.png');
    _this.truck = new _car["default"](view, 'assets/images/small_truck.png');
    _this.busStop = new _sceneElement["default"](view, 'assets/images/bus_stop.png', new PIXI.Point(BUS_STOP_X, BUS_STOP_Y));
    return _this;
  }

  _createClass(CarEntersLaneSituation, [{
    key: "setup",
    value: function setup() {
      return this.busStop.show();
    }
  }, {
    key: "teardown",
    value: function teardown() {
      this.busStop.hide();
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      return this.moveTruckInPosition().then(function () {
        return _this2.moveBlackCarInPosition();
      }).then(function () {
        return _this2.moveAgentInPosition();
      }).then(function () {
        return _this2.blackCarCrossesLane();
      });
    }
  }, {
    key: "getElements",
    value: function getElements() {
      return [{
        sprite: this.view.agentCar.sprite,
        color: 0x3220DE,
        name: 'Autonomous car',
        description: 'Property value: medium',
        placement: 'down'
      }, {
        sprite: this.blackCar.sprite,
        color: 0xDE3220,
        name: 'Luxury car',
        description: 'Suddenly enters your lane.<br>Property Value: high<br>Insurance: yes',
        placement: 'up'
      }, {
        sprite: this.truck.sprite,
        color: 0xDE3220,
        name: 'Parked car',
        description: 'Passengers: 4<br>Property value: low<br>Insurance: none',
        placement: 'left'
      }, {
        sprite: this.busStop.sprite,
        color: 0xDE3220,
        name: 'Bus Stop',
        description: 'People: 10<br>Property value: medium',
        placement: 'right'
      }];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this3 = this;

      return {
        humanist: {
          text: 'Turning left will risk 4 lives. Turning right with certainly kill people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities, so it’s the action taken',
          actionFunction: function actionFunction() {
            return _this3.decisionAdvace();
          }
        },
        profit: {
          text: 'the car ahead is very expensive, so braking is not recommended. Turning right will risk high payouts to the victims or their families. Solution: turn left towards the parked car, as it is cheap and if the risk of casualties is lower.',
          actionFunction: function actionFunction() {
            return _this3.decisionTurnLeft();
          }
        },
        protector: {
          text: 'breaking and turning left mean crashing into heavy, hard objects and potentially harming you. Solution: turning right has almost no risk for you and your car, as people are softer than cars.',
          actionFunction: function actionFunction() {
            return _this3.decisionTurnRight();
          }
        }
      };
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return 'A car enters your lane and there is no time to break. The car can either crash against it, turn left and crash against a parked car, or turn right and drive over a bus stop full of people';
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "decisionAdvace",
    value: function decisionAdvace() {
      return this.view.agentCar.driveInLaneUntilPosition(this.agentLane.getCarPosition(this.blackCar));
    }
  }, {
    key: "decisionTurnLeft",
    value: function decisionTurnLeft() {
      this.view.agentCar.crossLane();
    }
  }, {
    key: "decisionTurnRight",
    value: function decisionTurnRight() {
      this.view.agentCar.x += _constants.STREET_LANE_OFFSET * 2;
    }
  }, {
    key: "moveTruckInPosition",
    value: function moveTruckInPosition() {
      this.addSprite(this.truck.sprite);
      this.truck.placeInLane(this.parkedLane);
      return this.truck.driveInLaneUntilPosition(TRUCK_STOP_POSITION);
    }
  }, {
    key: "moveBlackCarInPosition",
    value: function moveBlackCarInPosition() {
      this.addSprite(this.blackCar.sprite);
      this.blackCar.placeInLane(this.parkedLane);
      return this.blackCar.driveInLaneUntilPosition(BLACK_CAR_STOP_POSITION);
    }
  }, {
    key: "moveAgentInPosition",
    value: function moveAgentInPosition() {
      this.view.agentCar.placeInLane(this.agentLane);
      return this.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION);
    }
  }, {
    key: "blackCarCrossesLane",
    value: function blackCarCrossesLane() {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4.blackCar.crossLane();

        resolve();
      });
    }
  }]);

  return CarEntersLaneSituation;
}(_situation["default"]);

exports["default"] = CarEntersLaneSituation;

_situation["default"].registerSituation('car-enters-lane', CarEntersLaneSituation);

},{"../car":1,"../constants":2,"../lanes":5,"../scene-element":10,"../situation":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sceneElement = _interopRequireDefault(require("../scene-element"));

var _car = _interopRequireDefault(require("../car"));

var _situation = _interopRequireDefault(require("../situation"));

var _lanes = require("../lanes");

var _pixiHelp = require("../pixi-help");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AGENT_LANE = 4;
var CROSSING_CAR_POSITION = 1 / 4;
var AGENT_CAR_POSITION = 1 / 2 + 1 / 8;
var AMBULANCE_POSITION = 1 / 2 + 1 / 32;
var childStartPos = (0, _pixiHelp.screenPosFromFraction)(1 / 4 + 1 / 32, 1 / 16);

var ChildRunsSituation =
/*#__PURE__*/
function (_Situation) {
  _inherits(ChildRunsSituation, _Situation);

  function ChildRunsSituation(view) {
    var _this;

    _classCallCheck(this, ChildRunsSituation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChildRunsSituation).call(this, view));
    _this.agentLane = _lanes.LANES[AGENT_LANE];
    _this.oppositeLane = _this.agentLane.oppositeLane;
    _this.child = new _sceneElement["default"](_this.view, 'assets/images/child.png', childStartPos);
    _this.crossingCar = new _car["default"](_this.view, 'assets/images/blue_car.png');
    _this.ambulance = new _car["default"](_this.view, 'assets/images/ambulance.png');
    return _this;
  }

  _createClass(ChildRunsSituation, [{
    key: "setup",
    value: function setup() {
      return this.child.show();
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      return this.moveCrossingCarInPosition().then(function () {
        return _this2.moveAgentInPosition();
      }).then(function () {
        return _this2.moveAmbulanceInPosition();
      }).then(function () {
        return _this2.childRuns();
      });
    }
  }, {
    key: "teardown",
    value: function teardown() {
      this.child.hide();
    }
  }, {
    key: "getElements",
    value: function getElements() {
      return [{
        sprite: this.ambulance.sprite,
        color: 0x3220DE,
        name: 'Ambulance',
        description: 'Carrying a patient to the hospital'
      }, {
        sprite: this.child.sprite,
        color: 0xDE3220,
        name: 'Child',
        description: 'Suddenly run in the street'
      }, {
        sprite: this.crossingCar.sprite,
        color: 0xDE3220,
        name: 'A Car',
        description: 'Probably will not stop'
      }];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this3 = this;

      return {
        humanist: {
          text: 'both breaking and continuing have a high risk on human lives, so crash onto the car parked on the left.',
          actionFunction: function actionFunction() {
            return _this3.decisionCrashCrossingCar();
          }
        },
        profit: {
          text: 'the child appeared out of nowhere and you had a green light, so you are protected by the law. Breaking or turning left will incur in higher car damage and costs.',
          actionFunction: function actionFunction() {
            return _this3.decisionAdvance();
          }
        },
        protector: {
          text: 'breaking or turning left will damage the car and potentially hurt you, continuing will only produce minor aesthetical damage in the car.',
          actionFunction: function actionFunction() {
            return _this3.decisionAdvance();
          }
        }
      };
    }
  }, {
    key: "decisionAdvance",
    value: function decisionAdvance() {
      return this.view.agentCar.driveInLaneUntilPosition(0.75);
    }
  }, {
    key: "decisionCrashCrossingCar",
    value: function decisionCrashCrossingCar() {
      this.view.agentCar.crossLane();
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return 'When reaching a crossing and having a green light, a child suddenly runs onto the street from behind a parked car. At the same time, an ambulance with lights and siren is coming behind you fast.';
    }
  }, {
    key: "moveCrossingCarInPosition",
    value: function moveCrossingCarInPosition() {
      this.addSprite(this.crossingCar.sprite);
      this.crossingCar.placeInLane(this.oppositeLane);
      return this.crossingCar.driveInLaneUntilPosition(CROSSING_CAR_POSITION);
    }
  }, {
    key: "moveAgentInPosition",
    value: function moveAgentInPosition() {
      this.view.agentCar.placeInLane(this.agentLane);
      return this.view.agentCar.driveInLaneUntilPosition(AGENT_CAR_POSITION);
    }
  }, {
    key: "moveAmbulanceInPosition",
    value: function moveAmbulanceInPosition() {
      this.addSprite(this.ambulance.sprite);
      this.ambulance.placeInLane(this.agentLane);
      return this.ambulance.driveInLaneUntilPosition(AMBULANCE_POSITION);
    }
  }, {
    key: "childRuns",
    value: function childRuns() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        (0, _pixiHelp.moveToFraction)(_this4.child.sprite, 9 / 32, 1 / 8);
        resolve('ran');
      });
    }
  }]);

  return ChildRunsSituation;
}(_situation["default"]);

exports["default"] = ChildRunsSituation;

_situation["default"].registerSituation('child-runs', ChildRunsSituation);

},{"../car":1,"../lanes":5,"../pixi-help":7,"../scene-element":10,"../situation":12}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sceneElement = _interopRequireDefault(require("../scene-element"));

var _car = _interopRequireDefault(require("../car"));

var _situation = _interopRequireDefault(require("../situation"));

var _constants = require("../constants");

var _lanes = require("../lanes");

var _pixiHelp = require("../pixi-help");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AGENT_LANE = 1;
var CYCLIST_STOP_POSITION = 3 / 8;
var AGENT_STOP_POSITION = 3 / 8;
var SETUP_TIME = 1000;
var TREE_FALL_TIME = 250;
var CRASH_TIME = 250;

var TreeFallsSituation =
/*#__PURE__*/
function (_Situation) {
  _inherits(TreeFallsSituation, _Situation);

  function TreeFallsSituation(view) {
    var _this;

    _classCallCheck(this, TreeFallsSituation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeFallsSituation).call(this, view));
    _this.waterPuddle = new _sceneElement["default"](_this.view, 'assets/images/water_puddle.png', (0, _pixiHelp.screenPosFromFraction)(1 / 8, 3 / 8 + 1 / 16));
    _this.tree = new _sceneElement["default"](_this.view, 'assets/images/tree.png', (0, _pixiHelp.screenPosFromFraction)(1 / 16, 0.5));
    _this.cyclist = new _car["default"](_this.view, 'assets/images/cyclist.png');
    _this.agentLane = _lanes.LANES[AGENT_LANE];
    _this.bicycleLane = _this.agentLane.oppositeLane;
    return _this;
  }

  _createClass(TreeFallsSituation, [{
    key: "setup",
    value: function setup() {
      var _this2 = this;

      this.tree.reset();
      this.waterPuddle.reset();
      return this.tree.fadeIn(250).then(function () {
        return _this2.waterPuddle.fadeIn(250);
      });
    }
  }, {
    key: "start",
    value: function start() {
      return Promise.all([this.moveAgentInPosition(), this.moveCyclistInPosition(), this.fellTree()]);
    }
  }, {
    key: "teardown",
    value: function teardown() {
      this.tree.hide();
      this.waterPuddle.hide();
      this.cyclist.hide();
    }
  }, {
    key: "getElements",
    value: function getElements() {
      return [{
        sprite: this.view.agentCar.sprite,
        color: 0x3220DE,
        name: 'Autonomous car',
        description: 'Property value: medium<br><b>Warning! Front passenger not wearing seat belt.</b>',
        placement: 'down'
      }, {
        sprite: this.cyclist.sprite,
        color: 0xDE3220,
        name: 'Cyclist',
        description: 'Insurance: unknown',
        placement: 'up'
      }, {
        sprite: this.tree.sprite,
        color: 0xDE3220,
        name: 'Fallen Tree',
        description: 'Hard. Try not to crash unto it.',
        placement: 'left'
      }];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this3 = this;

      return {
        humanist: {
          text: 'a sudden break would send the passenger without seatbelt forward through the glass, potentially killing them. Swerving might avoid the collision with the tree, but could also harm the passenger. Solution: turn right and break, crashing into the tree softly, with the passenger without seatbelt protected by the one on its side and by its airbag.',
          actionFunction: function actionFunction() {
            return _this3.softlyCrashTree();
          }
        },
        profit: {
          text: 'Crashing with the tree will cost the insurers money. Swerving might avoid the collision with the tree, but as the floor is wet it could also potentially turn around the car, damaging it. As the car has warned the passenger to wear the seat belt but they have not, any injury will be their own responsibility. Changing lanes would kill the cyclist, but its insurance status is unknown, so its a financial risk. Solution: a sudden break, fully protecting the car and passengers that wear a seat belt.',
          actionFunction: function actionFunction() {
            return _this3.fullBreak();
          }
        },
        protector: {
          text: 'Crashing with the tree or swerving would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.',
          actionFunction: function actionFunction() {
            return _this3.crashCyclist();
          }
        }
      };
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return 'a tree falls in front of the car. The person in the front passenger seat has no seat belt. A cyclist is riding through the opposite lane. Options: Sudden break, slow down and turn left, slow down and turn right.';
    }
  }, {
    key: "moveCyclistInPosition",
    value: function moveCyclistInPosition() {
      this.cyclist.show();
      this.cyclist.placeInLane(this.bicycleLane);
      return this.cyclist.driveInLaneUntilPosition(CYCLIST_STOP_POSITION, SETUP_TIME);
    }
  }, {
    key: "moveAgentInPosition",
    value: function moveAgentInPosition() {
      this.view.agentCar.placeInLane(this.agentLane);
      return this.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION, SETUP_TIME);
    }
  }, {
    key: "fellTree",
    value: function fellTree() {
      var _this4 = this;

      return new Promise(function (resolve) {
        new TWEEN.Tween(_this4.tree.sprite).to({
          angle: 90,
          x: _this4.tree.sprite.x + _constants.STREET_LANE_OFFSET * 1.5
        }, SETUP_TIME - TREE_FALL_TIME).easing(TWEEN.Easing.Quadratic.In).delay(TREE_FALL_TIME).onComplete(function () {
          return resolve('fell');
        }).start();
      });
    }
  }, {
    key: "crashCyclist",
    value: function crashCyclist() {
      var _this5 = this;

      var carMovement = new Promise(function (resolve) {
        new TWEEN.Tween(_this5.view.agentCar).to({
          x: _this5.view.agentCar.x + _constants.STREET_LANE_OFFSET * 2,
          y: _this5.view.agentCar.y + _constants.STREET_LANE_OFFSET * 2,
          angle: _this5.view.agentCar.angle - 45
        }, CRASH_TIME).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
          return resolve('crash');
        }).start();
      });
      var bicycleMovement = this.cyclist.driveInLaneUntilPosition(0.5, CRASH_TIME);
      return Promise.all([carMovement, bicycleMovement]);
    }
  }, {
    key: "fullBreak",
    value: function fullBreak() {
      return this.view.agentCar.driveInLaneUntilPosition(7 / 16, CRASH_TIME);
    }
  }, {
    key: "softlyCrashTree",
    value: function softlyCrashTree() {
      var _this6 = this;

      return new Promise(function (resolve) {
        new TWEEN.Tween(_this6.view.agentCar).to({
          x: _this6.view.agentCar.x - _constants.STREET_LANE_OFFSET,
          y: _this6.view.agentCar.y + _constants.STREET_LANE_OFFSET * 2,
          angle: _this6.view.agentCar.angle + 70
        }, CRASH_TIME).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
          return resolve('crash');
        }).start();
      });
    }
  }]);

  return TreeFallsSituation;
}(_situation["default"]);

exports["default"] = TreeFallsSituation;

_situation["default"].registerSituation('tree-falls', TreeFallsSituation);

},{"../car":1,"../constants":2,"../lanes":5,"../pixi-help":7,"../scene-element":10,"../situation":12}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tweenOpacity = tweenOpacity;

/* globals TWEEN, PIXI */
function tweenOpacity(element, toOpacity) {
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  return new Promise(function (resolve) {
    new TWEEN.Tween(element.style).to({
      opacity: toOpacity
    }, time).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
      return resolve('visible');
    }).start();
  });
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _car = _interopRequireDefault(require("./car"));

var _sceneElement = _interopRequireDefault(require("./scene-element"));

var _lanes = require("./lanes");

var _constants = require("./constants");

var _pixiHelp = require("./pixi-help");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View(element) {
    _classCallCheck(this, View);

    this.app = new PIXI.Application({
      width: _constants.VIEW_SIZE,
      height: _constants.VIEW_SIZE,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1
    });
    element.appendChild(this.app.view);
    this.container = new PIXI.Container();
    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;
    this.background = new _sceneElement["default"](this, 'assets/images/street.png', _pixiHelp.POINT_ZERO, 1);
    this.debugLayer = new _sceneElement["default"](this, 'assets/images/debug.png', _pixiHelp.POINT_ZERO, 1);
    this.agentCar = new _car["default"](this, 'assets/images/car.png');
    this.background.show();
    this.debugLayer.hide();

    this.afterIdleAction = function () {};
  }

  _createClass(View, [{
    key: "doIdleAnimation",
    value: function doIdleAnimation() {
      var currentLane = _lanes.LANES[Math.floor(Math.random() * _lanes.LANES.length)];

      this.agentCar.hide();
      this.agentCar.show();
      this.agentCar.placeInLane(currentLane, 0, true);
      return this.agentCar.driveInLaneUntilPosition(1.0, _constants.IDLE_ANIMATION_TIME);
    }
  }, {
    key: "startIdleAnimation",
    value: function startIdleAnimation() {
      var _this = this;

      this.afterIdleAction = this.startIdleAnimation;
      this.doIdleAnimation().then(function () {
        return _this.afterIdleAction();
      });
    }
  }, {
    key: "queueAction",
    value: function queueAction(action) {
      this.afterIdleAction = action;
    }
  }]);

  return View;
}();

exports["default"] = View;

},{"./car":1,"./constants":2,"./lanes":5,"./pixi-help":7,"./scene-element":10}]},{},[6]);
