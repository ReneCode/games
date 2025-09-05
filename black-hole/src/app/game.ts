//

export type RenderCell = {
  player: string;
  val: number;
  cell: number;
  type: "normal" | "blackHole" | "calculate";
};

export class Game {
  public id: string = "abc123";
  private playerA: Array<number> = [];
  private playerB: Array<number> = [];
  public currentPlayer: "A" | "B" | "" = "";
  private nameA: string = "";
  private nameB: string = "";
  public sumA = 0;
  public sumB = 0;

  MAX_STEPS = 10;
  MAX_CELLS = 21;

  constructor() {
    console.log("Game initialized");
  }

  restart() {
    this.playerA = [];
    this.playerB = [];
    this.currentPlayer = "A";
    this.nameA = "";
    this.nameB = "";
    this.sumA = 0;
    this.sumB = 0;

    this.sendUpdate();
  }

  finished() {
    return (
      this.playerA.length === this.MAX_STEPS &&
      this.playerB.length === this.MAX_STEPS
    );
  }

  blank() {
    return this.playerA.length + this.playerB.length === 0;
  }

  onNewData(data: any) {
    console.log("New data received:", data);
    this.id = data.id;
    this.playerA = data.playerA;
    this.playerB = data.playerB;
    this.currentPlayer = data.currentPlayer;
    this.nameA = data.nameA;
    this.nameB = data.nameB;
    this.sumA = data.sumA;
    this.sumB = data.sumB;
  }

  // callback if game state changes
  onChangeData: (data: any) => void = (data: any) => {};

  sendUpdate() {
    if (this.onChangeData) {
      const data = {
        id: this.id,
        playerA: this.playerA,
        playerB: this.playerB,
        currentPlayer: this.currentPlayer,
        nameA: this.nameA,
        nameB: this.nameB,
        sumA: this.sumA,
        sumB: this.sumB,
      };

      this.onChangeData(data);
    }
  }

  step(cellNumber: number) {
    // Check if the cell is already occupied
    if (
      this.playerA.includes(cellNumber) ||
      this.playerB.includes(cellNumber)
    ) {
      throw new Error("Cell already occupied");
    }

    if (this.currentPlayer === "A") {
      if (this.playerA.length < this.MAX_STEPS) {
        this.playerA.push(cellNumber);
      } else {
        throw new Error("Max steps reached for player A");
      }
    } else {
      if (this.playerB.length < this.MAX_STEPS) {
        this.playerB.push(cellNumber);
      } else {
        throw new Error("Max steps reached for player B");
      }
    }

    if (this.finished()) {
      const blackHole = this.getBlackHole();
      const { sumA, sumB } = this.getSumms(blackHole);
      this.sumA = sumA;
      this.sumB = sumB;
      this.currentPlayer = "";
    } else {
      this.currentPlayer = this.currentPlayer === "A" ? "B" : "A";
    }

    this.sendUpdate();

    return true;
  }

  getRenderBoard() {
    const findCell = (cellNumber: number): RenderCell | undefined => {
      const aIdx = this.playerA.findIndex((c) => c === cellNumber);
      if (aIdx !== -1) {
        return {
          player: "A",
          val: aIdx + 1,
          cell: cellNumber,
          type: "normal",
        };
      }
      const bIdx = this.playerB.findIndex((c) => c === cellNumber);
      if (bIdx !== -1) {
        return {
          player: "B",
          val: bIdx + 1,
          cell: cellNumber,
          type: "normal",
        };
      }
      return undefined;
    };

    const board: RenderCell[][] = [];
    let cellNumber = 0;
    let maxCols = 0;
    for (let row = 0; row < 6; row++) {
      maxCols++;
      const oneRow: RenderCell[] = [];
      for (let col = 0; col < maxCols; col++) {
        cellNumber++;

        const found = findCell(cellNumber);
        if (found) {
          oneRow.push(found);
        } else {
          oneRow.push({
            player: "none",
            val: 0,
            cell: cellNumber,
            type: "normal",
          });
        }
      }
      board.push(oneRow);
    }

    if (this.finished()) {
      const blackHole = this.getBlackHole();
      return this.darkenCells(board, blackHole);
    } else {
      return board;
    }
  }

  public darkenCells(board: RenderCell[][], blackHole: number): RenderCell[][] {
    const cellsAround = this.getCellsAround(blackHole);

    return board.map((row) => {
      return row.map((cell) => {
        if (cellsAround.includes(cell.cell)) {
          return { ...cell, type: "calculate" };
        } else if (cell.cell === blackHole) {
          return { ...cell, type: "blackHole" };
        }
        return cell;
      });
    });
  }

  private getSumms(blackHole: number) {
    const cellsAround = this.getCellsAround(blackHole);
    let sumA = 0;
    let sumB = 0;
    for (const cell of cellsAround) {
      const idxA = this.playerA.findIndex((c) => c === cell);
      if (idxA !== -1) {
        sumA += idxA + 1;
      }
      const idxB = this.playerB.findIndex((c) => c === cell);
      if (idxB !== -1) {
        sumB += idxB + 1;
      }
    }
    return { sumA, sumB };
  }

  private getCellsAround(cellNumber: number) {
    switch (cellNumber) {
      case 1:
        return [2, 3];
      case 2:
        return [1, 3, 4, 5];
      case 3:
        return [1, 2, 5, 6];
      case 4:
        return [2, 5, 7, 8];
      case 5:
        return [2, 3, 4, 6, 8, 9];
      case 6:
        return [3, 5, 9, 10];
      case 7:
        return [4, 8, 11, 12];
      case 8:
        return [4, 5, 7, 9, 12, 13];
      case 9:
        return [5, 6, 8, 10, 13, 14];
      case 10:
        return [6, 9, 14, 15];
      case 11:
        return [7, 12, 16, 17];
      case 12:
        return [7, 8, 11, 13, 17, 18];
      case 13:
        return [8, 9, 12, 14, 18, 19];
      case 14:
        return [9, 10, 13, 15, 19, 20];
      case 15:
        return [10, 14, 20, 21];
      case 16:
        return [11, 17];
      case 17:
        return [11, 12, 16, 18];
      case 18:
        return [12, 13, 17, 19];
      case 19:
        return [13, 14, 18, 20];
      case 20:
        return [14, 15, 19, 21];
      case 21:
        return [15, 20];
      default:
        throw new Error("Invalid cell number");
    }
  }

  private getBlackHole() {
    for (let cell = 1; cell <= this.MAX_CELLS; cell++) {
      if (!this.playerA.includes(cell) && !this.playerB.includes(cell)) {
        return cell;
      }
    }
    throw new Error("No black hole found");
  }
}
