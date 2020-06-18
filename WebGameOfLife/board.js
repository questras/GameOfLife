var BOXSIZE = 15;
var WIDTH = Math.floor(window.innerWidth / BOXSIZE);
var HEIGHT = Math.floor(window.innerHeight / BOXSIZE);

var INTERVAL = null;

var ALIVE_COLOR = "white";
var DEAD_COLOR = "black";

// Create board of boxes with WIDTH x HEIGHT size.
function createBoard() {
    var boxDiv = document.getElementById("boxes");
    for (var row = 0; row < HEIGHT; row++) {
        var boxRow = document.createElement("div");
        boxRow.className = "row";
        for (var col = 0; col < WIDTH; col++) {
            var box = createBox(row, col);
            boxRow.appendChild(box);
        }
        boxDiv.appendChild(boxRow);
    }
}

// Create single box in given row and column.
function createBox(row, col) {
    var box = document.createElement("button");
    box.innerHTML = "";
    box.className = "box";
    box.style.backgroundColor = DEAD_COLOR;
    box.id = "box" + row + "-" + col;
    box.onclick = () => (changeColor(row, col));

    return box;
}

// Return id of box in (row, col).
function getBoxId(row, col) {
    return "box" + row + "-" + col;
}

// Return box in (row, col).
function getBox(row, col) {
    return document.getElementById(getBoxId(row, col));
}

// Set box in (row, col) to given color.
function setColor(row, col, color) {
    var box = getBox(row, col);
    box.style.backgroundColor = color;
}

// Return color of box in (row, col).
function getColor(row, col) {
    var box = getBox(row, col);
    return box.style.backgroundColor;
}

// Return value of box in (row, col) i.e
// 1 if box is alive, 0 otherwise.
function getValue(row, col) {
    if (row < 0 || col < 0 || row >= HEIGHT || col >= WIDTH) {
        return 0;
    }

    var box = getBox(row, col);
    return box.style.backgroundColor == ALIVE_COLOR ? 1 : 0;
}

// Change color of box in (row, col) to opposite.
function changeColor(row, col) {
    if (getColor(row, col) == ALIVE_COLOR) {
        setColor(row, col, DEAD_COLOR);
    } else {
        setColor(row, col, ALIVE_COLOR);
    }
}

// Set all color of all boxes on board to dead.
function resetColors() {
    for (var row = 0; row < HEIGHT; row++) {
        for (var col = 0; col < WIDTH; col++) {
            setColor(row, col, DEAD_COLOR);
        }
    }
}

// Return number of alive neigbours of box in (row, col).
function howManyAliveNeighbours(row, col) {
    return  getValue(row-1, col) + getValue(row+1, col) + 
            getValue(row, col-1) + getValue(row, col+1) + 
            getValue(row-1, col-1) + getValue(row-1, col+1) + 
            getValue(row+1, col-1) + getValue(row+1, col+1)
}

// Return true if box in (row, col) is alive next turn, false otherwise.
function isAliveNextTurn(row, col) {
    var aliveNeighbours = howManyAliveNeighbours(row, col);
    var isAlive = getValue(row, col);

    if (isAlive == 1) {
        return aliveNeighbours == 2 || aliveNeighbours == 3;
    } else {
        return aliveNeighbours == 3;
    }
}

// Increment number of turns.
function incrementTurn() {
    var turn = document.getElementById("turn");
    turn.innerHTML = parseInt(turn.innerHTML) + 1;
}

// Change number of turns to 0.
function resetTurn() {
    var turn = document.getElementById("turn");
    turn.innerHTML = 0;
}

// Simulate one turn of game of life.
function simulateTurn() {
    var board = new Array(HEIGHT);
    for (var row = 0; row < HEIGHT; row++) {
        board[row] = new Array(WIDTH);
    }

    for (var row = 0; row < HEIGHT; row++) {
        for (var col = 0; col < WIDTH; col++) {
            board[row][col] = isAliveNextTurn(row, col);
        }
    }

    for (var row = 0; row < HEIGHT; row++) {
        for (var col = 0; col < WIDTH; col++) {
            if (board[row][col]) {
                setColor(row, col, ALIVE_COLOR);
            } else {
                setColor(row, col, DEAD_COLOR);
            }
            
        }
    }
    incrementTurn();
}

// Simulate one turn of Game of Life every given THRESHOLD time, run
// until stopped by stopSimulation.
function simulate() {
    var threshold = document.getElementById("threshold");
    thresholdValue = threshold.value * 100;
    threshold.disabled = true;
    INTERVAL = setInterval(simulateTurn, thresholdValue);
}

// Stop already running simulation.
function stopSimulation() {
    clearInterval(INTERVAL);
    INTERVAL = null;
    var threshold = document.getElementById("threshold");
    threshold.disabled = false;
}

// Restart game i.e clear board and reset turns.
function reset() {
    resetColors();
    resetTurn();
    stopSimulation();
}