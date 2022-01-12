/*
   3-Button Interface by tobiashmo for IMAGINARY 20200128
   Based on "Buttons to USB Keyboard Example"

   Built with an Teensy-LC Board:
   You must select Keyboard from the "Tools > USB Type" menu
   to make it work. This example code is in the public domain.
*/

#include <Bounce.h>

/*
   Create Bounce objects for each button.  The Bounce object
   automatically deals with contact chatter or "bounce", and
   it makes detecting changes very simple.
   10 = 10 ms debounce time was changed to 100 ms due to an
   issue where the first key fired was always the ENTER-key
*/

Bounce buttonUP    = Bounce(0, 100);
Bounce buttonDOWN  = Bounce(1, 100);
Bounce buttonENTER = Bounce(2, 100);
Bounce buttonL     = Bounce(3, 100);


void setup()
{
  /* 
     Configure the pins for input mode with pullup resistors.
     The pushbuttons connect from each pin to ground.   When
     the button is pressed,  the pin reads  LOW  because the
     button shorts it to ground.     When released,  the pin
     reads  HIGH  because the pullup resistor connects to +5
     volts inside the chip.  LOW for "on", and HIGH for "off"
     may s eem  backwards,  but  using  the  on-chip  pullup
     resistors is very convenient.      The scheme is called
     "active low" and it's very commonly used in electronics
     ... so much that the chip has built-in pullup resistors!
  */

  pinMode(0, INPUT_PULLUP);
  pinMode(1, INPUT_PULLUP);
  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  pinMode(4, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
  pinMode(6, INPUT_PULLUP);  // Teensy++ LED, may need 1k resistor pullup
  pinMode(7, INPUT_PULLUP);
  pinMode(8, INPUT_PULLUP);
  pinMode(9, INPUT_PULLUP);
}

// ----------------------------------------------------
  
void loop()
{
  /*
     Update all the buttons.  There should not be any long
     delays in loop(), so this runs repetitively at a rate
     faster than the buttons could be pressed and released.
  */
  
  buttonUP.update();
  buttonDOWN.update();
  buttonENTER.update();

/*
   Check each button for "falling" edge
   and press down the Keyboard key when each button presses
   Update the buttons only upon changes.
   falling = high (not pressed - voltage from pullup resistor)
   to low (pressed - button connects pin to ground)
*/

  if (buttonUP.fallingEdge())
  {
    Keyboard.press(KEY_UP);
  }
  if (buttonDOWN.fallingEdge()) 
  {
    Keyboard.press(KEY_DOWN);
  }
  if (buttonENTER.fallingEdge()) 
  {
    Keyboard.press(KEY_ENTER);
  }
  if (buttonL.fallingEdge())
  {
    Keyboard.press(KEY_L);
  }

  // ----------------------------------------------------

  /*
     Check each button for "rising" edge
     and release the Keyboard key when each button releases.
     For many types of projects, you only care when the button
     is pressed and the release isn't needed.
     rising = low (pressed - button connects pin to ground)
     to high (not pressed - voltage from pullup resistor)
  */
  
  if (buttonUP.risingEdge()) {
    Keyboard.release(KEY_UP);
  }
  if (buttonDOWN.risingEdge()) {
    Keyboard.release(KEY_DOWN);
  }
  if (buttonENTER.risingEdge()) {
    Keyboard.release(KEY_ENTER);
  }
  if (buttonL.risingEdge()) {
    Keyboard.release(KEY_L);
  }
  
  // ----------------------------------------------------

}
