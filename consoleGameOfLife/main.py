import os
import time


class Board:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.board = [[False for i in range(width)] for k in range(height)]

    def print_cell(self, cell: bool):
        """Print X in green if cell is True, print O in red otherwise."""

        if cell:
            print('\033[92mX\033[0m', end='')
        else:
            print('\033[91mO\033[0m', end='')

    def print_board(self):
        for row in self.board:
            for cell in row:
                self.print_cell(cell)
            print()

    def set_value(self, x: int, y: int, value: bool):
        """Set value for cell in (x, y)."""

        self.board[y][x] = value

    def change_to_opposite(self, x: int, y: int):
        """Change cell with (x, y) coordinates to opposite value"""

        self.set_value(x, y, not self.get_value(x, y))

    def get_value(self, x: int, y: int) -> bool:
        """Return current value of cell in (x, y) or False, if
        given coordinates are incorrect (lesser than zero or greater
        than width or height)."""

        if x < 0 or y < 0 or x >= self.width or y >= self.height:
            return False

        return self.board[y][x]

    def how_many_alive_neighbours(self, x: int, y: int) -> int:
        """Return amount of alive neighbours of cell in (x, y)."""

        return self.get_value(x-1, y) + self.get_value(x+1, y) + \
               self.get_value(x, y-1) + self.get_value(x, y+1) + \
               self.get_value(x-1, y-1) + self.get_value(x-1, y+1) + \
               self.get_value(x+1, y-1) + self.get_value(x+1, y+1)

    def is_alive_next_turn(self, x: int, y: int) -> bool:
        """Return True if cell with (x, y) coordinates will be alive
        in next turn, False otherwise."""

        neighbours = self.how_many_alive_neighbours(x, y)
        is_alive = self.get_value(x, y)

        if is_alive:
            return neighbours == 2 or neighbours == 3
        else:
            return neighbours == 3

    def simulate(self, turn_threshold_in_seconds: float=1):
        """Simulate game of life with new turn every time specified
        in turn_threshold_in_seconds."""

        turn = 0
        while True:
            os.system('clear')
            self.print_board()
            print(turn)
            time.sleep(turn_threshold_in_seconds)

            new_board = []
            for y in range(self.height):
                new_board.append([])
                for x in range(self.width):
                    new_board[-1].append(self.is_alive_next_turn(x, y))
            self.board = new_board
            turn += 1


board = Board(20, 20)
board.change_to_opposite(3, 5)
board.change_to_opposite(4, 5)
board.change_to_opposite(5, 5)
board.change_to_opposite(6, 5)
board.change_to_opposite(7, 5)


board.simulate(0.3)