import { Scene } from 'phaser';

export default class MenuScene extends Scene {
  private goldText!: Phaser.GameObjects.Text;
  private currencyUpgradeText!: Phaser.GameObjects.Text;
  private freezeUpgradeText!: Phaser.GameObjects.Text;

  constructor() {
    super('Menu');
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Add background with western theme
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x1e3a5f).setOrigin(0);
    
    // Add some decorative elements
    this.add.circle(centerX - 200, centerY - 100, 30, 0x4a90e2, 0.3);
    this.add.circle(centerX + 200, centerY + 100, 25, 0x7fc8ff, 0.2);
    this.add.circle(centerX + 150, centerY - 150, 20, 0xffaa44, 0.4);

    this.add
      .text(centerX, centerY - 150, '🐟 Aquatic Mafia 🐟', {
        fontFamily: 'Arial',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 120, 'Tower Defense', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#aaddff',
        stroke: '#000000',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    // Gold display
    this.goldText = this.add
      .text(centerX, centerY - 80, '', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffd700'
      })
      .setOrigin(0.5);

    // Upgrade status
    this.currencyUpgradeText = this.add
      .text(centerX, centerY - 50, '', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff'
      })
      .setOrigin(0.5);

    this.freezeUpgradeText = this.add
      .text(centerX, centerY - 30, '', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff'
      })
      .setOrigin(0.5);

    this.updateUpgradeDisplay();

    const startButton = this.add
      .text(centerX, centerY + 20, '🎯 Start Run', {
        fontFamily: 'Arial',
        fontSize: '30px',
        color: '#ffffff',
        backgroundColor: '#2d5a27',
        stroke: '#ffffff',
        strokeThickness: 2
      })
      .setOrigin(0.5)
      .setPadding(15)
      .setInteractive({ useHandCursor: true });

    startButton.on('pointerover', () => {
      startButton.setBackgroundColor('#4a8b3a');
    });
    startButton.on('pointerout', () => {
      startButton.setBackgroundColor('#2d5a27');
    });
    startButton.on('pointerdown', () => {
      this.scene.start('Game', { reset: true });
    });

    const upgradeButton = this.add
      .text(centerX, centerY + 80, '🛒 Upgrade Shop', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#8b4513',
        stroke: '#ffffff',
        strokeThickness: 1
      })
      .setOrigin(0.5)
      .setPadding(12)
      .setInteractive({ useHandCursor: true });

    upgradeButton.on('pointerover', () => {
      upgradeButton.setBackgroundColor('#a0522d');
    });
    upgradeButton.on('pointerout', () => {
      upgradeButton.setBackgroundColor('#8b4513');
    });
    upgradeButton.on('pointerdown', () => {
      this.showUpgradeShop();
    });

    // Fade in camera
    this.cameras.main.fadeIn(500, 0, 0, 0);
  }

  private updateUpgradeDisplay() {
    const savedGold = localStorage.getItem('aquatic-mafia-gold');
    const savedCurrencyUpgrades = localStorage.getItem('aquatic-mafia-currency-upgrades');
    const savedFreezeUpgrades = localStorage.getItem('aquatic-mafia-freeze-upgrades');

    const gold = savedGold ? Number(savedGold) : 0;
    const currencyUpgrades = savedCurrencyUpgrades ? Number(savedCurrencyUpgrades) : 0;
    const freezeUpgrades = savedFreezeUpgrades ? Number(savedFreezeUpgrades) : 0;

    this.goldText.setText(`Gold: ${gold}`);
    this.currencyUpgradeText.setText(`Starting Currency Upgrades: ${currencyUpgrades} (+${currencyUpgrades * 25} currency)`);
    this.freezeUpgradeText.setText(`Freeze Ability Upgrades: ${freezeUpgrades} (-${freezeUpgrades} cooldown)`);
  }

  private showUpgradeShop() {
    // Clear existing content
    this.children.removeAll();

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Add background
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x2d4a3b).setOrigin(0);

    this.add
      .text(centerX, centerY - 200, '🛒 Upgrade Shop', {
        fontFamily: 'Arial',
        fontSize: '36px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3
      })
      .setOrigin(0.5);

    const savedGold = localStorage.getItem('aquatic-mafia-gold');
    const savedCurrencyUpgrades = localStorage.getItem('aquatic-mafia-currency-upgrades');
    const savedFreezeUpgrades = localStorage.getItem('aquatic-mafia-freeze-upgrades');

    const gold = savedGold ? Number(savedGold) : 0;
    const currencyUpgrades = savedCurrencyUpgrades ? Number(savedCurrencyUpgrades) : 0;
    const freezeUpgrades = savedFreezeUpgrades ? Number(savedFreezeUpgrades) : 0;

    this.add
      .text(centerX, centerY - 120, `Gold: ${gold}`, {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffd700'
      })
      .setOrigin(0.5);

    // Currency upgrade
    const currencyButton = this.add
      .text(centerX, centerY - 60, `💰 Starting Currency +25 (${currencyUpgrades * 25} total) - 20 Gold`, {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: gold >= 20 ? '#ffffff' : '#888888',
        backgroundColor: gold >= 20 ? '#2d5a27' : '#444444',
        stroke: gold >= 20 ? '#ffffff' : '#666666',
        strokeThickness: 1
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive({ useHandCursor: gold >= 20 });

    if (gold >= 20) {
      currencyButton.on('pointerover', () => {
        currencyButton.setBackgroundColor('#4a8b3a');
      });
      currencyButton.on('pointerout', () => {
        currencyButton.setBackgroundColor('#2d5a27');
      });
    }

    if (gold >= 20) {
      currencyButton.on('pointerdown', () => {
        const newGold = gold - 20;
        const newCurrencyUpgrades = currencyUpgrades + 1;
        localStorage.setItem('aquatic-mafia-gold', String(newGold));
        localStorage.setItem('aquatic-mafia-currency-upgrades', String(newCurrencyUpgrades));
        this.showUpgradeShop();
      });
    }

    // Freeze upgrade
    const freezeButton = this.add
      .text(centerX, centerY, `❄️ Freeze Cooldown -1s (${freezeUpgrades}s reduction) - 30 Gold`, {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: gold >= 30 ? '#ffffff' : '#888888',
        backgroundColor: gold >= 30 ? '#1e3a5f' : '#444444',
        stroke: gold >= 30 ? '#ffffff' : '#666666',
        strokeThickness: 1
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive({ useHandCursor: gold >= 30 });

    if (gold >= 30) {
      freezeButton.on('pointerover', () => {
        freezeButton.setBackgroundColor('#2d4a7f');
      });
      freezeButton.on('pointerout', () => {
        freezeButton.setBackgroundColor('#1e3a5f');
      });
    }

    if (gold >= 30) {
      freezeButton.on('pointerdown', () => {
        const newGold = gold - 30;
        const newFreezeUpgrades = freezeUpgrades + 1;
        localStorage.setItem('aquatic-mafia-gold', String(newGold));
        localStorage.setItem('aquatic-mafia-freeze-upgrades', String(newFreezeUpgrades));
        this.showUpgradeShop();
      });
    }

    const backButton = this.add
      .text(centerX, centerY + 80, '⬅️ Back to Menu', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#8b4513',
        stroke: '#ffffff',
        strokeThickness: 1
      })
      .setOrigin(0.5)
      .setPadding(12)
      .setInteractive({ useHandCursor: true });

    backButton.on('pointerover', () => {
      backButton.setBackgroundColor('#a0522d');
    });
    backButton.on('pointerout', () => {
      backButton.setBackgroundColor('#8b4513');
    });

    backButton.on('pointerdown', () => {
      this.scene.restart();
    });
  }
}
