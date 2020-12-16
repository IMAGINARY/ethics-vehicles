import { combineEventFilters, eventFilter, eventFilters } from './event-help';
import { tweenOpacity } from './style-help';

export default class Menu {
  constructor(elementId, optionsArray, title, menuClass) {
    this.currentOption = 0;
    this.visible = false;
    this.menuClass = menuClass;
    this.options = Array.from(optionsArray);
    this.buttons = [];
    this.title = typeof title === 'function' ? title : () => title;
    this.$htmlElement = $(`#${elementId}`);
    this.$optionsArea = this.$htmlElement.find('#menu_options_area');
    this.$cursor = this.$htmlElement.find('#menu_cursor');
    this.$title = this.$htmlElement.find('#menu_title');

    const arrowUp = eventFilter(eventFilters.KEY_ARROW_UP, () => this.up());
    const arrowDown = eventFilter(eventFilters.KEY_ARROW_DOWN, () => this.down());
    const enter = eventFilter(eventFilters.KEY_ENTER, () => this.enterOption());
    this._keyDownHandler = combineEventFilters(arrowUp, arrowDown, enter);
  }

  show() {
    this.createHTMLOptions();
    this.refreshTexts();

    this.currentOption = 0;
    this.$htmlElement.removeClass();
    this.$htmlElement.addClass(this.menuClass);
    this.select(this.currentOption);

    window.addEventListener('keydown', this._keyDownHandler);

    this.updateCursorPosition();
    this.$htmlElement.show();
    this.fadeInCursor();
  }

  hide() {
    this.$htmlElement.addClass('fade_out');
    window.removeEventListener('keydown', this._keyDownHandler);
    this.clearHTML();
  }

  fadeInCursor() {
    const domCursor = this.$cursor[0];
    domCursor.style.opacity = 0;
    return tweenOpacity(domCursor, 1, 500)
      .then(() => tweenOpacity(domCursor, 0.125, 500))
      .then(() => tweenOpacity(domCursor, 1, 500));
  }

  createHTMLOptions() {
    this.buttons = this.options.map(
      (element) => $('<input type="button" class="menu_option fade_in">')
        .click(element.action)
    );

    this.buttons.forEach((button) => $('#menu_options_area')
      .append(button));
  }

  clearHTML() {
    this.$optionsArea.empty();
  }

  enterOption() {
    this.hide();
    this.options[this.currentOption].action();
  }

  select(index) {
    this.buttons[index].addClass('selected');
  }

  deselect(index) {
    this.buttons[index].removeClass('selected');
  }

  down() {
    this.deselect(this.currentOption);
    this.currentOption = Math.min(this.currentOption + 1, this.options.length - 1);
    this.select(this.currentOption);
    this.updateCursorPosition();
  }

  up() {
    this.deselect(this.currentOption);
    this.currentOption = Math.max(0, this.currentOption - 1);
    this.select(this.currentOption);
    this.updateCursorPosition();
  }

  updateCursorPosition() {
    const pos = 15 + (this.currentOption * 75);
    this.$cursor.css('margin-top', `${pos}px`);
  }

  refreshTexts() {
    this.buttons.forEach((button, i) => button.attr('value', this.options[i].label()));
    this.$title.text(this.title());
  }
}
