class Ship {
  sunken = false;
  hitArea = [];

  constructor(length) {
    this.length = length;
  }

  hitShip(coords) {
    this.hitArea.push(coords);
  }

  isSunk() {
    this.sunken = this.hitArea.length === this.length;
    return this.sunken;
  }
}

export { Ship };
