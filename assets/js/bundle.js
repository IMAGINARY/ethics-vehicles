(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sounds = exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sound =
/*#__PURE__*/
function () {
  function Sound() {
    _classCallCheck(this, Sound);

    for (var _len = arguments.length, mediaFiles = new Array(_len), _key = 0; _key < _len; _key++) {
      mediaFiles[_key] = arguments[_key];
    }

    this.media = mediaFiles.map(function (arg) {
      return new Audio(arg);
    });
  }

  _createClass(Sound, [{
    key: "getAudio",
    value: function getAudio() {
      var index = Math.floor(Math.random() * Math.floor(this.media.length));
      return this.media[index];
    }
  }, {
    key: "play",
    value: function play() {
      this.getAudio().play();
    }
  }]);

  return Sound;
}();

exports["default"] = Sound;
var Sounds = {
  crash500ms: new Sound('assets/audio/crash_500ms.mp3'),
  crash250ms: new Sound('assets/audio/crash_250ms.mp3'),
  carIdling2000ms: new Sound('assets/audio/passing_by_1_2000ms.mp3', 'assets/audio/passing_by_2_2000ms.mp3', 'assets/audio/passing_by_3_2000ms.mp3')
};
exports.Sounds = Sounds;
Object.freeze(Sounds);

},{}],2:[function(require,module,exports){
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
      var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TWEEN.Easing.Linear.None;
      var stopPosition = this.lane.getPositionCoordinates(endPosition);
      return new Promise(function (resolve) {
        new TWEEN.Tween(_this.sprite).to({
          x: stopPosition.x,
          y: stopPosition.y
        }, time).easing(easing).onComplete(function () {
          return resolve('arrived');
        }).start();
      });
    }
  }, {
    key: "advanceAndTurn",
    value: function advanceAndTurn(offsetPosition) {
      var _this2 = this;

      var offsetAngle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
      var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Linear.None;
      return new Promise(function (resolve) {
        new TWEEN.Tween(_this2).to({
          x: _this2.x + offsetPosition.x,
          y: _this2.y + offsetPosition.y,
          angle: _this2.angle + offsetAngle
        }, time).easing(easing).onComplete(function () {
          return resolve('crash');
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

},{"./constants":3,"./lane":5,"./pixi-help":9}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPRITE_WIDTH = exports.STREET_LANE_OFFSET = exports.BLOCK_SIZE = exports.STREET_WIDTH = exports.IDLE_ANIMATION_TIME = exports.DEFAULT_SPEED = exports.BorderBlockSize = exports.StreetOffsetFromCenter = exports.ViewSize = exports.CAR_SCALE = void 0;
var CAR_SCALE = 0.25;
exports.CAR_SCALE = CAR_SCALE;
var ViewSize = {
  width: 1920,
  height: 1080
};
exports.ViewSize = ViewSize;
var StreetOffsetFromCenter = {
  x: 560,
  y: 350
};
exports.StreetOffsetFromCenter = StreetOffsetFromCenter;
var BorderBlockSize = {
  width: 320,
  height: 110
};
exports.BorderBlockSize = BorderBlockSize;
var DEFAULT_SPEED = 15;
exports.DEFAULT_SPEED = DEFAULT_SPEED;
var IDLE_ANIMATION_TIME = 2000;
exports.IDLE_ANIMATION_TIME = IDLE_ANIMATION_TIME;
var STREET_WIDTH = 160;
exports.STREET_WIDTH = STREET_WIDTH;
var BLOCK_SIZE = 512;
exports.BLOCK_SIZE = BLOCK_SIZE;
var STREET_LANE_OFFSET = STREET_WIDTH / 4;
exports.STREET_LANE_OFFSET = STREET_LANE_OFFSET;
var SPRITE_WIDTH = 256 * CAR_SCALE;
exports.SPRITE_WIDTH = SPRITE_WIDTH;

},{}],4:[function(require,module,exports){
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

},{"./style-help":18}],5:[function(require,module,exports){
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

},{"./pixi-help":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LANES = void 0;

var _lane = require("./lane");

var _constants = require("./constants");

/* globals PIXI */
function createHorizontalLane(verticalOffset, dirMultiplier) {
  return new _lane.Lane(new PIXI.Point(_constants.ViewSize.width / 2 * dirMultiplier, -verticalOffset), new PIXI.Point(-(_constants.ViewSize.width / 2) * dirMultiplier, -verticalOffset));
}

function createVerticalLane(horizontalOffset, dirMultiplier) {
  return new _lane.Lane(new PIXI.Point(-horizontalOffset, _constants.ViewSize.height / 2 * dirMultiplier), new PIXI.Point(-horizontalOffset, -(_constants.ViewSize.height / 2) * dirMultiplier));
} // eslint-disable-next-line import/prefer-default-export


var LANES = [createVerticalLane(_constants.StreetOffsetFromCenter.x - _constants.STREET_LANE_OFFSET, 1), createVerticalLane(_constants.StreetOffsetFromCenter.x + _constants.STREET_LANE_OFFSET, -1), createVerticalLane(-_constants.StreetOffsetFromCenter.x - _constants.STREET_LANE_OFFSET, 1), createVerticalLane(-_constants.StreetOffsetFromCenter.x + _constants.STREET_LANE_OFFSET, -1), createHorizontalLane(_constants.StreetOffsetFromCenter.y + _constants.STREET_LANE_OFFSET, 1), createHorizontalLane(_constants.StreetOffsetFromCenter.y - _constants.STREET_LANE_OFFSET, -1), createHorizontalLane(-_constants.StreetOffsetFromCenter.y + _constants.STREET_LANE_OFFSET, 1), createHorizontalLane(-_constants.StreetOffsetFromCenter.y - _constants.STREET_LANE_OFFSET, -1)];
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

},{"./constants":3,"./lane":5}],7:[function(require,module,exports){
"use strict";

var _view = _interopRequireDefault(require("./view"));

require("./situations/car-enters-lane");

require("./situations/tree-falls");

require("./situations/child-runs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* globals $ */
var view = new _view["default"]($('#game')[0]);
/*
$('#debugButton').on('click', () => {
  if (view.debugLayer.visible)
    view.debugLayer.hide();
  else
    view.debugLayer.show();
});
*/

view.start();

},{"./situations/car-enters-lane":15,"./situations/child-runs":16,"./situations/tree-falls":17,"./view":19}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styleHelp = require("./style-help");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyArrowUp = 38;
var KeyArrowDown = 40;
var KeyEnter = 13; // example use

var Menu =
/*#__PURE__*/
function () {
  function Menu(elementId, optionsArray, title) {
    _classCallCheck(this, Menu);

    this.currentOption = 0;
    this.visible = false;
    this.options = Array.from(optionsArray);
    this.titleText = title;
    this.htmlElement = $("#".concat(elementId));
    this.optionsArea = this.htmlElement.find('#menu_options_area');
    this.cursor = this.htmlElement.find('#menu_cursor');
    this.title = this.htmlElement.find('#menu_title');
  }

  _createClass(Menu, [{
    key: "show",
    value: function show() {
      var _this = this;

      this.createHTMLOptions();
      this.currentOption = 0;
      this.title.text(this.titleText);

      window.onkeydown = function (event) {
        switch (event.which) {
          case KeyArrowUp:
            _this.up();

            break;

          case KeyArrowDown:
            _this.down();

            break;

          case KeyEnter:
            _this.enterOption();

            break;
        }
      };

      this.updateCursorPosition();
      this.htmlElement.show();
      this.fadeInCursor();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.htmlElement.hide();

      window.onkeydown = function () {};

      this.clearHTML();
    }
  }, {
    key: "fadeInCursor",
    value: function fadeInCursor() {
      var domCursor = this.cursor[0];
      domCursor.style.opacity = 0;
      return (0, _styleHelp.tweenOpacity)(domCursor, 1, 500).then(function () {
        return (0, _styleHelp.tweenOpacity)(domCursor, 0.125, 500);
      }).then(function () {
        return (0, _styleHelp.tweenOpacity)(domCursor, 1, 500);
      });
    }
  }, {
    key: "createHTMLOptions",
    value: function createHTMLOptions() {
      this.options.forEach(function (element) {
        var button = $("<input type=\"button\" value=\"".concat(element.text, "\" class=\"menu_option\">"));
        $('#menu_options_area').append(button);
        button.click(element.action);
      });
    }
  }, {
    key: "clearHTML",
    value: function clearHTML() {
      this.optionsArea.empty();
    }
  }, {
    key: "enterOption",
    value: function enterOption() {
      var action = this.options[this.currentOption].action;
      this.hide();
      action();
    }
  }, {
    key: "down",
    value: function down() {
      if (this.currentOption < this.options.length - 1) this.currentOption++;
      this.updateCursorPosition();
    }
  }, {
    key: "up",
    value: function up() {
      if (this.currentOption > 0) this.currentOption--;
      this.updateCursorPosition();
    }
  }, {
    key: "updateCursorPosition",
    value: function updateCursorPosition() {
      this.cursor.css('margin-top', 15 + this.currentOption * 75 + "px");
    }
  }]);

  return Menu;
}();

exports["default"] = Menu;

},{"./style-help":18}],9:[function(require,module,exports){
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
exports.pixiMoveTo = pixiMoveTo;
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
  graphics.drawRoundedRect(sprite.x - sprite.width / 2 - 10, sprite.y - sprite.height / 2 - 10, sprite.width + 20, sprite.height + 20, 10);
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
  return new PIXI.Point((x - 0.5) * _constants.ViewSize.width, (y - 0.5) * _constants.ViewSize.height);
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

function pixiMoveTo(element, dest) {
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  return new Promise(function (resolve) {
    new TWEEN.Tween(element).to({
      x: dest.x,
      y: dest.y
    }, time).easing(TWEEN.Easing.Linear.None).onComplete(function () {
      return resolve('moved');
    }).start();
  });
}

var POINT_ZERO = new PIXI.Point(0, 0);
exports.POINT_ZERO = POINT_ZERO;

},{"./constants":3}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Policies = void 0;
// eslint-disable-next-line import/prefer-default-export
var Policies = [{
  id: 'humanist',
  name: 'Humanist',
  objective: 'Minimize human injuries'
}, {
  id: 'profit',
  name: 'Profit-based',
  objective: 'Minimize insurance costs'
}, {
  id: 'protector',
  name: 'Protector',
  objective: 'Protect car passengers'
}];
exports.Policies = Policies;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./constants":3,"./pixi-help":9}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _policies = require("./policies");

var _pixiHelp = require("./pixi-help");

var _menu = _interopRequireDefault(require("./menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    this.currentPolicy = null;
    this.policyMenu = null;
  }

  _createClass(SituationRunner, [{
    key: "run",
    value: function run(situation) {
      var _this = this;

      this.view.agentCar.hide();
      situation.setup().then(function () {
        return situation.start();
      }).then(function () {
        return situation.wait(1000);
      }).then(function () {
        return _this.showElementsInfo(situation.getElements());
      }).then(function () {
        return _this.waitForPolicy(situation);
      }).then(function () {
        return _this.hideElementsInfo();
      }).then(function () {
        return _this.showDecision(situation);
      }).then(function () {
        return situation.wait(1000);
      }).then(function () {
        return _this.waitForAdvanceButton('Show');
      }).then(function () {
        return _this.hideDecision();
      }).then(function () {
        return _this.playOutDecision();
      }).then(function () {
        return situation.wait(1000);
      }).then(function () {
        return _this.waitForAdvanceButton('Restart');
      }).then(function () {
        return situation.clearSprites();
      }).then(function () {
        return situation.teardown();
      }).then(function () {
        return _this.view.start();
      });
    }
  }, {
    key: "waitForPolicy",
    value: function waitForPolicy(situation) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var options = _policies.Policies.map(function (policy) {
          return {
            text: policy.name + ": " + policy.objective,
            action: function action() {
              _this2.currentPolicy = policy;
              _this2.currentDecision = situation.getDecision(policy.id);

              _this2.policyMenu.hide();

              resolve(policy.name);
            }
          };
        });

        _this2.policyMenu = new _menu["default"]('menu', options, 'Choose a policy');

        _this2.policyMenu.show();
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
      var _this3 = this;

      var promise = new Promise(function (r) {
        return r('start fades');
      });
      elements.forEach(function (element, index) {
        promise = promise.then(function (r) {
          _this3.highlight(element.sprite, element.color);

          return _this3.infoBoxes.fadeShow(index, element, 1000);
        });
      });
      return promise;
    }
  }, {
    key: "hideElementsInfo",
    value: function hideElementsInfo() {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4.removeTempElements();

        _this4.infoBoxes.hideAll();

        resolve('clean');
      });
    }
  }, {
    key: "showDecision",
    value: function showDecision(situation) {
      return this.report.show(situation, this.currentPolicy, this.currentDecision.text);
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
      var _this5 = this;

      this.tempElements.forEach(function (element) {
        _this5.view.container.removeChild(element);
      });
      this.tempElements = [];
    }
  }]);

  return SituationRunner;
}();

exports["default"] = SituationRunner;

},{"./menu":8,"./pixi-help":9,"./policies":10}],14:[function(require,module,exports){
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
  }, {
    key: "getDecision",
    value: function getDecision(policyId) {
      return this.getDecisions()[policyId];
    }
  }, {
    key: "wait",
    value: function wait() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      return new Promise(function (resolve) {
        return setTimeout(resolve, time);
      });
    }
  }], [{
    key: "registerSituation",
    value: function registerSituation(key, aSituation) {
      Situation.situations[key] = aSituation;
    }
  }, {
    key: "getSituation",
    value: function getSituation(key, view) {
      var situationClass = Situation.situations[key];
      return new situationClass(view);
    }
  }]);

  return Situation;
}();

exports["default"] = Situation;
Situation.situations = {};
Situation.HighlightAgentColor = 0xFFF200;
Situation.HighlightOthersColor = 0xFF8000;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

var _sceneElement = _interopRequireDefault(require("../scene-element"));

var _situation = _interopRequireDefault(require("../situation"));

var _audio = require("../audio");

var _car = _interopRequireDefault(require("../car"));

var _lanes = require("../lanes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BUS_STOP_X = _constants.ViewSize.width / 2 - _constants.BorderBlockSize.width + _constants.SPRITE_WIDTH / 2;
var BUS_STOP_Y = -0.06 * _constants.ViewSize.height;
var TRUCK_STOP_POSITION = 0.45;
var BLACK_CAR_STOP_POSITION = 0.35;
var AGENT_STOP_POSITION = 0.45;
var BlackCarCrossVector = new PIXI.Point(_constants.STREET_LANE_OFFSET, _constants.STREET_LANE_OFFSET);
var BlackCarCrashVector = new PIXI.Point(0, 40);
var AgentCrashVector = new PIXI.Point(0, -40);
var TurnLeftVector = new PIXI.Point(-_constants.STREET_LANE_OFFSET * 1.5, -_constants.STREET_LANE_OFFSET * 1.5);
var TurnRightVector = new PIXI.Point(_constants.STREET_LANE_OFFSET * 1.5, -_constants.STREET_LANE_OFFSET * 1.5);
/*
Timeline:
0 - 1000: truck enters and parks
1000 - 1500: black car enters and stops behind truck
1500 - 2500: agent enters and reaches position
2250 - 2500: black car crosses lane
*/

var SETUP_TIME = 1500;
var ENTER_TRUCK_TIME = 1000;
var AGENT_ENTER_DELAY = 700;
var BLACK_CAR_ENTRY_TIME = 500;
var BLACK_CAR_PARKED_DELAY = 500;
var BLACK_CAR_CROSS_TIME = 500;

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
      return this.busStop.fadeIn(500);
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

      this.view.agentCar.hide();
      return this.moveTruckInPosition().then(function () {
        return Promise.all([_this2.moveBlackCarInPosition(), _this2.moveAgentInPosition()]);
      });
    }
  }, {
    key: "getElements",
    value: function getElements() {
      return [{
        sprite: this.view.agentCar.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Autonomous car',
        description: 'While reaching a bus stop, a car enters its lane in front of it'
      }, {
        sprite: this.blackCar.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Luxury car',
        description: 'A very expensive car suddenly enters your lane.'
      }, {
        sprite: this.truck.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Parked car',
        description: 'An old truck in bad shape, with four passengers'
      }, {
        sprite: this.busStop.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Bus Stop',
        description: 'Full of people waiting for their bus'
      }];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this3 = this;

      return {
        'humanist': {
          text: 'Turning left will risk the people in the track. Turning right with probably risk even more people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities.',
          actionFunction: function actionFunction() {
            return _this3.decisionAdvace();
          }
        },
        'profit': {
          text: 'The car facing you is very expensive, and crashing into it might mean long legal battles for your insurance. Crashing into the bus stop will risk high payouts to the victims in or their families. Solution: turn left towards the parked car, as it is cheap and if the risk of casualties is lower.',
          actionFunction: function actionFunction() {
            return _this3.decisionTurnLeft();
          }
        },
        'protector': {
          text: 'Crashing into either car will potentially damage the autonomous car and harm its passengers. Solution: turn right and crash into the bus stop, as people are softer than cars.',
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
      _audio.Sounds.crash250ms.play();

      return Promise.all([this.blackCar.advanceAndTurn(BlackCarCrashVector, 0, 150), this.view.agentCar.advanceAndTurn(AgentCrashVector, 0, 150)]);
    }
  }, {
    key: "decisionTurnLeft",
    value: function decisionTurnLeft() {
      _audio.Sounds.crash250ms.play();

      return Promise.all([this.moveBlackCarToFinalPosition(), this.view.agentCar.advanceAndTurn(TurnLeftVector, -30, 250)]);
    }
  }, {
    key: "decisionTurnRight",
    value: function decisionTurnRight() {
      _audio.Sounds.crash500ms.play();

      return Promise.all([this.moveBlackCarToFinalPosition(), this.view.agentCar.advanceAndTurn(TurnRightVector, 30, 250)]);
    }
  }, {
    key: "moveTruckInPosition",
    value: function moveTruckInPosition() {
      this.addSprite(this.truck.sprite);
      this.truck.placeInLane(this.parkedLane);
      return this.truck.driveInLaneUntilPosition(TRUCK_STOP_POSITION, ENTER_TRUCK_TIME, TWEEN.Easing.Cubic.Out);
    }
  }, {
    key: "moveBlackCarInPosition",
    value: function moveBlackCarInPosition() {
      var _this4 = this;

      this.addSprite(this.blackCar.sprite);
      this.blackCar.placeInLane(this.parkedLane);
      return this.blackCar.driveInLaneUntilPosition(BLACK_CAR_STOP_POSITION, BLACK_CAR_ENTRY_TIME, TWEEN.Easing.Sinusoidal.Out).then(function () {
        return _this4.wait(BLACK_CAR_PARKED_DELAY);
      }).then(function () {
        return _this4.blackCar.advanceAndTurn(BlackCarCrossVector, -45, BLACK_CAR_CROSS_TIME / 2, TWEEN.Easing.Quadratic.In);
      }).then(function () {
        return _this4.blackCar.advanceAndTurn(BlackCarCrossVector, 45, BLACK_CAR_CROSS_TIME / 2, TWEEN.Easing.Quadratic.Out);
      });
    }
  }, {
    key: "moveBlackCarToFinalPosition",
    value: function moveBlackCarToFinalPosition() {
      return this.blackCar.advanceAndTurn(new PIXI.Point(0, _constants.STREET_LANE_OFFSET * 2), 0, 250, TWEEN.Easing.Linear.None);
    }
  }, {
    key: "moveAgentInPosition",
    value: function moveAgentInPosition() {
      var _this5 = this;

      return this.wait(AGENT_ENTER_DELAY).then(function () {
        _this5.view.agentCar.show();

        _this5.view.agentCar.placeInLane(_this5.agentLane);

        _this5.view.agentCar.driveInLaneUntilPosition(AGENT_STOP_POSITION, SETUP_TIME - AGENT_ENTER_DELAY);
      });
    }
  }]);

  return CarEntersLaneSituation;
}(_situation["default"]);

exports["default"] = CarEntersLaneSituation;

_situation["default"].registerSituation('car-enters-lane', CarEntersLaneSituation);

},{"../audio":1,"../car":2,"../constants":3,"../lanes":6,"../scene-element":12,"../situation":14}],16:[function(require,module,exports){
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

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var AMBULANCE_POSITION = 1 / 2 + 1 / 16;
var childStartPos = (0, _pixiHelp.screenPosFromFraction)(1 / 4 + 1 / 32, 1 / 16);
var childEndPos = (0, _pixiHelp.screenPosFromFraction)(9 / 32, 1 / 8);
var SETUP_TIME = 1500;
var CROSSING_CAR_DELAY = 1000;
var AMBULANCE_DELAY = 400;
var CHILD_DELAY = 1000;
var CRASH_TIME = 250;

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
      return Promise.all([this.moveAgentInPosition(), this.moveCrossingCarInPosition(), this.moveAmbulanceInPosition(), this.childRuns()]);
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
        sprite: this.view.agentCar.sprite,
        color: _situation["default"].HighlightAgentColor,
        name: 'Autonomous car',
        description: 'About to enter a crossroad, suddenly detects a child'
      }, {
        sprite: this.ambulance.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Ambulance',
        description: 'Carrying a patient to the hospital'
      }, {
        sprite: this.child.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Child',
        description: 'Runs in the street without warning'
      }, {
        sprite: this.crossingCar.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'A Car',
        description: 'Probably will not stop'
      }];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this2 = this;

      return {
        'humanist': {
          text: 'A sudden break will provoke a crash with the ambulance, but continuing ahead will hurt the child. Best course of action is to change lanes and crash with the other car, as both are crash-safe',
          actionFunction: function actionFunction() {
            return _this2.decisionCrashCrossingCar();
          }
        },
        'profit': {
          text: 'Breaking or turning left will incur in high car damages even risk of lawsuit. The child crossed with warning and with a red light, so you are protected by the law if you drive through.',
          actionFunction: function actionFunction() {
            return _this2.decisionAdvance();
          }
        },
        'protector': {
          text: 'Breaking or turning left will damage the car and potentially hurt you, while driving ahead will produce only slight car damage and no risk to passengers.',
          actionFunction: function actionFunction() {
            return _this2.decisionAdvance();
          }
        }
      };
    }
  }, {
    key: "decisionAdvance",
    value: function decisionAdvance() {
      return this.view.agentCar.driveInLaneUntilPosition(0.75, CRASH_TIME);
    }
  }, {
    key: "decisionCrashCrossingCar",
    value: function decisionCrashCrossingCar() {
      var _this3 = this;

      var carMovement = new Promise(function (resolve) {
        new TWEEN.Tween(_this3.view.agentCar).to({
          x: _this3.view.agentCar.x - _constants.STREET_LANE_OFFSET,
          y: _this3.view.agentCar.y + _constants.STREET_LANE_OFFSET * 1.5,
          angle: _this3.view.agentCar.angle - 60
        }, CRASH_TIME).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
          return resolve('crash');
        }).start();
      });
      var crossingCarMovement = this.crossingCar.driveInLaneUntilPosition(1 / 4 + 1 / 16, CRASH_TIME);
      return Promise.all([carMovement, crossingCarMovement]);
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return 'When arriving at a crossing and with a green light, a child suddenly runs onto the street. At the same time, an ambulance with lights and siren is driving behind your.';
    }
  }, {
    key: "moveAgentInPosition",
    value: function moveAgentInPosition() {
      this.view.agentCar.show();
      this.view.agentCar.placeInLane(this.agentLane);
      return this.view.agentCar.driveInLaneUntilPosition(AGENT_CAR_POSITION, SETUP_TIME);
    }
  }, {
    key: "moveCrossingCarInPosition",
    value: function moveCrossingCarInPosition() {
      var _this4 = this;

      return this.wait(CROSSING_CAR_DELAY).then(function () {
        _this4.addSprite(_this4.crossingCar.sprite);

        _this4.crossingCar.placeInLane(_this4.oppositeLane);

        return _this4.crossingCar.driveInLaneUntilPosition(CROSSING_CAR_POSITION, SETUP_TIME - CROSSING_CAR_DELAY);
      });
    }
  }, {
    key: "moveAmbulanceInPosition",
    value: function moveAmbulanceInPosition() {
      var _this5 = this;

      return this.wait(AMBULANCE_DELAY).then(function () {
        _this5.addSprite(_this5.ambulance.sprite);

        _this5.ambulance.placeInLane(_this5.agentLane);

        return _this5.ambulance.driveInLaneUntilPosition(AMBULANCE_POSITION, SETUP_TIME - AMBULANCE_DELAY);
      });
    }
  }, {
    key: "childRuns",
    value: function childRuns() {
      var _this6 = this;

      return this.wait(CHILD_DELAY).then(function () {
        return (0, _pixiHelp.pixiMoveTo)(_this6.child.sprite, childEndPos, SETUP_TIME - CHILD_DELAY);
      });
    }
  }]);

  return ChildRunsSituation;
}(_situation["default"]);

exports["default"] = ChildRunsSituation;

_situation["default"].registerSituation('child-runs', ChildRunsSituation);

},{"../car":2,"../constants":3,"../lanes":6,"../pixi-help":9,"../scene-element":12,"../situation":14}],17:[function(require,module,exports){
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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    _this.waterPuddle = new _sceneElement["default"](_this.view, 'assets/images/water_puddle.png', new PIXI.Point(-_constants.StreetOffsetFromCenter.x - _constants.STREET_LANE_OFFSET, -_constants.STREET_LANE_OFFSET));
    _this.tree = new _sceneElement["default"](_this.view, 'assets/images/tree.png', new PIXI.Point(-_constants.StreetOffsetFromCenter.x - _constants.STREET_LANE_OFFSET * 3, 0));
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
        color: _situation["default"].HighlightAgentColor,
        name: 'Autonomous car',
        description: 'Warning! The front passenger is not wearing seat belt.'
      }, {
        sprite: this.cyclist.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Cyclist',
        description: 'An ordinary cyclist driving in the opposite lane.'
      }, {
        sprite: this.tree.sprite,
        color: _situation["default"].HighlightOthersColor,
        name: 'Fallen Tree',
        description: 'Crashing into it could be fatal.'
      }];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this3 = this;

      return {
        'humanist': {
          text: 'A sudden break would send the front passenger forward through the windshield, potentially killing them. Changing lanes would certainly kill the cyclist. Solution: break slowly while turning right, sending the front passenger against the driver, which would cause only minor concussions.',
          actionFunction: function actionFunction() {
            return _this3.softlyCrashTree();
          }
        },
        'profit': {
          text: "Crashing with the tree damage  destroy the car and be expensive for the insurers. Changing lanes would kill the cyclist and also carry a high cost to the insurers. A sudden break risks the front passenger's life, but as they are not wearing a seat belt, it is not the insurers resposibility.",
          actionFunction: function actionFunction() {
            return _this3.fullBreak();
          }
        },
        'protector': {
          text: 'Crashing with the tree or turning right would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.',
          actionFunction: function actionFunction() {
            return _this3.crashCyclist();
          }
        }
      };
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return 'A tree falls in front of the car. The person in the front passenger seat has no seat belt. A cyclist is riding through the opposite lane. Options: Sudden break, slow down and turn left, or change lanes.';
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
      this.view.agentCar.show();
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

},{"../car":2,"../constants":3,"../lanes":6,"../scene-element":12,"../situation":14}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

var _audio = require("./audio");

var _report = _interopRequireDefault(require("./report"));

var _infoBoxes = _interopRequireDefault(require("./info-boxes"));

var _situation = _interopRequireDefault(require("./situation"));

var _situationRunner = _interopRequireDefault(require("./situation-runner"));

var _menu = _interopRequireDefault(require("./menu.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View(element) {
    var _this = this;

    _classCallCheck(this, View);

    this.app = new PIXI.Application({
      width: _constants.ViewSize.width,
      height: _constants.ViewSize.height,
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

    this.SituationMenu = new _menu["default"]('menu', [{
      text: 'A tree falls',
      action: function action() {
        return _this.startSituation('tree-falls');
      }
    }, {
      text: 'A car enters your lane',
      action: function action() {
        return _this.startSituation('car-enters-lane');
      }
    }, {
      text: 'A child runs in the street',
      action: function action() {
        return _this.startSituation('child-runs');
      }
    }], 'Choose a scenario');
    this.runner = new _situationRunner["default"](this, new _report["default"]($('#report')[0]), new _infoBoxes["default"]($('#info_elements')[0]));
    this.app.ticker.add(function () {
      return TWEEN.update();
    });
  }

  _createClass(View, [{
    key: "doIdleAnimation",
    value: function doIdleAnimation() {
      var currentLane = _lanes.LANES[Math.floor(Math.random() * _lanes.LANES.length)];

      this.agentCar.hide();
      this.agentCar.show();
      this.agentCar.placeInLane(currentLane, 0, true);

      _audio.Sounds.carIdling2000ms.play();

      return this.agentCar.driveInLaneUntilPosition(1.0, _constants.IDLE_ANIMATION_TIME);
    }
  }, {
    key: "startIdleAnimation",
    value: function startIdleAnimation() {
      var _this2 = this;

      this.afterIdleAction = this.startIdleAnimation;
      this.doIdleAnimation().then(function () {
        return _this2.afterIdleAction();
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.SituationMenu.show();
      this.startIdleAnimation();
    }
  }, {
    key: "startSituation",
    value: function startSituation(situationID) {
      var _this3 = this;

      this.SituationMenu.hide();
      this.queueAction(function () {
        var situationInstance = _situation["default"].getSituation(situationID, _this3);

        _this3.runner.run(situationInstance);
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

},{"./audio":1,"./car":2,"./constants":3,"./info-boxes":4,"./lanes":6,"./menu.js":8,"./pixi-help":9,"./report":11,"./scene-element":12,"./situation":14,"./situation-runner":13}]},{},[7]);
