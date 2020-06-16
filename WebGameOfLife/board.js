var WIDTH = 40;
var HEIGHT = 20;
var THRESHOLD = 500;
var INTERVAL = null;

// Create board of boxes with WIDTH x HEIGHT size.
function createBoard() {
    var boxDiv = document.getElementById("boxes");
    for (var row = 0; row < HEIGHT; row++) {
        for (var col = 0; col < WIDTH; col++) {
            var box = createBox(row, col);
            boxDiv.appendChild(box);
        }
        boxDiv.appendChild(document.createElement("br"));
    }
}

// Create single box in given row and column.
function createBox(row, col) {
    var box = document.createElement("button");
    box.innerHTML = "";
    box.className = "box";
    box.style.backgroundColor = "red";
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
// 1 if box is green (alive), 0 otherwise.
function getValue(row, col) {
    if (row < 0 || col < 0 || row >= HEIGHT || col >= WIDTH) {
        return 0;
    }

    var box = getBox(row, col);
    return box.style.backgroundColor == "green" ? 1 : 0;
}

// Change color of box in (row, col) to opposite.
function changeColor(row, col) {
    if (getColor(row, col) == "green") {
        setColor(row, col, "red");
    } else {
        setColor(row, col, "green");
    }
}

// Set all color of all boxes on board to red (not alive).
function resetColors() {
    for (var row = 0; row < HEIGHT; row++) {
        for (var col = 0; col < WIDTH; col++) {
            setColor(row, col, "red");
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
                setColor(row, col, "green");
            } else {
                setColor(row, col, "red");
            }
            
        }
    }
}

// Simulate one turn of Game of Life every given THRESHOLD time, run
// until stopped by stopSimulation.
function simulate() {
    INTERVAL = setInterval(simulateTurn, THRESHOLD);
}

// Stop already running simulation.
function stopSimulation() {
    clearInterval(INTERVAL);
    INTERVAL = null;
}