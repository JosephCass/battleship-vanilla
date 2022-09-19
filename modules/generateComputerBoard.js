import { human, computer } from "./player.js";
import { gamedata } from "../app.js";

let gameContainer = document.querySelector(".main-display");

let shipSizes = [5, 4, 3, 3, 2];

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkIfRowInvalid(size, row, column) {
  let invalid = false;
  for (let x = 0; x < size; x++) {
    let index = row * 10 + column + x;
    let indexAsClass = document.querySelector(`.computer-index-${index}`);
    if (indexAsClass.classList.contains("computer-spot")) {
      invalid = true;
    }
  }
  return invalid;
}

function checkIfColumnValid(size, row, column) {
  let invalid = false;
  for (let x = 0; x < size; x++) {
    let index = row * 10 + column + x * 10;
    let indexAsClass = document.querySelector(`.computer-index-${index}`);
    if (indexAsClass.classList.contains("computer-spot")) {
      invalid = true;
    }
  }
  return invalid;
}

function generateComputerPositions() {
  for (let [indx, size] of shipSizes.entries()) {
    let loopAgain = true;

    //Look for a random place to put a ship until you find one
    do {
      let direction = randomIntFromInterval(1, 2);
      if (direction === 1) {
        let row = randomIntFromInterval(0, 9);
        let column = randomIntFromInterval(0, 5);
        let ship = [];

        if (checkIfRowInvalid(size, row, column)) {
          loopAgain = true;
        } else {
          loopAgain = false;
          for (let x = 0; x < size; x++) {
            let index = row * 10 + column + x;
            let indexAsClass = document.querySelector(
              `.computer-index-${index}`
            );
            // indexAsClass.style.backgroundColor = "yellow";
            indexAsClass.classList.add(
              `computer-spot`,
              `computer-ship-${indx}`
            );
            ship.push(index);
            if (x === size - 1) {
              computer.positions.push(ship);
            }
          }
        }
      } else if (direction === 2) {
        let column = randomIntFromInterval(0, 9);
        let row = randomIntFromInterval(0, 5);
        let ship = [];

        if (checkIfColumnValid(size, row, column)) {
          loopAgain = true;
        } else {
          loopAgain = false;
          for (let x = 0; x < size; x++) {
            let index = row * 10 + column + x * 10;
            let indexAsClass = document.querySelector(
              `.computer-index-${index}`
            );
            // indexAsClass.style.backgroundColor = "yellow";
            indexAsClass.classList.add(
              `computer-spot`,
              `computer-ship-${indx}`
            );
            ship.push(index);
            if (x === size - 1) {
              computer.positions.push(ship);
            }
          }
        }
      }
    } while (loopAgain);
  }
}

function createComputerBoard() {
  gameContainer.classList.remove("hidden");
  let computerGameContainer = document.createElement("div");
  computerGameContainer.classList.add("computer-game");
  gameContainer.append(computerGameContainer);
  let z = 0;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let square = document.createElement("div");
      square.classList.add(
        `computer-square`,
        `computer-index-${z}`,
        `computer-row${x}`,
        `computer-column${y}`
      );
      computerGameContainer.appendChild(square);
      z++;
    }
  }
}

function addComputerBoardFunctionality() {
  let computerBoard = document.querySelector(".computer-game");
  computerBoard.addEventListener("click", function (e) {
    gamedata.receiveAttack(e);
  });
}

function generateComputerAttack() {
  let keepTrying = true;
  let guess;
  let guessedElement;
  do {
    guess = randomIntFromInterval(0, 99);
    guessedElement = document.querySelector(`.player-index-${guess}`);
    if (
      !(
        guessedElement.classList.contains("hit") ||
        guessedElement.classList.contains("miss")
      )
    ) {
      keepTrying = false;
    }
  } while (keepTrying);

  let playerShip;

  if (guessedElement.classList.contains("player-spot")) {
    playerShip = guessedElement.classList[4].slice(12);
    guessedElement.style.backgroundColor = "red";
    guessedElement.classList.add("hit");
    let shipIndex = guessedElement.classList[1].slice(13);
    human.ships[playerShip].hitShip(shipIndex);
  } else {
    guessedElement.style.backgroundColor = "grey";
    guessedElement.classList.add("miss");
    return;
  }
  if (human.ships[playerShip].isSunk()) {
    console.log("here computer");
    let computerShipPos = document.querySelectorAll(
      `.${guessedElement.classList[4]}`
    );
    computerShipPos.forEach(function (curr) {
      curr.style.backgroundColor = "purple";
    });
  }
}

export {
  createComputerBoard,
  generateComputerPositions,
  addComputerBoardFunctionality,
  generateComputerAttack,
};
