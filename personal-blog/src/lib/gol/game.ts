export const GameStatus = {
  NEW: "NEW",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  EDITED: "EDITED",
} as const;

export type GameStatusType = keyof typeof GameStatus;

export type Position = {
  h: number;
  w: number;
};

export class Game {
  board: Board;
  status: GameStatusType;
  constructor(board: Board, status: GameStatusType = GameStatus.NEW) {
    this.board = board;
    this.status = status;
  }

  public next(): boolean {
    const curBoard = this.board;
    const [newBoard, hasChanges] = curBoard.nextBoard();

    if (hasChanges) {
      this.board = newBoard;
    }
    return hasChanges;
  }
}

const randomBoolean = () => Math.random() >= 0.5;

export function createNewGame(
  boardSize: number = 10,
  random: boolean = false
): Game {
  const board = createNewGameBoard(boardSize, random);
  return new Game(board);
}

function createNewGameBoard(boardSize: number, random: boolean) {
  let newMatrix: Cell[][] = [];
  for (let i = 0; i < boardSize; i++) {
    let row: Cell[] = [];
    for (let j = 0; j < boardSize; j++) {
      const newCell = new Cell({ h: i, w: j });
      if (random) {
        newCell.alive = randomBoolean();
      }
      row.push(newCell);
    }
    newMatrix.push(row);
  }
  return new Board(boardSize, newMatrix);
}

export class Board {
  size: number;
  matrix: Cell[][];

  constructor(size: number, matrix: Cell[][]) {
    this.size = size;
    this.matrix = matrix;
  }

  public nextBoard(): [Board, boolean] {
    let newMatrix: Cell[][] = [];
    let hasChanges = false;
    for (let i = 0; i < this.size; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < this.size; j++) {
        const oldCell = this.matrix[i][j];
        const newCell = oldCell.update(this);
        hasChanges = hasChanges || newCell.alive !== oldCell.alive;
        row.push(newCell);
      }
      newMatrix.push(row);
    }
    const newBoard = new Board(this.size, newMatrix);
    return [newBoard, hasChanges];
  }

  public getCellAt(pos: Position): Cell {
    return this.matrix[pos.h][pos.w];
  }

  public isInBounds(pos: Position): boolean {
    const xInBounds = pos.h > -1 && pos.h < this.size;
    const yInBounds = pos.w > -1 && pos.w < this.size;

    return xInBounds && yInBounds;
  }
}

export class Cell {
  pos: Position;
  alive: boolean;
  constructor(pos: Position, alive: boolean = false) {
    this.pos = pos;
    this.alive = alive;
  }

  public getNeighbors(board: Board): Cell[] {
    let nbs: Cell[] = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) {
          continue;
        }

        const newPos = { h: this.pos.h + i, w: this.pos.w + j };

        if (board.isInBounds(newPos)) {
          nbs.push(board.getCellAt(newPos));
        }
      }
    }
    return nbs;
  }

  public update(board: Board): Cell {
    const nbs = this.getNeighbors(board);
    let shouldLive = this.alive;
    if (this.shouldDie(nbs)) {
      // Cell dies
      shouldLive = false;
    } else if (this.shouldRevive(nbs)) {
      // Cell is born
      shouldLive = true;
    }
    return new Cell(this.pos, shouldLive);
  }

  public shouldDie(nbs: Cell[]): boolean {
    if (!this.alive) {
      return false;
    }

    const aliveCount = this.countAlive(nbs);
    return aliveCount < 2 || aliveCount > 3;
  }

  public shouldRevive(nbs: Cell[]): boolean {
    if (this.alive) {
      return false;
    }

    const aliveCount = this.countAlive(nbs);
    return aliveCount === 3;
  }

  private countAlive(cells: Cell[]): number {
    return cells.filter((cell) => cell.alive).length;
  }
}
