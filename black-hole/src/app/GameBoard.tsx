//

import { useEffect, useRef, useState } from "react";
import styles from "./GameBoard.module.css";
import { Game, RenderCell } from "./game";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export function GameBoard() {
  const game = useRef<Game>(null);

  const [me, setMe] = useState<string>("");

  const [board, setBoard] = useState<RenderCell[][]>([]);

  const onClickCell = (cell: RenderCell) => {
    if (game.current?.currentPlayer !== me) {
      // Not my turn
      return;
    }
    if (game.current?.finished()) {
      // Game is finished
      return;
    }

    // if (!game.current?.currentPlayer) {
    //   setMe("A");
    // }

    game.current?.step(cell.cell);
    const b = game.current?.getRenderBoard();
    if (b) {
      setBoard(b);
    }
  };

  useEffect(() => {
    const col = collection(db, "games");
    const unsubscribe = onSnapshot(col, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())[0];
      // if (me === "" && data.currentPlayer) {
      //   setMe(data.currentPlayer);
      // }
      game.current?.onNewData(data);
      setBoard(g.getRenderBoard());

      if (game.current?.blank() && me === "") {
        setMe("B");
      }
    });

    const g = new Game();
    game.current = g;

    g.onChangeData = (data: any) => {
      // set data in firestore
      // document is games/id
      if (game.current) {
        const docRef = doc(db, "games", game.current.id);
        setDoc(docRef, data);
      }
    };

    // setBoard(g.getRenderBoard());

    return () => {
      unsubscribe();
    };
  }, []);

  const onStart = () => {
    setMe("A");
    game.current?.restart();
  };

  return (
    <div>
      <button className={styles.startButton} onClick={onStart}>
        Start
      </button>

      <div>
        {me} / {game.current?.currentPlayer}
      </div>

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
