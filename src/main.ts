import Phaser from 'phaser';
import { gameConfig } from './config/game-config.js';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import RoundEndScene from './scenes/RoundEndScene.js';

const config = {
  ...gameConfig,
  scene: [BootScene, MenuScene, GameScene, RoundEndScene]
};

new Phaser.Game(config);
