import { getPlacementFromUI } from "./addUI.js";
import { human, computer, Player } from "./player.js";
import { Ship } from "./ship.js";
import { generateComputerAttack } from "./generateComputerBoard.js";

let shipLengths = [5, 4, 3, 3, 2];

function placePlayerShipPositions() {
  getPlacementFromUI();
}

function creatAndPushShips() {
  for (let length of shipLengths) {
    let humanShip = new Ship(length);
    let computerShip = new Ship(length);
    human.ships.push(humanShip);
    computer.ships.push(computerShip);
  }
}

class GameBoard {
  placeShip() {
    //Stores information of where ships are
    creatAndPushShips();
    placePlayerShipPositions();
  }

  receiveAttack(e) {
    let clickedClassList = e.target.classList;
    if (clickedClassList.contains("computer-spot")) {
      if (clickedClassList.contains("hit")) {
        return;
      } else {
        // let hitAudio = new Audio("../assets/hitSound.mp3");
        // hitAudio.play();
        clickedClassList.add("hit");
        e.target.style.backgroundColor = "red";
        //gets the index of which ship was hit
        let shipThatWasHit = e.target.classList[5].slice(14);

        // Adds the index of the part of the ship that was hit
        let coords = e.target.classList[1].slice(15);
        let ship = computer.ships[shipThatWasHit];
        ship.hitShip(coords);

        //check if ship has been sunken
        console.log(ship);
        if (ship.isSunk()) {
          console.log("here human");
          let computerShipPositions = document.querySelectorAll(
            `.${e.target.classList[5]}`
          );
          console.log(computerShipPositions);
          computerShipPositions.forEach(function (curr) {
            curr.style.backgroundColor = "purple";
          });
        }
        //checks if the player won
        this.#checkWinner(computer);

        generateComputerAttack();

        //checks if the computer won
        this.#checkWinner(human);
      }
    } else {
      if (clickedClassList.contains("missed")) {
        return;
      }
      // let hitAudio = new Audio("../assets/missSound.mp3");
      // hitAudio.play();
      clickedClassList.add("missed");
      e.target.style.backgroundColor = "grey";

      if (generateComputerAttack()) {
        //displayShipSunk
      }
      //run computers move
      //check if computer won
    }
  }

  #checkWinner(player) {
    let winner = true;
    player.ships.forEach(function (curr) {
      if (!curr.sunken) {
        winner = false;
      }
    });
    let gameDisplay = document.querySelector(".main-display");
    let winnerDisplay = document.querySelector(".winner-display");
    let winnerDisplayText = document.querySelector(".winner-display-text");
    let headerInfo = document.querySelector(".game-header");
    if (winner === true) {
      gameDisplay.classList.add("hidden");
      winnerDisplay.classList.remove("hidden");
      headerInfo.classList.add("hidden");
      if (player === computer) {
        winnerDisplayText.textContent = `You Won The Game Human!!!👤`;
      } else if (player === human) {
        winnerDisplayText.textContent = `You Lost The Game Computer Wins!!!🤖`;
      }
    }
  }
}

export { GameBoard };
