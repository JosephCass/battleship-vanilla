import { human } from "./player.js";

let gameContainer = document.querySelector(".main-display");

function createPlayerBoard() {
  gameContainer.classList.remove("hidden");
  let playerGameContainer = document.createElement("div");
  playerGameContainer.classList.add("player-game");
  gameContainer.append(playerGameContainer);
  let z = 0;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let square = document.createElement("div");
      square.classList.add(
        `player-square`,
        `player-index-${z}`,
        `player-row${x}`,
        `player-column${y}`
      );
      playerGameContainer.appendChild(square);
      z++;
    }
  }
  placeShips();
}

function placeShips() {
  for (let [num, ship] of human.positions.entries()) {
    for (let [indx, curr] of ship.entries()) {
      let index = curr.slice(12);
      let currSquare = document.querySelector(`.player-index-${index}`);
      currSquare.classList.add(`player-ship-${num}`, `player-spot`);
      currSquare.style.backgroundColor = "yellow";
    }
  }
}

export { createPlayerBoard };
