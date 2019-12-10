(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var _pixiHelp = require("./pixi-help");

var _driveDirection = _interopRequireDefault(require("./drive-direction"));

var _lane = require("./lane");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    this.currentLane = lane;
    this.driveDirection = lane.driveDirection;
  }

  _createClass(Car, [{
    key: "update",
    value: function update(elapsed) {
      this.x += this.driveDirection.carSpeed.x * elapsed;
      this.y += this.driveDirection.carSpeed.y * elapsed;
    }
  }, {
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
      this.driveDirection = this.lane.driveDirection;
      this.sprite.angle = this.lane.driveDirection.carAngle;
    }
  }, {
    key: "driveInLaneUntilPosition",
    value: function driveInLaneUntilPosition() {
      var _this = this;

      var endPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
      // force driving direction, or it might never stop
      this.forceLaneDirection();
      return new Promise(function (resolve) {
        var update = function update() {
          if (_this.lane.getCarPosition(_this) >= endPosition) {
            _this.view.app.ticker.remove(update);

            resolve('arrived');
          }

          _this.update(_this.view.app.ticker.deltaTime);
        };

        _this.view.app.ticker.add(update);
      });
    }
  }, {
    key: "turnAround",
    value: function turnAround() {
      this.driveDirection = new _driveDirection["default"](360 - this.driveDirection.carAngle, -this.driveDirection.speedX, -this.driveDirection.speedY);
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
  }]);

  return Car;
}();

exports["default"] = Car;

},{"./constants":2,"./drive-direction":3,"./lane":4,"./pixi-help":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OFF_SCREEN_LIMIT = exports.STREET_LANE_OFFSET = exports.STREET_Y_OFFSET = exports.STREET_X_OFFSET = exports.DEFAULT_SPEED = exports.VIEW_SIZE = exports.CAR_SCALE = exports.GLOBAL_SCALE = void 0;
var GLOBAL_SCALE = 0.75;
exports.GLOBAL_SCALE = GLOBAL_SCALE;
var CAR_SCALE = 0.25 * GLOBAL_SCALE;
exports.CAR_SCALE = CAR_SCALE;
var VIEW_SIZE = 1024 * GLOBAL_SCALE;
exports.VIEW_SIZE = VIEW_SIZE;
var DEFAULT_SPEED = 10 * GLOBAL_SCALE;
exports.DEFAULT_SPEED = DEFAULT_SPEED;
var STREET_X_OFFSET = 1 / 4 * VIEW_SIZE;
exports.STREET_X_OFFSET = STREET_X_OFFSET;
var STREET_Y_OFFSET = 1 / 4 * VIEW_SIZE;
exports.STREET_Y_OFFSET = STREET_Y_OFFSET;
var STREET_LANE_OFFSET = 1 / 40 * VIEW_SIZE;
exports.STREET_LANE_OFFSET = STREET_LANE_OFFSET;
var OFF_SCREEN_LIMIT = (1 / 2 + 1 / 10) * VIEW_SIZE;
exports.OFF_SCREEN_LIMIT = OFF_SCREEN_LIMIT;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DriveDirection =
/*#__PURE__*/
function () {
  function DriveDirection(carAngle, speedX, speedY) {
    _classCallCheck(this, DriveDirection);

    this.carAngle = carAngle;
    this.carSpeed = new PIXI.Point(speedX, speedY);
  }

  _createClass(DriveDirection, [{
    key: "isVertical",
    value: function isVertical() {
      return this.carSpeed.x === 0;
    }
  }, {
    key: "isHorizontal",
    value: function isHorizontal() {
      return this.carSpeed.y === 0;
    }
  }]);

  return DriveDirection;
}();

exports["default"] = DriveDirection;
DriveDirection.LEFT = new DriveDirection(270, -_constants.DEFAULT_SPEED, 0);
DriveDirection.RIGHT = new DriveDirection(90, _constants.DEFAULT_SPEED, 0);
DriveDirection.UP = new DriveDirection(0, 0, -_constants.DEFAULT_SPEED);
DriveDirection.DOWN = new DriveDirection(180, 0, _constants.DEFAULT_SPEED);

},{"./constants":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NO_LANE = exports.Lane = void 0;

var _driveDirection = _interopRequireDefault(require("./drive-direction"));

var _pixiHelp = require("./pixi-help");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Lane =
/*#__PURE__*/
function () {
  function Lane(start, end, driveDirection) {
    _classCallCheck(this, Lane);

    this.start = start;
    this.end = end;
    this.driveDirection = driveDirection;
    this.oppositeLane = null;
  }

  _createClass(Lane, [{
    key: "isVertical",
    value: function isVertical() {
      return this.driveDirection.isVertical();
    }
  }, {
    key: "isHorizontal",
    value: function isHorizontal() {
      return this.driveDirection.isHorizontal();
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
var NO_LANE = new Lane(_pixiHelp.POINT_ZERO, new PIXI.Point(1, 0), _driveDirection["default"].RIGHT);
exports.NO_LANE = NO_LANE;

},{"./drive-direction":3,"./pixi-help":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LANES = void 0;

var _lane = require("./lane");

var _driveDirection = _interopRequireDefault(require("./drive-direction"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* globals PIXI */
function createHorizontalLane(verticalOffset, driveDirection) {
  var dirMultiplier = driveDirection.carSpeed.x > 0 ? -1 : 1;
  return new _lane.Lane(new PIXI.Point(_constants.OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset), new PIXI.Point(-_constants.OFF_SCREEN_LIMIT * dirMultiplier, -verticalOffset), driveDirection);
}

function createVerticalLane(horizontalOffset, driveDirection) {
  var dirMultiplier = driveDirection.carSpeed.y > 0 ? -1 : 1;
  return new _lane.Lane(new PIXI.Point(-horizontalOffset, _constants.OFF_SCREEN_LIMIT * dirMultiplier), new PIXI.Point(-horizontalOffset, -_constants.OFF_SCREEN_LIMIT * dirMultiplier), driveDirection);
} // eslint-disable-next-line import/prefer-default-export


var LANES = [createVerticalLane(_constants.STREET_X_OFFSET - _constants.STREET_LANE_OFFSET, _driveDirection["default"].UP), createVerticalLane(_constants.STREET_X_OFFSET + _constants.STREET_LANE_OFFSET, _driveDirection["default"].DOWN), createVerticalLane(-_constants.STREET_X_OFFSET - _constants.STREET_LANE_OFFSET, _driveDirection["default"].UP), createVerticalLane(-_constants.STREET_X_OFFSET + _constants.STREET_LANE_OFFSET, _driveDirection["default"].DOWN), createHorizontalLane(_constants.STREET_Y_OFFSET + _constants.STREET_LANE_OFFSET, _driveDirection["default"].LEFT), createHorizontalLane(_constants.STREET_Y_OFFSET - _constants.STREET_LANE_OFFSET, _driveDirection["default"].RIGHT), createHorizontalLane(-_constants.STREET_Y_OFFSET + _constants.STREET_LANE_OFFSET, _driveDirection["default"].LEFT), createHorizontalLane(-_constants.STREET_Y_OFFSET - _constants.STREET_LANE_OFFSET, _driveDirection["default"].RIGHT)];
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

},{"./constants":2,"./drive-direction":3,"./lane":4}],6:[function(require,module,exports){
"use strict";

var _view = _interopRequireDefault(require("./view"));

var _situation = _interopRequireDefault(require("./situation"));

var _situationRunner = _interopRequireDefault(require("./situation-runner"));

require("./situations/car-enters-lane");

require("./situations/tree-falls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* globals $ */
var view = new _view["default"]($('#game')[0]);
var runner = new _situationRunner["default"](view);
$('#startButton').on('click', function () {
  var policyID = $('#option_policy').val();
  var situationID = $('#option_situation').val();

  var SituationClass = _situation["default"].getSituation(situationID);

  view.queueAction(function () {
    runner.run(new SituationClass(view), policyID);
  });
});
view.startIdleAnimation();

},{"./situation":11,"./situation-runner":10,"./situations/car-enters-lane":12,"./situations/tree-falls":13,"./view":14}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSprite = createSprite;
exports.POINT_ZERO = void 0;

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

var POINT_ZERO = new PIXI.Point(0, 0);
exports.POINT_ZERO = POINT_ZERO;

},{}],8:[function(require,module,exports){
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
  }

  _createClass(SceneElement, [{
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

},{"./constants":2,"./pixi-help":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _policies = require("./policies");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SituationRunner =
/*#__PURE__*/
function () {
  function SituationRunner(view) {
    _classCallCheck(this, SituationRunner);

    this.view = view;
    this.currentDecision = null;
    this.infoElements = [];
  }

  _createClass(SituationRunner, [{
    key: "run",
    value: function run(situation, policyID) {
      var _this = this;

      this.currentDecision = situation.getDecisions()[policyID];
      situation.setup();
      situation.start().then(function () {
        return _this.waitForKeyPress();
      }).then(function () {
        return _this.highlight(situation.getElements());
      }).then(function () {
        return _this.waitForKeyPress();
      }).then(function () {
        return _this.removeHighligts();
      }).then(function () {
        return _this.showDecision(situation, policyID);
      }).then(function () {
        return _this.waitForKeyPress();
      }).then(function () {
        return _this.hideDecision();
      }).then(function () {
        return _this.playOutDecision();
      }).then(function () {
        return _this.waitForKeyPress();
      }).then(function () {
        return situation.clearSprites();
      }).then(function () {
        return situation.teardown();
      }).then(function () {
        return _this.view.startIdleAnimation();
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
    key: "highlight",
    value: function highlight(elements) {
      var _this2 = this;

      return new Promise(function (resolve) {
        elements.forEach(function (element) {
          _this2.highlightSprite(element.sprite, element.color, element.text, element.placement);
        });
        resolve('highlight');
      });
    }
  }, {
    key: "removeHighligts",
    value: function removeHighligts() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.infoElements.forEach(function (element) {
          _this3.view.container.removeChild(element);
        });

        resolve('clean');
      });
    }
  }, {
    key: "highlightSprite",
    value: function highlightSprite(sprite, color, text) {
      var placement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'right';
      var graphics = new PIXI.Graphics();
      graphics.beginFill(color, 0.5);
      graphics.drawRect(sprite.x - sprite.width / 2, sprite.y - sprite.height / 2, sprite.width, sprite.height);
      graphics.endFill();
      this.infoElements.push(graphics);
      this.view.container.addChild(graphics);
      this.addInfoText(sprite, text, placement);
    }
  }, {
    key: "addInfoText",
    value: function addInfoText(sprite, text) {
      var placement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'right';
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : SituationRunner.InfoBoxStyle;
      var infoText = new PIXI.Text(text, style);
      infoText.x = sprite.x - sprite.width / 2;
      infoText.y = sprite.y - sprite.height / 2;

      switch (placement) {
        case 'right':
          infoText.x += sprite.width;
          break;

        case 'left':
          infoText.x -= sprite.width + SituationRunner.InfoTextSize;
          break;

        case 'up':
          infoText.y -= sprite.height + SituationRunner.InfoTextSize;
          break;

        case 'down':
          infoText.y += sprite.height;
          break;

        default:
          infoText.x += sprite.width;
          break;
      }

      this.infoElements.push(infoText);
      this.view.container.addChild(infoText);
    }
  }, {
    key: "showDecision",
    value: function showDecision(situation, policyID) {
      document.getElementById('report_decision').innerHTML = this.currentDecision.text;
      document.getElementById('report_policy_name').innerHTML = _policies.Policies[policyID].name;
      document.getElementById('report_policy_objective').innerHTML = _policies.Policies[policyID].objective;
      document.getElementById('report_situation_description').innerHTML = situation.getDescription();
      return this.setVisible('report', 'visible');
    }
  }, {
    key: "hideDecision",
    value: function hideDecision() {
      return this.setVisible('report', 'hidden');
    }
  }, {
    key: "setVisible",
    value: function setVisible(elementName) {
      var visibility = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'visible';
      document.getElementById(elementName).style.visibility = visibility;
    }
  }, {
    key: "playOutDecision",
    value: function playOutDecision() {
      return this.currentDecision.actionFunction();
    }
  }]);

  return SituationRunner;
}();

exports["default"] = SituationRunner;
SituationRunner.InfoTextSize = 80;
SituationRunner.InfoBoxStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 16,
  fill: '#000000',
  wordWrap: true,
  wordWrapWidth: SituationRunner.InfoTextSize + 20
});

},{"./policies":8}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

var BUS_STOP_X = -0.16 * _constants.VIEW_SIZE;
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
    _this.agentLane = _lanes.LANES[0];
    _this.parkedLane = _this.agentLane.oppositeLane;
    _this.blackCar = new _car["default"](view, 'assets/images/car_black.png');
    _this.truck = new _car["default"](view, 'assets/images/small_truck.png');
    _this.busStop = new _sceneElement["default"](view, 'assets/images/bus_stop.png', new PIXI.Point(BUS_STOP_X, BUS_STOP_Y)); // // bind methods for use as pointers
    // this.carCrossLane = this.carCrossLane.bind(this);
    // this.decisionAdvace = this.decisionAdvace.bind(this);
    // this.decisionTurnLeft = this.decisionTurnLeft.bind(this);
    // this.decisionTurnRight = this.decisionTurnRight.bind(this);
    // this.moveTruckInPosition = this.moveTruckInPosition.bind(this);
    // this.moveBlackCarInPosition = this.moveBlackCarInPosition.bind(this);
    // this.moveAgentInPosition = this.moveAgentInPosition.bind(this);
    // this.blackCarCrossesLane = this.blackCarCrossesLane.bind(this);

    return _this;
  }

  _createClass(CarEntersLaneSituation, [{
    key: "setup",
    value: function setup() {
      this.busStop.show();
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
        text: 'autonomous car\nProperty value: medium',
        placement: 'down'
      }, {
        sprite: this.blackCar.sprite,
        color: 0xDE3220,
        text: 'car entering lane\nPassengers: 1\nProperty Value: high\nInsurance: yes',
        placement: 'up'
      }, {
        sprite: this.truck.sprite,
        color: 0xDE3220,
        text: 'parked car\nPassengers: 4\nProperty value: low\nInsurance: none',
        placement: 'left'
      }, {
        sprite: this.busStop.sprite,
        color: 0xDE3220,
        text: 'bus stop\nPeople: 10\nProperty value: medium',
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
    key: "carCrossLane",
    value: function carCrossLane(car, startingLane) {
      car.placeInLane(startingLane.oppositeLane, 1 - startingLane.getCarPosition(car), false);
    }
  }, {
    key: "decisionAdvace",
    value: function decisionAdvace() {
      return this.view.agentCar.driveInLaneUntilPosition(this.agentLane.getCarPosition(this.blackCar));
    }
  }, {
    key: "decisionTurnLeft",
    value: function decisionTurnLeft() {
      this.carCrossLane(this.view.agentCar, this.agentLane, false);
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
        _this4.carCrossLane(_this4.blackCar, _this4.parkedLane);

        resolve();
      });
    }
  }]);

  return CarEntersLaneSituation;
}(_situation["default"]);

exports["default"] = CarEntersLaneSituation;

_situation["default"].registerSituation('car-enters-lane', CarEntersLaneSituation);

},{"../car":1,"../constants":2,"../lanes":5,"../scene-element":9,"../situation":11}],13:[function(require,module,exports){
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

var TREE_STOP_POSITION = 0.45;
var CYCLIST_STOP_POSITION = 0.40;

var TreeFallsSituation =
/*#__PURE__*/
function (_Situation) {
  _inherits(TreeFallsSituation, _Situation);

  function TreeFallsSituation(view) {
    var _this;

    _classCallCheck(this, TreeFallsSituation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeFallsSituation).call(this, view));
    _this.waterPuddle = new _sceneElement["default"](_this.view, 'assets/images/water_puddle.png', new PIXI.Point(0.225 * _constants.VIEW_SIZE, -0.05 * _constants.VIEW_SIZE));
    _this.tree = new _sceneElement["default"](_this.view, 'assets/images/tree.png', new PIXI.Point(0.18 * _constants.VIEW_SIZE, 0));
    _this.cyclist = new _car["default"](_this.view, 'assets/images/cyclist.png');
    _this.agentLane = _lanes.LANES[3];
    _this.bicycleLane = _this.agentLane.oppositeLane; // this.moveCyclistInPosition = this.moveCyclistInPosition.bind(this);
    // this.moveAgentInPosition = this.moveAgentInPosition.bind(this);
    // this.fellTree = this.fellTree.bind(this);

    return _this;
  }

  _createClass(TreeFallsSituation, [{
    key: "setup",
    value: function setup() {
      this.tree.reset();
      this.tree.show();
      this.waterPuddle.reset();
      this.waterPuddle.show();
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      return this.moveCyclistInPosition().then(function () {
        return _this2.moveAgentInPosition();
      }).then(function () {
        return _this2.fellTree();
      });
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
        text: 'autonomous car\nProperty value: medium',
        placement: 'down'
      }, {
        sprite: this.cyclist.sprite,
        color: 0xDE3220,
        text: 'A cyclist. Insurance: unknown',
        placement: 'up'
      }, {
        sprite: this.tree.sprite,
        color: 0xDE3220,
        text: 'A tree. It is hard.',
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
            _this3.view.agentCar.x -= _constants.STREET_LANE_OFFSET;
            _this3.view.agentCar.y += _constants.STREET_LANE_OFFSET;
          }
        },
        profit: {
          text: 'Crashing with the tree will cost the insurers money. Swerving might avoid the collision with the tree, but as the floor is wet it could also potentially turn around the car, damaging it. As the car has warned the passenger to wear the seat belt but they have not, any injury will be their own responsibility. Changing lanes would kill the cyclist, but its insurance status is unknown, so its a financial risk. Solution: a sudden break, fully protecting the car and passengers that wear a seat belt.',
          actionFunction: function actionFunction() {
            _this3.view.agentCar.y += _constants.STREET_LANE_OFFSET * 2;
          }
        },
        protector: {
          text: 'Crashing with the tree or swerving would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.',
          actionFunction: function actionFunction() {
            _this3.view.agentCar.x += _constants.STREET_LANE_OFFSET * 2;
            _this3.view.agentCar.y += _constants.STREET_LANE_OFFSET;
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
      return this.cyclist.driveInLaneUntilPosition(CYCLIST_STOP_POSITION);
    }
  }, {
    key: "moveAgentInPosition",
    value: function moveAgentInPosition() {
      this.view.agentCar.placeInLane(this.agentLane);
      return this.view.agentCar.driveInLaneUntilPosition(TREE_STOP_POSITION);
    }
  }, {
    key: "fellTree",
    value: function fellTree() {
      this.tree.sprite.x += _constants.STREET_LANE_OFFSET * 2;
      this.tree.sprite.angle = 90;
    }
  }]);

  return TreeFallsSituation;
}(_situation["default"]);

exports["default"] = TreeFallsSituation;

_situation["default"].registerSituation('tree-falls', TreeFallsSituation);

},{"../car":1,"../constants":2,"../lanes":5,"../scene-element":9,"../situation":11}],14:[function(require,module,exports){
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
    this.background = new _sceneElement["default"](this, 'assets/images/street.png', _pixiHelp.POINT_ZERO, _constants.GLOBAL_SCALE);
    this.agentCar = new _car["default"](this, 'assets/images/car.png');
    this.background.show();

    this.afterIdleAction = function () {};
  }

  _createClass(View, [{
    key: "doIdleAnimation",
    value: function doIdleAnimation() {
      var currentLane = _lanes.LANES[Math.floor(Math.random() * _lanes.LANES.length)];

      this.agentCar.hide();
      this.agentCar.show();
      this.agentCar.placeInLane(currentLane, 0, true);
      return this.agentCar.driveInLaneUntilPosition(1.0);
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

},{"./car":1,"./constants":2,"./lanes":5,"./pixi-help":7,"./scene-element":9}]},{},[6]);
