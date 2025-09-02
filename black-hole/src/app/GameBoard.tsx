//

import { on } from "events";
import styles from "./GameBoard.module.css";

type RenderCell = {
  player: string;
  val: number;
  cell: number;
};

export function RenderLine({ line }: { line: RenderCell[] }) {
  console.log(">>", line.length, line);

  const onClickCell = (cell: RenderCell) => {
    console.log("Clicked cell:", cell);
  };

  return (
    <div className={styles.line}>
      {line.map((cell, index) => {
        return (
          <div
            key={index}
            className={styles.cell}
            style={{ color: cell.player === "A" ? "red" : "blue" }}
            onClick={() => onClickCell(cell)}
          >
            {cell.player === "none" ? null : cell.val}
          </div>
        );
      })}
    </div>
  );
}

export function GameBoard({
  playerA,
  playerB,
}: {
  playerA: Record<number, number>;
  playerB: Record<number, number>;
}) {
  const board = createRenderBoard(playerA, playerB);
  console.log("board", board);

  return (
    <div className={styles.board}>
      {board.map((cells, index) => (
        <div key={index}>
          <RenderLine line={cells} />
        </div>
      ))}
    </div>
  );
}

function createRenderBoard(
  playerA: Record<number, number>,
  playerB: Record<number, number>
) {
  const board: RenderCell[][] = [];
  let cell = 0;
  let maxCols = 0;
  for (let row = 0; row < 6; row++) {
    maxCols++;
    let oneRow: RenderCell[] = [];
    for (let col = 0; col < maxCols; col++) {
      cell++;

      const valA = playerA[cell];
      if (valA) {
        oneRow.push({ player: "A", val: valA, cell });
      } else {
        const valB = playerB[cell];
        if (valB) {
          oneRow.push({ player: "B", val: valB, cell });
        } else {
          oneRow.push({ player: "none", val: 0, cell });
        }
      }
    }
    board.push(oneRow);
  }
  return board;
}
