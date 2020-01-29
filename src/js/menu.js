import { tweenOpacity } from './style-help';

const KeyArrowUp = 38;
const KeyArrowDown = 40;
const KeyEnter = 13;

// example use

export default class Menu {
  constructor(elementId, optionsArray) {
    this.currentOption = 0;
    this.visible = false;
    this.options = Array.from(optionsArray);
    this.htmlElement = $(`#${elementId}`)
    this.optionsArea = this.htmlElement.find('#menu_options_area');
    this.cursor = this.htmlElement.find('#menu_cursor');
  }

  show() {
    this.createHTMLOptions();
    this.currentOption = 0;
    window.onkeydown = event => {
      switch (event.which) {
        case KeyArrowUp: this.up(); break;
        case KeyArrowDown: this.down(); break;
        case KeyEnter: this.enterOption(); break;
      }
    };
    this.updateCursorPosition();
    this.htmlElement.show();
    this.fadeInCursor();
  }

  hide() {
    this.htmlElement.hide();
    window.onkeydown = function() {};
    this.clearHTML();
  }

  fadeInCursor() {
    const domCursor = this.cursor[0];
    domCursor.style.opacity = 0;
    return tweenOpacity(domCursor, 1, 500)
        .then(() => tweenOpacity(domCursor, 0.125, 500))
        .then(() => tweenOpacity(domCursor, 1, 500))
  }

  createHTMLOptions() {
    this.options.forEach(element => {
      const button = $(`<input type="button" value="${element.text}" class="menu_option">`);
      $('#menu_options_area').append(button);
      button.click(element.action);
    });
  }

  clearHTML() {
    this.optionsArea.empty();
  }

  enterOption() {
    const action = this.options[this.currentOption].action;
    this.hide();
    action();
  }

  down() {
    if (this.currentOption < this.options.length - 1)
      this.currentOption++;
    this.updateCursorPosition();
  }

  up() {
    if (this.currentOption > 0)
      this.currentOption--;
    this.updateCursorPosition();
  }

  updateCursorPosition() {
    this.cursor.css('margin-top', 15 + (this.currentOption * 75) + "px");
  }
}
