// Your code here
window.addEventListener("DOMContentLoaded", event => {
  let grid = [];
  populateGrid();
  let player = 1;
  let turnsTaken = 0;
  const board = document.getElementById("board");
  const resetButton = document.getElementById("resetButton");
  const forfeitButton = document.getElementById("forfeit");

  board.addEventListener("click", gameLogic);
  resetButton.addEventListener("click", resetGame);
  forfeitButton.addEventListener("click", forfeit);

  function gameLogic(event) {
    console.log(grid);

    console.log(event.target);

    // instantiate an element with the <img> tag
    const symbol = document.createElement("img");

    // check if the square already contains a token
    if (event.target.id === "cross" || event.target.id === "circle") {
      return alert("That spot is already taken!");
    }

    // if player1 clicked on an empty square, place "X" token in the square
    else if (player === 1 && !event.target.classList.contains("circle")) {
      turnsTaken++;
      symbol.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
      symbol.id = "cross";
      event.target.classList.add("cross");
      event.target.append(symbol);
      document.getElementById("turn").innerText = `Player2's turn`;
      player = 2;
    }


    // if player2 clicked on an empty square, place "O" token in the square
    else if (player === 2 && !event.target.classList.contains("cross")) {
      turnsTaken++;
      symbol.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";
      symbol.id = "circle";
      event.target.classList.add("circle");
      event.target.append(symbol);
      document.getElementById("turn").innerText = `Player1's turn`;
      player = 1;
    }
    if (turnsTaken === 9) winGame();
    if (turnsTaken >= 5) {
      checkGameState(player, symbol.id);
    }

  }

  function forfeit(event) {
    let forfeit = confirm("Forfeit?")
    if (forfeit) {
      if (player === 1) player = 2;
      else player = 1;
      winGame(player);

    }
  }

  function resetGame(event) {
    board.removeEventListener("click", gameLogic);
    document.querySelectorAll("div").forEach(div => {
      div.innerHTML = "";
      div.classList.forEach(name => {
        name !== "square" ? name = "" : undefined;
      })
    });
    document.querySelector("h2").id = "hide";
    document.getElementById("resetButton").disabled = true;
    document.getElementById("turn").innerText = "";
    grid = [];
    populateGrid();
    player = 1;
    turnsTaken = 0;
    board.addEventListener("click", gameLogic);
  }

  function checkGameState(player, token) {
    const flippedGrid = (() => {
      let newGrid = [];
      // iterate through the column of the grid
      for (const col in grid) {
        // iterate through column element
        let flipped = grid.map(row => row[col]);
        newGrid.push(flipped);
      }
      return newGrid;
    })();
    const forwardSlash = grid[0][0].classList.contains(token) && grid[1][1].classList.contains(token) && grid[2][2].classList.contains(token);
    const backSlash = grid[0][2].classList.contains(token) && grid[1][1].classList.contains(token) && grid[2][0].classList.contains(token);

    for (let i = 0; i < 3; i++) {
      if (grid[i].every(el => el.classList.contains(token)) ||
        flippedGrid[i].every(el => el.classList.contains(token)) ||
        forwardSlash ||
        backSlash) {
        return winGame(player);
      }
    }
  }

  function populateGrid() {
    for (let i = 0; i < 9; i += 3) {
      let subGrid = [];
      for (let j = 0; j < 3; j++) {
        subGrid.push(document.getElementsByClassName("square")[i + j]);
      }
      grid.push(subGrid);
    }
  }

  function winGame(player = undefined) {
    if (player) {
      setTimeout(() => { alert("Game Over!"); }, 50);
      document.querySelector("h2").innerText = "Winner: Player" + player + "!";
    } else {
      setTimeout(() => { alert("game Ended In a Tie"); }, 50);
    }
    document.querySelector("h2").id = "show";
    board.removeEventListener("click", gameLogic);
    enableButton();
  }

  function enableButton() {
    document.querySelector("input[type='reset']").disabled = false;
    document.querySelector("input[type='reset']").classList.add("enabled");
  }
});
