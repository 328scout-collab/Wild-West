import { Scene } from 'phaser';

export default class RoundEndScene extends Scene {
  private rank!: string;
  private goldEarned!: number;
  private roundNumber!: number;

  constructor() {
    super('RoundEnd');
  }

  init(data: { rank: string; goldEarned: number; roundNumber: number }) {
    this.rank = data.rank;
    this.goldEarned = data.goldEarned;
    this.roundNumber = data.roundNumber;
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Add background with celebratory theme
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x1a4a2e).setOrigin(0);
    
    // Add some decorative elements
    this.add.circle(centerX - 150, centerY - 120, 25, 0xffd700, 0.3);
    this.add.circle(centerX + 180, centerY + 80, 30, 0xffaa44, 0.2);
    this.add.circle(centerX + 100, centerY - 200, 20, 0xffffff, 0.4);

    this.add
      .text(centerX, centerY - 150, '🎉 Round Complete! 🎉', {
        fontFamily: 'Arial',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 80, `Round ${this.roundNumber}`, {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffcc00',
        stroke: '#000000',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 20, `🏆 Rank: ${this.rank}`, {
        fontFamily: 'Arial',
        fontSize: '36px',
        color: this.getRankColor(this.rank),
        stroke: '#000000',
        strokeThickness: 3
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 40, `💰 Gold Earned: ${this.goldEarned}`, {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffd700',
        stroke: '#000000',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    const continueButton = this.add
      .text(centerX, centerY + 120, '🚀 Continue to Next Round', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#2d5a27',
        stroke: '#ffffff',
        strokeThickness: 2
      })
      .setOrigin(0.5)
      .setPadding(12)
      .setInteractive({ useHandCursor: true });

    continueButton.on('pointerover', () => {
      continueButton.setBackgroundColor('#4a8b3a');
    });
    continueButton.on('pointerout', () => {
      continueButton.setBackgroundColor('#2d5a27');
    });
    continueButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    const menuButton = this.add
      .text(centerX, centerY + 170, '🏠 Return to Menu', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#8b4513',
        stroke: '#ffffff',
        strokeThickness: 1
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive({ useHandCursor: true });

    menuButton.on('pointerover', () => {
      menuButton.setBackgroundColor('#a0522d');
    });
    menuButton.on('pointerout', () => {
      menuButton.setBackgroundColor('#8b4513');
    });
    menuButton.on('pointerdown', () => {
      this.scene.start('Menu');
    });

    menuButton.on('pointerdown', () => {
      this.scene.start('Menu');
    });

    // Fade in camera
    this.cameras.main.fadeIn(500, 0, 0, 0);
  }

  private getRankColor(rank: string): string {
    switch (rank) {
      case 'S': return '#ff4444';
      case 'A': return '#ff8844';
      case 'B': return '#ffff44';
      case 'C': return '#88ff44';
      case 'D': return '#444444';
      default: return '#ffffff';
    }
  }
}