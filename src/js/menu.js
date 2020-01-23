
var currentMenuOption = 0;
var menuOptionCount = 0;
var menuActions = [];

export function addMenuButton(text, action) {
    const button = $('<input type="button" value="' + text + '" class="menu_option">');
    $('#menu_options_area').append(button);
    menuActions.push(action);
    button.click(action);
    menuOptionCount++;
}

export function showMenu() {
    $('#menu').show();
    window.onkeydown = menuKeyHandler;
    menuOptionCount = 0;
    updateCursorPosition();
}

export function hideMenu() {
    $('#menu').hide();
    clearMenuOptions();
    window.onkeydown = function() {};
}

function clearMenuOptions() {
  $('#menu_options_area').empty();
  menuOptionCount = 0;
  currentMenuOption = 0;
  menuActions = [];
}

const KeyArrowUp = 38;
const KeyArrowDown = 40;
const KeyEnter = 13;

function menuKeyHandler(event) {
  switch (event.which) {
    case KeyArrowUp: menuUp(); break;
    case KeyArrowDown: menuDown(); break;
    case KeyEnter: enterMenuOption(); break;
  }
}

function enterMenuOption() {
  const action = menuActions[currentMenuOption];
  hideMenu();
  action();
}

function menuDown() {
  if (currentMenuOption < menuOptionCount - 1)
    currentMenuOption++;
  updateCursorPosition();
}

function menuUp() {
  if (currentMenuOption > 0)
    currentMenuOption--;
  updateCursorPosition();
}

function updateCursorPosition() {
  $('#menu_cursor').css('margin-top', 15 + (currentMenuOption * 75) + "px");
}
