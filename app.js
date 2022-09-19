import { createBoard } from "./modules/addUI.js";
import { GameBoard } from "./modules/gameBoard.js";
import { Player } from "./modules/player.js";

// let posit = getPlacementFromUI(5);
// console.log(posit);

createBoard();

let gamedata = new GameBoard();
gamedata.placeShip();

export { gamedata };

// Create Players
// Loop through playerPieces
// Place Piece and add it to players position
