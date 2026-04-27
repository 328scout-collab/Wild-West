import Phaser from 'phaser';

type GameConfig = Phaser.Types.Core.GameConfig;

export const gameConfig: GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  backgroundColor: '#1e1e2f',
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: []
};
