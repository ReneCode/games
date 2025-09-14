import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game, Scale, Types } from "phaser";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  scene: [MainGame],
};

const StartGame = (parent: string) => {
  const game = new Game({ ...config, parent });

  game.events.on(
    "newStars",
    (eventName) => {
      console.log("Game Event:", eventName);
    },
    { once: false }
  );

  return game;
};

export default StartGame;
