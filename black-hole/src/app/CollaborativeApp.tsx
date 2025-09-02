"use client";

import { useOthers } from "@liveblocks/react/suspense";
import { GameBoard } from "./GameBoard";

export function CollaborativeApp() {
  const others = useOthers();
  const userCount = others.length;

  const playerA: Record<number, number> = {};
  const playerB: Record<number, number> = {};

  playerA[4] = 1;
  playerA[7] = 2;
  playerA[10] = 3;
  playerA[9] = 4;
  playerA[11] = 5;
  playerA[1] = 6;
  playerA[2] = 7;
  7;
  playerB[5] = 1;
  playerB[6] = 2;
  playerB[3] = 3;
  playerB[20] = 4;
  playerB[12] = 5;
  playerB[8] = 6;
  playerB[16] = 7;

  return (
    <div>
      <div>There are {userCount} other user(s) online</div>
      <GameBoard playerA={playerA} playerB={playerB}></GameBoard>
    </div>
  );
}
