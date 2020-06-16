var WIDTH = 40;
var HEIGHT = 20;
var THRESHOLD = 500;
var INTERVAL = null;

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

function createBox(row, col) {
    var box = document.createElement("button");
    box.innerHTML = "";
    box.className = "box";
    box.style.backgroundColor = "red";
    box.id = "box" + row + "-" + col;
    box.onclick = () => (changeColor(row, col));

    return box;
}

function getBoxId(row, col) {
    return "box" + row + "-" + col;
}

function getBox(row, col) {
    return document.getElementById(getBoxId(row, col));
}

function setColor(row, col, color) {
    var box = getBox(row, col);
    box.style.backgroundColor = color;
}

function getColor(row, col) {
    var box = getBox(row, col);
    return box.style.backgroundColor;
}

// Get 1 if clicked, 0 otherwise
function getValue(row, col) {
    if (row < 0 || col < 0 || row >= HEIGHT || col >= WIDTH) {
        return 0;
    }

    var box = getBox(row, col);
    return box.style.backgroundColor == "green" ? 1 : 0;
}

function changeColor(row, col) {
    if (getColor(row, col) == "green") {
        setColor(row, col, "red");
    } else {
        setColor(row, col, "green");
    }
}

function resetColors() {
    for (var row = 0; row < HEIGHT; row++) {
        for (var col = 0; col < WIDTH; col++) {
            setColor(row, col, "red");
        }
    }
}

function howManyAliveNeighbours(row, col) {
    return  getValue(row-1, col) + getValue(row+1, col) + 
            getValue(row, col-1) + getValue(row, col+1) + 
            getValue(row-1, col-1) + getValue(row-1, col+1) + 
            getValue(row+1, col-1) + getValue(row+1, col+1)
}

function isAliveNextTurn(row, col) {
    var aliveNeighbours = howManyAliveNeighbours(row, col);
    var isAlive = getValue(row, col);

    if (isAlive == 1) {
        return aliveNeighbours == 2 || aliveNeighbours == 3;
    } else {
        return aliveNeighbours == 3;
    }
}

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

function simulate() {
    INTERVAL = setInterval(simulateTurn, THRESHOLD);
}

function stopSimulation() {
    clearInterval(INTERVAL);
    INTERVAL = null;
}