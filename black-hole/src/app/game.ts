//

class Game {
  private playerA: Array<number> = [];
  private playerB: Array<number> = [];

  MAX_STEPS = 10;
  MAX_CELLS = 21;

  toJson() {
    return {
      playerA: this.playerA,
      playerB: this.playerB,
    };
  }

  fromJson(json: any) {
    this.playerA = json.playerA || [];
    this.playerB = json.playerB || [];
  }

  step(player: "A" | "B", cellNumber: number) {
    // Check if the cell is already occupied
    if (
      this.playerA.includes(cellNumber) ||
      this.playerB.includes(cellNumber)
    ) {
      throw new Error("Cell already occupied");
    }

    if (player === "A") {
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

    return true;
  }

  getWinner() {
    if (
      this.playerA.length !== this.MAX_STEPS ||
      this.playerB.length === this.MAX_STEPS
    ) {
      throw new Error("Game not finished");
    }

    const blackHole = this.getBlackHole();

    let cellsAroundBlackHole = [];

    const sumA = this.playerA.reduce((a, b) => a + b, 0);
    const sumB = this.playerB.reduce((a, b) => a + b, 0);
    if (sumA > sumB) {
      return "A";
    } else if (sumB > sumA) {
      return "B";
    } else {
      return "Draw";
    }
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
        return [9, 10, 13, 14, 19, 20];
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
