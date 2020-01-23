
var currentMenuOption = 0;
var menuOptionCount = 0;

export function addMenuButton(text, action) {
    const button = $('<input type="button" value="' + text + '" class="menu_option">');
    $('#menu_options_area').append(button);
    button.click(action);
    menuOptionCount++;
}

export function showMenu() {
    $('#menu').show();
    window.onkeydown = menuKeyHandler;
}

export function hideMenu() {
    $('#menu_options_area').empty();
    menuOptionCount = 0;
    $('#menu').hide();
    window.onkeydown = function() {};
}

const ArrowUp = 38;
const ArrowDown = 40;

function menuKeyHandler(event) {
  switch (event.which) {
    case ArrowUp: menuUp(); break;
    case ArrowDown: menuDown(); break;
  }
}

function menuDown() {
  if (currentMenuOption > 0)
    currentMenuOption--;
  updateCursorPosition();
}

function menuUp() {
  if (currentMenuOption < menuOptionCount - 1)
    currentMenuOption++;
  updateCursorPosition();
}

function updateCursorPosition() {
  $('#menu_cursor').css('top', 15 + (currentMenuOption * 75) + "px");
}
