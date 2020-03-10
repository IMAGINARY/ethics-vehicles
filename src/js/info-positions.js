
const BoxSpace = 220;

export default class InfoPos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  right() {
    return new InfoPos(this.x + BoxSpace, this.y);
  }
  left() {
    return new InfoPos(this.x - BoxSpace, this.y);
  }
  up() {
    return new InfoPos(this.x, this.y - BoxSpace);
  }
  down() {
    return new InfoPos(this.x, this.y + BoxSpace);
  }
}

InfoPos.TopLeft = new InfoPos(300, 90);
InfoPos.TopRight = new InfoPos(1420, 90);
InfoPos.BottomRight = new InfoPos(1420, 790);
InfoPos.BottomLeft = new InfoPos(300, 790);
