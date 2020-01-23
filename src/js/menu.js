
const KeyArrowUp = 38;
const KeyArrowDown = 40;
const KeyEnter = 13;

// example use

export default class Menu {
  constructor(elementId, optionsArray) {
    this.currentOption = 0;
    this.actions = [];
    this.htmlElement = $(`#${elementId}`)
    this.optionsArea = this.htmlElement.find('#menu_options_area');
    this.cursor = this.htmlElement.find('#menu_cursor');
    optionsArray.forEach(element => {
        this.addOption(element.text, element.action);
    });
  }

  addOption(text, action) {
    const button = $(`<input type="button" value="${text}" class="menu_option">`);
    $('#menu_options_area').append(button);
    this.actions.push(action);
    button.click(action);
  }

  show() {
    this.htmlElement.show();
    window.onkeydown = event => {
      switch (event.which) {
        case KeyArrowUp: this.up(); break;
        case KeyArrowDown: this.down(); break;
        case KeyEnter: this.enterOption(); break;
      }
    };
    this.updateCursorPosition();
  }

  hide() {
    this.htmlElement.hide();
    window.onkeydown = function() {};
  }

  clear() {
      this.actions = [];
      this.currentOption = 0;
      this.optionsArea.empty();
  }

  enterOption() {
    const action = this.actions[this.currentOption];
    this.hide();
    action();
  }

  down() {
    if (this.currentOption < this.actions.length - 1)
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
