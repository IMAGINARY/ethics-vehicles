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

},{"./constants":2,"./lane":7,"./pixi-help":11}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyEnter = 13;

var CountdownButton =
/*#__PURE__*/
function () {
  function CountdownButton(text, onClick) {
    var _this = this;

    _classCallCheck(this, CountdownButton);

    this.htmlButton = $('#advanceButton');
    this.htmlText = $('#advanceText');
    this.text = text;
    this.onClick = onClick;
    this.htmlText.text(text);
    this.htmlButton.on('click', function () {
      return _this.doClick();
    });
    this.htmlButton.show();
    this.timeoutRunner = null;

    window.onkeydown = function (event) {
      if (event.which == KeyEnter) _this.doClick();
    };
  }

  _createClass(CountdownButton, [{
    key: "doClick",
    value: function doClick() {
      window.onkeydown = function () {};

      if (this.timeoutRunner != null) clearTimeout(this.timeoutRunner);
      this.htmlButton.hide();
      return this.onClick();
    }
  }, {
    key: "setTimeout",
    value: function (_setTimeout) {
      function setTimeout(_x) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (timeout) {
      var _this2 = this;

      if (timeout >= 1000) this.htmlText.text(this.text + " (" + Math.floor(timeout / 1000) + ")");

      if (timeout <= 1000) {
        this.timeoutRunner = setTimeout(function () {
          return _this2.doClick();
        }, timeout);
      } else {
        this.timeoutRunner = setTimeout(function () {
          return _this2.setTimeout(timeout - 1000);
        }, 1000);
      }
    })
  }]);

  return CountdownButton;
}();

exports["default"] = CountdownButton;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightColor = void 0;
var Violet = 0x8f1a81;
var Yellow = 0xffec02;
var Grey = 0x666666;
var HighlightColor = Yellow;
exports.HighlightColor = HighlightColor;

},{}],5:[function(require,module,exports){
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

var InfoBox =
/*#__PURE__*/
function () {
  function InfoBox(htmlElement) {
    _classCallCheck(this, InfoBox);

    this.htmlElement = htmlElement;
  }

  _createClass(InfoBox, [{
    key: "show",
    value: function show(element) {
      this.htmlElement.querySelector('#name').innerText = element.name;
      this.htmlElement.querySelector('#description').innerHTML = element.description;
      (0, _styleHelp.setLeftTopCSSFromCoord)(this.htmlElement, element.infopos);
    }
  }, {
    key: "fadeShow",
    value: function fadeShow(element, time) {
      this.show(element);
      return (0, _styleHelp.tweenOpacity)(this.htmlElement, INFO_BOX_OPACITY, time);
    }
  }, {
    key: "hide",
    value: function hide() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      return (0, _styleHelp.tweenOpacity)(this.htmlElement, 0, time);
    }
  }], [{
    key: "hideAll",
    value: function hideAll() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      InfoBox.Boxes.forEach(function (box) {
        return box.hide(time);
      });
    }
  }, {
    key: "get",
    value: function get(index) {
      return InfoBox.Boxes[index];
    }
  }]);

  return InfoBox;
}();

exports["default"] = InfoBox;
InfoBox.Boxes = $(".info_element").get().map(function (html) {
  return new InfoBox(html);
});

},{"./style-help":20}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BoxSpace = 220;

var InfoPos =
/*#__PURE__*/
function () {
  function InfoPos(x, y) {
    _classCallCheck(this, InfoPos);

    this.x = x;
    this.y = y;
  }

  _createClass(InfoPos, [{
    key: "right",
    value: function right() {
      return new InfoPos(this.x + BoxSpace, this.y);
    }
  }, {
    key: "left",
    value: function left() {
      return new InfoPos(this.x - BoxSpace, this.y);
    }
  }, {
    key: "up",
    value: function up() {
      return new InfoPos(this.x, this.y - BoxSpace);
    }
  }, {
    key: "down",
    value: function down() {
      return new InfoPos(this.x, this.y + BoxSpace);
    }
  }]);

  return InfoPos;
}();

exports["default"] = InfoPos;
InfoPos.TopLeft = new InfoPos(300, 90);
InfoPos.TopRight = new InfoPos(1420, 90);
InfoPos.BottomRight = new InfoPos(1420, 790);
InfoPos.BottomLeft = new InfoPos(300, 790);

},{}],7:[function(require,module,exports){
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

},{"./pixi-help":11}],8:[function(require,module,exports){
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

},{"./constants":2,"./lane":7}],9:[function(require,module,exports){
"use strict";

var _view = _interopRequireDefault(require("./view"));

require("./situations/car-enters-lane");

require("./situations/tree-falls");

require("./situations/child-runs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* globals $ */
var view = new _view["default"]($('#game')[0]);
view.start();

},{"./situations/car-enters-lane":17,"./situations/child-runs":18,"./situations/tree-falls":19,"./view":22}],10:[function(require,module,exports){
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
var KeyEnter = 13;

var Menu =
/*#__PURE__*/
function () {
  function Menu(elementId, optionsArray, title, menuClass) {
    _classCallCheck(this, Menu);

    this.currentOption = 0;
    this.visible = false;
    this.menuClass = menuClass;
    this.options = Array.from(optionsArray);
    this.buttons = [];
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
      this.htmlElement.removeClass();
      this.htmlElement.addClass(this.menuClass);
      this.select(this.currentOption);
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
      this.htmlElement.addClass('fade_out');

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
      this.buttons = this.options.map(function (element) {
        return $("<input type=\"button\" value=\"".concat(element.text, "\" class=\"menu_option fade_in\">")).click(element.action);
      });
      this.buttons.forEach(function (button) {
        return $('#menu_options_area').append(button);
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
    key: "select",
    value: function select(index) {
      this.buttons[index].addClass('selected');
    }
  }, {
    key: "deselect",
    value: function deselect(index) {
      this.buttons[index].removeClass('selected');
    }
  }, {
    key: "down",
    value: function down() {
      this.deselect(this.currentOption);
      if (this.currentOption < this.options.length - 1) this.currentOption++;
      this.select(this.currentOption);
      this.updateCursorPosition();
    }
  }, {
    key: "up",
    value: function up() {
      this.deselect(this.currentOption);
      if (this.currentOption > 0) this.currentOption--;
      this.select(this.currentOption);
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

},{"./style-help":20}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimatedSprite = createAnimatedSprite;
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
function createAnimatedSprite(sourceImages, scale) {
  var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
  var textures = sourceImages.map(function (image) {
    return PIXI.Texture.from(image);
  });
  var sprite = new PIXI.AnimatedSprite(textures);
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.anchor.set(anchor);
  return sprite;
}

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
  graphics.lineStyle(5, color, 1, 0.5);
  graphics.drawCircle(sprite.x, sprite.y, Math.max(sprite.width, sprite.height) / 2 + 10);
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

},{"./constants":2}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Policies = void 0;

var _texts = require("./texts");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line import/prefer-default-export
var Policies = [_objectSpread({
  id: 'humanist'
}, _texts.Texts.Humanist), _objectSpread({
  id: 'profit'
}, _texts.Texts.Profit), _objectSpread({
  id: 'protector'
}, _texts.Texts.Protector)];
exports.Policies = Policies;

},{"./texts":21}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styleHelp = require("./style-help");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Report =
/*#__PURE__*/
function () {
  function Report(htmlElement) {
    _classCallCheck(this, Report);

    this.htmlElement = htmlElement;
    this.situationDescriptionElement = this.htmlElement.querySelector('#situation_description');
    this.policyBlock = this.htmlElement.querySelector('#policy');
    this.policyNameElement = this.htmlElement.querySelector('#policy_name');
    this.policyObjectiveElement = this.htmlElement.querySelector('#policy_objective');
    this.decisionBlock = this.htmlElement.querySelector('#decision');
    this.decisionElement = this.htmlElement.querySelector('#decision_text');
  }

  _createClass(Report, [{
    key: "show",
    value: function show() {
      this.decisionBlock.style.display = "none";
      this.policyBlock.style.display = "none";
      return (0, _styleHelp.tweenOpacity)(this.htmlElement, 1, 500);
    }
  }, {
    key: "pullUp",
    value: function pullUp() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      this.htmlElement.classList.remove('report_down');
      this.htmlElement.classList.remove('report_up');
      this.htmlElement.classList.add('report_up');
      return new Promise(function (r) {
        return setTimeout(r, time);
      });
    }
  }, {
    key: "pullDown",
    value: function pullDown() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      this.htmlElement.classList.remove('report_down');
      this.htmlElement.classList.remove('report_up');
      this.htmlElement.classList.add('report_down');
      return new Promise(function (r) {
        return setTimeout(r, time);
      });
    }
  }, {
    key: "setSituation",
    value: function setSituation(situation) {
      this.situationDescriptionElement.innerHTML = situation.getDescription();
    }
  }, {
    key: "setPolicy",
    value: function setPolicy(policy) {
      this.policyBlock.style.display = "block";
      this.policyNameElement.innerHTML = policy.name;
      this.policyObjectiveElement.innerHTML = policy.objective;
    }
  }, {
    key: "setDecision",
    value: function setDecision(decision) {
      this.decisionBlock.style.display = "block";
      this.decisionElement.innerHTML = decision;
    }
  }, {
    key: "hide",
    value: function hide() {
      return (0, _styleHelp.tweenOpacity)(this.htmlElement, 0, 250);
    }
  }]);

  return Report;
}();

exports["default"] = Report;

},{"./style-help":20}],14:[function(require,module,exports){
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
    this.initialPosition = position;
    this.visible = false;
    this.setSprite((0, _pixiHelp.createSprite)(imageFile, scale));
  }

  _createClass(SceneElement, [{
    key: "setSprite",
    value: function setSprite(sprite) {
      this.sprite = sprite;
      this.reset();
    }
  }, {
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

},{"./constants":2,"./pixi-help":11}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _policies = require("./policies");

var _pixiHelp = require("./pixi-help");

var _menu = _interopRequireDefault(require("./menu"));

var _countdownButton = _interopRequireDefault(require("./countdown-button"));

var _texts = require("./texts");

var _infoBoxes = _interopRequireDefault(require("./info-boxes"));

var _design = require("./design");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SituationRunner =
/*#__PURE__*/
function () {
  function SituationRunner(view, report) {
    _classCallCheck(this, SituationRunner);

    this.view = view;
    this.report = report;
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
        return _this.report.setSituation(situation);
      }).then(function () {
        return _this.report.show();
      }).then(function () {
        return _this.waitForAdvanceButton(_texts.Texts.Next);
      }, 3000).then(function () {
        return _this.waitForPolicy(situation);
      }).then(function () {
        return _this.report.setPolicy(_this.currentPolicy);
      }).then(function () {
        return situation.wait(1000);
      }).then(function () {
        return _this.hideElementsInfo();
      }).then(function () {
        return situation.wait(1000);
      }).then(function () {
        return _this.playOutDecision();
      }).then(function () {
        return situation.wait(1000);
      }).then(function () {
        return _this.report.setDecision(_this.currentDecision.text);
      }).then(function () {
        return _this.waitForAdvanceButton(_texts.Texts.Restart);
      }, 15000).then(function () {
        return _this.report.hide();
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

        _this2.policyMenu = new _menu["default"]('menu', options, _texts.Texts.ChoosePolicy, 'bottom_menu');

        _this2.policyMenu.show();
      });
    }
  }, {
    key: "waitForAdvanceButton",
    value: function waitForAdvanceButton() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _texts.Texts.Next;
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
      return new Promise(function (resolve) {
        var cb = new _countdownButton["default"](text, resolve);
        cb.setTimeout(timeout);
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
          _this3.highlight(element.sprite);

          return _infoBoxes["default"].get(index).fadeShow(element, 1000);
        });
      });
      return promise;
    }
  }, {
    key: "hideElementsInfo",
    value: function hideElementsInfo() {
      var _this4 = this;

      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      return new Promise(function (resolve) {
        _this4.removeTempElements();

        _infoBoxes["default"].hideAll(time);

        setTimeout(resolve, time);
      });
    }
  }, {
    key: "playOutDecision",
    value: function playOutDecision() {
      return this.currentDecision.actionFunction();
    }
  }, {
    key: "highlight",
    value: function highlight(sprite) {
      this.addTempElement((0, _pixiHelp.highlightSprite)(sprite, _design.HighlightColor));
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

},{"./countdown-button":3,"./design":4,"./info-boxes":5,"./menu":10,"./pixi-help":11,"./policies":12,"./texts":21}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

var _texts = require("../texts");

var _infoPositions = _interopRequireDefault(require("../info-positions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    _this.Texts = _texts.Texts.CarEntersLane;
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
      return [_objectSpread({
        sprite: this.view.agentCar.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].BottomRight
      }, this.Texts.AutonomousCar), _objectSpread({
        sprite: this.blackCar.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].TopRight
      }, this.Texts.LuxuryCar), _objectSpread({
        sprite: this.truck.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].TopRight.left()
      }, this.Texts.Truck), _objectSpread({
        sprite: this.busStop.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].TopRight.right()
      }, this.Texts.BusStop)];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this3 = this;

      return {
        'humanist': {
          text: this.Texts.Humanist,
          actionFunction: function actionFunction() {
            return _this3.decisionAdvace();
          }
        },
        'profit': {
          text: this.Texts.Profit,
          actionFunction: function actionFunction() {
            return _this3.decisionTurnLeft();
          }
        },
        'protector': {
          text: this.Texts.Protector,
          actionFunction: function actionFunction() {
            return _this3.decisionTurnRight();
          }
        }
      };
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.Texts.description;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "decisionAdvace",
    value: function decisionAdvace() {
      return Promise.all([this.blackCar.advanceAndTurn(BlackCarCrashVector, 0, 150), this.view.agentCar.advanceAndTurn(AgentCrashVector, 0, 150)]);
    }
  }, {
    key: "decisionTurnLeft",
    value: function decisionTurnLeft() {
      return Promise.all([this.moveBlackCarToFinalPosition(), this.view.agentCar.advanceAndTurn(TurnLeftVector, -30, 250)]);
    }
  }, {
    key: "decisionTurnRight",
    value: function decisionTurnRight() {
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

},{"../car":1,"../constants":2,"../info-positions":6,"../lanes":8,"../scene-element":14,"../situation":16,"../texts":21}],18:[function(require,module,exports){
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

var _texts = require("../texts");

var _infoPositions = _interopRequireDefault(require("../info-positions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AGENT_LANE = 4;
var CROSSING_CAR_POSITION = 1 / 4 + 1 / 32;
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

    _this.child.setSprite((0, _pixiHelp.createAnimatedSprite)([1, 2, 3].map(function (index) {
      return "assets/images/child_sprite_" + index + ".png";
    }), _constants.CAR_SCALE));

    _this.crossingCar = new _car["default"](_this.view, 'assets/images/blue_car.png');
    _this.ambulance = new _car["default"](_this.view, 'assets/images/ambulance.png');
    _this.Texts = _texts.Texts.ChildRuns;
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
      return [_objectSpread({
        sprite: this.view.agentCar.sprite,
        color: _situation["default"].HighlightAgentColor,
        infopos: _infoPositions["default"].TopRight.left().left()
      }, this.Texts.AutonomousCar), _objectSpread({
        sprite: this.ambulance.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].TopRight.left()
      }, this.Texts.Ambulance), _objectSpread({
        sprite: this.child.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].TopLeft
      }, this.Texts.Child), _objectSpread({
        sprite: this.crossingCar.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].TopLeft.down()
      }, this.Texts.OtherCar)];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this2 = this;

      return {
        'humanist': {
          text: this.Texts.Humanist,
          actionFunction: function actionFunction() {
            return _this2.decisionCrashCrossingCar();
          }
        },
        'profit': {
          text: this.Texts.Profit,
          actionFunction: function actionFunction() {
            return _this2.decisionAdvance();
          }
        },
        'protector': {
          text: this.Texts.Protector,
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
      return this.Texts.description;
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

      this.child.sprite.loop = true;
      return this.wait(CHILD_DELAY).then(function () {
        return _this6.child.sprite.play();
      }).then(function () {
        return (0, _pixiHelp.pixiMoveTo)(_this6.child.sprite, childEndPos, SETUP_TIME - CHILD_DELAY);
      }).then(function () {
        return _this6.child.sprite.stop();
      });
    }
  }]);

  return ChildRunsSituation;
}(_situation["default"]);

exports["default"] = ChildRunsSituation;

_situation["default"].registerSituation('child-runs', ChildRunsSituation);

},{"../car":1,"../constants":2,"../info-positions":6,"../lanes":8,"../pixi-help":11,"../scene-element":14,"../situation":16,"../texts":21}],19:[function(require,module,exports){
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

var _texts = require("../texts");

var _infoPositions = _interopRequireDefault(require("../info-positions"));

var _pixiHelp = require("../pixi-help");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    _this.cyclist.sprite = (0, _pixiHelp.createAnimatedSprite)([1, 2, 3].map(function (index) {
      return "assets/images/cyclist_" + index + ".png";
    }), _constants.CAR_SCALE);
    _this.agentLane = _lanes.LANES[AGENT_LANE];
    _this.bicycleLane = _this.agentLane.oppositeLane;
    _this.Texts = _texts.Texts.TreeFalls;
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
      return [_objectSpread({
        sprite: this.view.agentCar.sprite,
        color: _situation["default"].HighlightAgentColor,
        infopos: _infoPositions["default"].TopLeft
      }, this.Texts.AutonomousCar), _objectSpread({
        sprite: this.cyclist.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].BottomLeft
      }, this.Texts.Cyclist), _objectSpread({
        sprite: this.tree.sprite,
        color: _situation["default"].HighlightOthersColor,
        infopos: _infoPositions["default"].BottomLeft.left()
      }, this.Texts.FallenTree)];
    }
  }, {
    key: "getDecisions",
    value: function getDecisions() {
      var _this3 = this;

      return {
        'humanist': {
          text: this.Texts.Humanist,
          actionFunction: function actionFunction() {
            return _this3.softlyCrashTree();
          }
        },
        'profit': {
          text: this.Texts.Profit,
          actionFunction: function actionFunction() {
            return _this3.fullBreak();
          }
        },
        'protector': {
          text: this.Texts.Protector,
          actionFunction: function actionFunction() {
            return _this3.crashCyclist();
          }
        }
      };
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.Texts.description;
    }
  }, {
    key: "moveCyclistInPosition",
    value: function moveCyclistInPosition() {
      var _this4 = this;

      this.cyclist.show();
      this.cyclist.placeInLane(this.bicycleLane);
      this.cyclist.sprite.play();
      return this.cyclist.driveInLaneUntilPosition(CYCLIST_STOP_POSITION, SETUP_TIME).then(function () {
        return _this4.cyclist.sprite.stop();
      });
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
      var _this5 = this;

      return new Promise(function (resolve) {
        new TWEEN.Tween(_this5.tree.sprite).to({
          angle: 90,
          x: _this5.tree.sprite.x + _constants.STREET_LANE_OFFSET * 1.5
        }, SETUP_TIME - TREE_FALL_TIME).easing(TWEEN.Easing.Quadratic.In).delay(TREE_FALL_TIME).onComplete(function () {
          return resolve('fell');
        }).start();
      });
    }
  }, {
    key: "crashCyclist",
    value: function crashCyclist() {
      var _this6 = this;

      var carMovement = new Promise(function (resolve) {
        new TWEEN.Tween(_this6.view.agentCar).to({
          x: _this6.view.agentCar.x + _constants.STREET_LANE_OFFSET * 2,
          y: _this6.view.agentCar.y + _constants.STREET_LANE_OFFSET * 2,
          angle: _this6.view.agentCar.angle - 45
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
      var _this7 = this;

      return new Promise(function (resolve) {
        new TWEEN.Tween(_this7.view.agentCar).to({
          x: _this7.view.agentCar.x - _constants.STREET_LANE_OFFSET,
          y: _this7.view.agentCar.y + _constants.STREET_LANE_OFFSET * 2,
          angle: _this7.view.agentCar.angle + 70
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

},{"../car":1,"../constants":2,"../info-positions":6,"../lanes":8,"../pixi-help":11,"../scene-element":14,"../situation":16,"../texts":21}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tweenOpacity = tweenOpacity;
exports.setLeftTopCSSFromCoord = setLeftTopCSSFromCoord;

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

function setLeftTopCSSFromCoord(element, coord) {
  element.style.left = coord.x + 'px';
  element.style.top = coord.y + 'px';
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texts = void 0;
var Texts = {
  ChooseSituation: 'Choose a Situation',
  Show: 'Show',
  Restart: 'Restart',
  ChoosePolicy: 'Choose a Policy',
  Next: 'Next',
  Humanist: {
    name: 'Humanist',
    objective: 'Minimize human injuries'
  },
  Profit: {
    name: 'Profit-based',
    objective: 'Minimize insurance costs'
  },
  Protector: {
    name: 'Protector',
    objective: 'Protect car passengers'
  },
  CarEntersLane: {
    name: 'A Car enters your Lane',
    description: 'A car enters your lane and there is no time to break. The car can either crash against it, turn left and crash against a parked car, or turn right and drive over a bus stop full of people',
    AutonomousCar: {
      name: 'Autonomous car',
      description: 'While reaching a bus stop, a car enters its lane in front of it'
    },
    LuxuryCar: {
      name: 'Luxury car',
      description: 'A very expensive car suddenly enters your lane.'
    },
    Truck: {
      name: 'Parked car',
      description: 'An old truck in bad shape, with four passengers'
    },
    BusStop: {
      name: 'Bus Stop',
      description: 'Full of people waiting for their bus'
    },
    Humanist: 'Turning left will risk the people in the track. Turning right will probably risk even more people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities.',
    Profit: 'The car facing you is very expensive, and crashing into it might mean long legal battles for your insurance. Crashing into the bus stop will risk high payouts to the victims in or their families. Solution: turn left towards the parked car, as it is cheap and if the risk of casualties is lower.',
    Protector: 'Crashing into either car will potentially damage the autonomous car and harm its passengers. Solution: turn right and crash into the bus stop, as people are softer than cars.'
  },
  ChildRuns: {
    name: 'A Child runs in the Street',
    description: 'When arriving at a crossing and with a green light, a child suddenly runs onto the street. At the same time, an ambulance with lights and siren is driving behind your.',
    AutonomousCar: {
      name: 'Autonomous car',
      description: 'About to enter a crossroad, suddenly detects a child'
    },
    Ambulance: {
      name: 'Ambulance',
      description: 'Carrying a patient to the hospital'
    },
    Child: {
      name: 'Child',
      description: 'Runs in the street without warning'
    },
    OtherCar: {
      name: 'A Car',
      description: 'Probably will not stop'
    },
    Humanist: 'A sudden break will provoke a crash with the ambulance, but continuing ahead will hurt the child. Best course of action is to change lanes and crash with the other car, as both are crash-safe',
    Profit: 'Breaking or turning left will incur in high car damages even risk of lawsuit. The child crossed with warning and with a red light, so you are protected by the law if you drive through.',
    Protector: 'Breaking or turning left will damage the car and potentially hurt you, while driving ahead will produce only slight car damage and no risk to passengers.'
  },
  TreeFalls: {
    name: 'A Tree falls',
    description: 'A tree falls in front of the car. The person in the front passenger seat has no seat belt. A cyclist is riding through the opposite lane. Options: Sudden break, slow down and turn left, or change lanes.',
    AutonomousCar: {
      name: 'Autonomous car',
      description: 'Warning! The front passenger is not wearing seat belt.'
    },
    Cyclist: {
      name: 'Cyclist',
      description: 'An ordinary cyclist driving in the opposite lane.'
    },
    FallenTree: {
      name: 'Fallen Tree',
      description: 'Crashing into it could be fatal.'
    },
    Humanist: 'A sudden break would send the front passenger forward through the windshield, potentially killing them. Changing lanes would certainly kill the cyclist. Solution: break slowly while turning right, sending the front passenger against the driver, which would cause only minor concussions.',
    Profit: "Crashing with the tree will destroy the car and be expensive for the insurers. Changing lanes would kill the cyclist and also carry a high cost to the insurers. A sudden break risks the front passenger's life, but as they are not wearing a seat belt, it is not the insurer's responsibility.",
    Protector: 'Crashing with the tree or turning right would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.'
  }
};
exports.Texts = Texts;

},{}],22:[function(require,module,exports){
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

var _report = _interopRequireDefault(require("./report"));

require("./info-boxes");

var _situation = _interopRequireDefault(require("./situation"));

var _situationRunner = _interopRequireDefault(require("./situation-runner"));

var _menu = _interopRequireDefault(require("./menu.js"));

var _texts = require("./texts");

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
    this.agentCar = new _car["default"](this, 'assets/images/car.png');
    this.background.show();

    this.afterIdleAction = function () {};

    this.SituationMenu = new _menu["default"]('menu', [{
      text: _texts.Texts.TreeFalls.name,
      action: function action() {
        return _this.startSituation('tree-falls');
      }
    }, {
      text: _texts.Texts.CarEntersLane.name,
      action: function action() {
        return _this.startSituation('car-enters-lane');
      }
    }, {
      text: _texts.Texts.ChildRuns.name,
      action: function action() {
        return _this.startSituation('child-runs');
      }
    }], _texts.Texts.ChooseSituation, 'top_menu');
    this.runner = new _situationRunner["default"](this, new _report["default"]($('#report')[0]));
    this.app.ticker.add(function () {
      return TWEEN.update();
    });
  }

  _createClass(View, [{
    key: "spriteToScreenPos",
    value: function spriteToScreenPos(sprite) {
      return {
        x: sprite.x + this.app.screen.width / 2,
        y: sprite.y + this.app.screen.height / 2
      };
    }
  }, {
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

},{"./car":1,"./constants":2,"./info-boxes":5,"./lanes":8,"./menu.js":10,"./pixi-help":11,"./report":13,"./scene-element":14,"./situation":16,"./situation-runner":15,"./texts":21}]},{},[9])

