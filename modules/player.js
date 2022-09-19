class Player {
  ships = [];
  positions = [];
}

//Repeat functionality for vertical computer ships
//Create a function to add an event listener to the computers board
//When player clicks check if spot is already clicked before, add a class called clicked-already
//Check if spot is a ship or not
// If not turn spot gray
// If it is turn the spot red

let human = new Player();
let computer = new Player();

export { Player, human, computer };
