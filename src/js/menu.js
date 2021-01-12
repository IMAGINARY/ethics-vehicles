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
    this.$title = this.$htmlElement.find('#menu_title');

    const arrowUp = eventFilter(eventFilters.KEY_ARROW_UP, () => this.up());
    const arrowDown = eventFilter(eventFilters.KEY_ARROW_DOWN, () => this.down());
    const enter = eventFilter(eventFilters.KEY_ENTER, () => this.enterOption());
    this._keyDownHandler = combineEventFilters(arrowUp, arrowDown, enter);
  }

  async show() {
    this.createHTMLOptions();
    this.refreshTexts();

    this.currentOption = 0;
    this.$htmlElement.removeClass();
    this.$htmlElement.addClass(this.menuClass);
    this.select(this.currentOption);

    window.addEventListener('keydown', this._keyDownHandler);

    await tweenOpacity(this.$htmlElement.get(0), 1, 500)
      .then(() => this.fadeInCursor());
  }

  async hide() {
    window.removeEventListener('keydown', this._keyDownHandler);
    await tweenOpacity(this.$htmlElement.get(0), 0, 500)
      .then(() => this.clearHTML());
  }

  async fadeInCursor() {
    const domCursor = this.rows[this.currentOption].children()
      .get(0);
    domCursor.style.opacity = 0;
    await tweenOpacity(domCursor, 1, 500)
      .then(() => tweenOpacity(domCursor, 0.125, 500))
      .then(() => tweenOpacity(domCursor, 1, 500));
  }

  createHTMLOptions() {
    const selectAndEnter = (index) => {
      this.setCurrentOption(index);
      this.enterOption();
    };
    this.rows = this.options.map(
      () => $('<div>')
        .append(
          $('<div class="menu_cursor"><img src="./assets/images/play-solid.svg"/></div>'),
          $('<div class="menu_option fade_in">'),
          $('<div class="menu_cursor">')
        )
    );

    this.buttons = this.rows.map(($row) => $row.children('.menu_option'));
    this.buttons.forEach(($button, index) => $button.click(() => selectAndEnter(index)));

    $('#menu_options_area')
      .append(...this.rows);
  }

  clearHTML() {
    this.$optionsArea.empty();
  }

  async enterOption() {
    await this.hide();
    this.options[this.currentOption].action();
  }

  select(index) {
    this.rows[index].addClass('selected');
  }

  deselect(index) {
    this.rows[index].removeClass('selected');
  }

  setCurrentOption(index) {
    this.deselect(this.currentOption);
    this.currentOption = Math.max(0, Math.min(index, this.options.length - 1));
    this.select(this.currentOption);
  }

  down() {
    this.setCurrentOption(this.currentOption + 1);
  }

  up() {
    this.setCurrentOption(this.currentOption - 1);
  }

  refreshTexts() {
    this.buttons.forEach(($button, i) => $button.text(this.options[i].label()));
    this.$title.text(this.title());
  }
}
