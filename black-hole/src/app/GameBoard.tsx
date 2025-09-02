//

import { useEffect, useRef, useState } from "react";
import styles from "./GameBoard.module.css";
import { Game, RenderCell } from "./game";

export function GameBoard() {
  const game = useRef<Game>(null);

  const [board, setBoard] = useState<RenderCell[][]>([]);

  const onClickCell = (cell: RenderCell) => {
    game.current?.step(cell.cell);
    const b = game.current?.getRenderBoard();
    if (b) {
      setBoard(b);
    }
  };

  useEffect(() => {
    const g = new Game();
    game.current = g;
    setBoard(g.getRenderBoard());
  }, []);

  return (
    <div>
      <div className={styles.board}>
        {board.map((cells, index) => (
          <div key={index} className={styles.line}>
            {cells.map((cell) => (
              <div
                key={cell.cell}
                className={styles.cell}
                style={{
                  color: cell.player === "A" ? "red" : "blue",
                  backgroundColor:
                    cell.type === "normal"
                      ? "lightgray"
                      : cell.type === "blackHole"
                      ? "black"
                      : "gray",
                }}
                onClick={() => onClickCell(cell)}
              >
                {cell.player === "none" ? null : cell.val}
              </div>
            ))}
          </div>
        ))}
      </div>
      {game.current && game.current.finished() && (
        <div>
          <h2>Game Info</h2>
          <p>Player A Sum: {game.current?.sumA}</p>
          <p>Player B Sum: {game.current?.sumB}</p>
        </div>
      )}
    </div>
  );
}
