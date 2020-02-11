
export default class CountdownButton {
  constructor(text, onClick) {
    this.htmlButton = $('#advanceButton');
    this.htmlText = $('#advanceText');
    this.text = text;
    this.onClick = onClick;

    this.htmlText.text(text);
    this.htmlButton.on('click', () => this.doClick());
    this.htmlButton.show();
    this.timeoutRunner = null;
  }

  doClick() {
    if (this.timeoutRunner != null)
      clearTimeout(this.timeoutRunner);

      this.htmlButton.hide();
    return this.onClick();
  }

  setTimeout(timeout) {
    if (timeout >= 1000)
      this.htmlText.text(this.text + " (" + (Math.floor(timeout/1000)) + ")");

    if (timeout <= 1000) {
      this.timeoutRunner = setTimeout(() => this.doClick(), timeout);
    } else {
      this.timeoutRunner = setTimeout(() => this.setTimeout(timeout - 1000), 1000);
    }
  }
}
