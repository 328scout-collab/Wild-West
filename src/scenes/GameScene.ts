import { Scene } from 'phaser';

const GRID_COLS = 9;
const TILE_SIZE = 72;
const TILE_PADDING = 8;
const GRID_OFFSET_X = 80;
const GRID_OFFSET_Y = 120;
const DEFENSE_LINE_X = GRID_OFFSET_X - 40;

interface EnemyConfig {
  color: number;
  speed: number;
  maxHealth: number;
  widthTiles: number;
  displayName: string;
}

interface UnitConfig {
  color: number;
  cost: number;
  widthTiles: number;
  displayName: string;
}

const ENEMY_CONFIGS: Record<string, EnemyConfig> = {
  Fish: {
    color: 0x7fc8ff,
    speed: 70,
    maxHealth: 100,
    widthTiles: 1,
    displayName: 'Fish'
  },
  Shrimp: {
    color: 0xff66cc,
    speed: 120,
    maxHealth: 70,
    widthTiles: 1,
    displayName: 'Shrimp'
  },
  Crab: {
    color: 0xffaa33,
    speed: 40,
    maxHealth: 180,
    widthTiles: 2,
    displayName: 'Crab'
  },
  Dolphin: {
    color: 0x44aaff,
    speed: 90,
    maxHealth: 120,
    widthTiles: 1,
    displayName: 'Dolphin'
  },
  Seahorse: {
    color: 0xff88aa,
    speed: 60,
    maxHealth: 140,
    widthTiles: 1,
    displayName: 'Seahorse'
  },
  FlyingFish: {
    color: 0xaaffaa,
    speed: 100,
    maxHealth: 80,
    widthTiles: 1,
    displayName: 'Flying Fish'
  },
  Pufferfish: {
    color: 0xffaa88,
    speed: 50,
    maxHealth: 200,
    widthTiles: 1,
    displayName: 'Pufferfish'
  },
  Turtle: {
    color: 0x88aa44,
    speed: 30,
    maxHealth: 500,
    widthTiles: 2,
    displayName: 'Turtle Boss'
  }
};

const UNIT_CONFIGS: Record<string, UnitConfig> = {
  Hunter: {
    color: 0x88ff88,
    cost: 50,
    widthTiles: 1,
    displayName: 'Hunter'
  },
  Sniper: {
    color: 0x88ddff,
    cost: 75,
    widthTiles: 1,
    displayName: 'Sniper'
  },
  Bomber: {
    color: 0xff8844,
    cost: 120,
    widthTiles: 1,
    displayName: 'Bomber'
  },
  Sheriff: {
    color: 0xffdd44,
    cost: 150,
    widthTiles: 1,
    displayName: 'Sheriff'
  }
};

export default class GameScene extends Scene {
  private gridTiles: Phaser.GameObjects.Rectangle[][] = [];
  private roundText!: Phaser.GameObjects.Text;
  private currencyText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private damageText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private popupText!: Phaser.GameObjects.Text;
  private selectionText!: Phaser.GameObjects.Text;
  private waveText!: Phaser.GameObjects.Text;

  private currentRound = 0;
  private startingCurrency = 200;
  private currentCurrency = 200;
  private currentWave = 0;
  private totalWaves = 1;
  private roundElapsedMs = 0;
  private damageTaken = 0;
  private defenseHealth = 100;
  private defenseMaxHealth = 100;
  private gold = 0;
  private pendingSpawns = 0;
  private currencyUpgradeCount = 0;
  private freezeUpgradeCount = 0;
  private roundActive = false;
  private roundFailed = false;
  private roundComplete = false;
  private waveInProgress = false;
  private enemyTypesSeen = new Set<string>();
  private selectedUnitType: string | null = null;
  private freezeActive = false;
  private freezeCooldownMs = 0;
  private freezeDurationMs = 5000;

  private enemies!: Phaser.Physics.Arcade.Group;
  private units!: Phaser.GameObjects.Group;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private goldText!: Phaser.GameObjects.Text;
  private debugText!: Phaser.GameObjects.Text;
  private unitOccupancy: boolean[][] = [];

  private backgroundMusic: any = null;
  private backgroundMusicPlaying = false;

  constructor() {
    super('Game');
  }

  init(data?: { reset?: boolean }) {
    if (data?.reset) {
      this.currentRound = 0;
    }
    // Increment round when starting or continuing
    this.currentRound += 1;
  }

  private getCurrentGridRows(): number {
    return Math.min(6, 3 + Math.floor((this.currentRound - 1) / 5));
  }

  create() {
    this.createEnemyTextures();
    this.createUnitTextures();

    this.roundText = this.add
      .text(this.cameras.main.centerX, 20, '', {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffffff'
      })
      .setOrigin(0.5);

    // Top HUD bar
    this.add.rectangle(0, 50, this.cameras.main.width, 60, 0x000000, 0.7).setOrigin(0);

    this.currencyText = this.add
      .text(16, 60, '', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff'
      })
      .setOrigin(0, 0);

    this.goldText = this.add
      .text(16, 80, '', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffd700'
      })
      .setOrigin(0, 0);

    this.timerText = this.add
      .text(this.cameras.main.centerX - 100, 70, '', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff'
      })
      .setOrigin(0, 0.5);

    this.damageText = this.add
      .text(this.cameras.main.centerX + 50, 70, '', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff'
      })
      .setOrigin(0, 0.5);

    this.waveText = this.add
      .text(this.cameras.main.centerX - 200, 70, '', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff'
      })
      .setOrigin(0, 0.5);

    this.popupText = this.add
      .text(this.cameras.main.centerX, 90, '', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffcc00'
      })
      .setOrigin(0.5);

    this.selectionText = this.add
      .text(this.cameras.main.centerX, 120, 'Select a unit to place', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff'
      })
      .setOrigin(0.5);

    this.statusText = this.add
      .text(this.cameras.main.centerX, this.cameras.main.height - 48, '', {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: '#ffcc00'
      })
      .setOrigin(0.5);

    this.debugText = this.add
      .text(16, 110, '', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff'
      })
      .setOrigin(0, 0);

    this.enemies = this.physics.add.group({ runChildUpdate: true });
    this.units = this.add.group();
    this.projectiles = this.physics.add.group();
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      (this.onProjectileHitEnemy as any),
      undefined,
      this
    );

    this.loadPersistentProgress();
    this.createGrid();
    this.createUnitButtons();
    this.input.on('pointerdown', this.handlePointerDown, this);

    this.startRound();
  }

  private createGrid() {
    // Clear existing grid
    this.gridTiles.forEach(row => row.forEach(tile => tile.destroy()));
    this.gridTiles = [];
    this.unitOccupancy = [];

    const currentRows = this.getCurrentGridRows();
    for (let row = 0; row < currentRows; row += 1) {
      this.gridTiles[row] = [];
      this.unitOccupancy[row] = [];

      for (let col = 0; col < GRID_COLS; col += 1) {
        const x = GRID_OFFSET_X + col * (TILE_SIZE + TILE_PADDING);
        const y = GRID_OFFSET_Y + row * (TILE_SIZE + TILE_PADDING);

        const rect = this.add
          .rectangle(x, y, TILE_SIZE, TILE_SIZE, 0x3b5d7f, 0.2)
          .setStrokeStyle(2, 0xffffff, 0.3)
          .setOrigin(0);

        this.gridTiles[row][col] = rect;
        this.unitOccupancy[row][col] = false;
      }
    }
  }

  update(_time: number, delta: number) {
    if (!this.roundActive) {
      return;
    }

    this.roundElapsedMs += delta;
    this.freezeCooldownMs = Math.max(0, this.freezeCooldownMs - delta);
    this.updateTimerText();

    this.enemies.getChildren().forEach((child) => {
      const enemy = child as Phaser.Physics.Arcade.Image;
      if (!enemy.active) {
        return;
      }

      const body = enemy.body as Phaser.Physics.Arcade.Body;
      if (body.x <= DEFENSE_LINE_X) {
        this.onEnemyReachedDefense(enemy);
        return;
      }

      const health = enemy.getData('health') as number;
      if (health <= 0) {
        const explodesOnDeath = enemy.getData('explodesOnDeath') as boolean;
        if (explodesOnDeath) {
          this.handlePufferfishExplosion(enemy);
          this.playSound('explosion');
        } else {
          this.playSound('enemyDeath');
        }
        enemy.destroy();
      }

      // Handle freeze duration
      const freezeEndTime = enemy.getData('freezeEndTime') as number | undefined;
      if (freezeEndTime && _time >= freezeEndTime) {
        enemy.setVelocityX(-(enemy.getData('originalSpeed') as number));
        enemy.setData('freezeEndTime', undefined);
        enemy.clearTint();
      }

      // Enforce movement for regular enemies in case physics velocity is reset
      const isBoss = enemy.getData('isBoss') as boolean;
      if (!freezeEndTime && !isBoss) {
        const originalSpeed = enemy.getData('originalSpeed') as number;
        if (enemy.body && (enemy.body as Phaser.Physics.Arcade.Body).velocity.x === 0) {
          enemy.setVelocityX(-originalSpeed);
        }
      }

      // Handle special enemy behaviors
      this.handleEnemyBehavior(enemy, _time, delta);
    });

    // Handle projectile travel for dynamite
    this.projectiles.getChildren().forEach((child) => {
      const projectile = child as Phaser.Physics.Arcade.Image;
      if (projectile.getData('isDynamite')) {
        const startX = projectile.getData('startX') as number;
        const travelDistance = projectile.getData('travelDistance') as number;
        if (projectile.x - startX >= travelDistance) {
          projectile.destroy();
        }
      }
    });

    this.handleUnitFire(_time);
    const firstEnemy = this.enemies.getChildren()[0] as Phaser.Physics.Arcade.Image | undefined;
    const enemyInfo = firstEnemy
      ? `x=${firstEnemy.x.toFixed(0)} vx=${((firstEnemy.body as Phaser.Physics.Arcade.Body).velocity.x).toFixed(0)}`
      : 'none';
    this.debugText.setText(`Wave ${this.currentWave}/${this.totalWaves} | Enemies: ${this.enemies.countActive(true)} | Pending: ${this.pendingSpawns} | ${enemyInfo}`);

    if (this.waveInProgress && this.enemies.countActive(true) === 0 && this.pendingSpawns === 0) {
      this.waveInProgress = false;
      if (this.currentWave >= this.totalWaves) {
        this.completeRound();
      } else {
        this.startNextWave();
      }
    }
  }

  private handleEnemyBehavior(enemy: Phaser.Physics.Arcade.Image, time: number, delta: number) {
    const type = enemy.getData('type') as string;
    const canJumpRows = enemy.getData('canJumpRows') as boolean;
    const canGlide = enemy.getData('canGlide') as boolean;
    
    if (canJumpRows) {
      // Dolphin and Seahorse: jump to different rows
      let jumpCooldown = enemy.getData('jumpCooldown') as number;
      jumpCooldown -= delta;
      
      if (jumpCooldown <= 0) {
        const currentRow = enemy.getData('row') as number;
        const currentRows = this.getCurrentGridRows();
        const newRow = (currentRow + 1) % currentRows; // Cycle through rows
        
        const newY = GRID_OFFSET_Y + newRow * (TILE_SIZE + TILE_PADDING) + TILE_SIZE / 2;
        enemy.setY(newY);
        enemy.setData('row', newRow);
        
        // Reset cooldown (different for Dolphin vs Seahorse)
        enemy.setData('jumpCooldown', type === 'Dolphin' ? 3000 : 4000); // Dolphin jumps every 3s, Seahorse every 4s
      } else {
        enemy.setData('jumpCooldown', jumpCooldown);
      }
    }
    
    if (canGlide) {
      // Flying Fish: glide over units
      let glideCooldown = enemy.getData('glideCooldown') as number;
      glideCooldown -= delta;
      
      if (glideCooldown <= 0) {
        // Check if there's a unit in front
        const enemyRow = enemy.getData('row') as number;
        const unitsInRow = this.units.getChildren().filter((child) => {
          const unit = child as Phaser.GameObjects.Image;
          return unit.getData('row') === enemyRow && unit.x > enemy.x;
        });
        
        if (unitsInRow.length > 0) {
          // Glide over the first unit found
          enemy.setData('glideCooldown', 5000); // 5 second cooldown
          enemy.setTint(0xaaaaff); // Visual indicator
          this.time.addEvent({
            delay: 1000, // Glide duration
            callback: () => {
              enemy.clearTint();
            }
          });
        }
      } else {
        enemy.setData('glideCooldown', glideCooldown);
      }
    }
    
    // Turtle Boss behaviors
    const isBoss = enemy.getData('isBoss') as boolean;
    if (isBoss) {
      this.handleBossBehavior(enemy, time, delta);
    }
  }

  private handleBossBehavior(boss: Phaser.Physics.Arcade.Image, time: number, delta: number) {
    const canSwitchRows = boss.getData('canSwitchRows') as boolean;
    const canBeamAttack = boss.getData('canBeamAttack') as boolean;
    
    if (canSwitchRows) {
      // Turtle: switch to adjacent row with pause
      let rowSwitchCooldown = boss.getData('rowSwitchCooldown') as number;
      rowSwitchCooldown -= delta;
      
      if (rowSwitchCooldown <= 0) {
        const currentRow = boss.getData('row') as number;
        const currentRows = this.getCurrentGridRows();
        
        // Choose adjacent row (prefer down, then up)
        let newRow = currentRow;
        if (currentRow < currentRows - 1) {
          newRow = currentRow + 1;
        } else if (currentRow > 0) {
          newRow = currentRow - 1;
        }
        
        if (newRow !== currentRow) {
          // Pause movement briefly during row switch
          boss.setVelocityX(0);
          boss.setTint(0xffaaaa); // Red tint during switch
          
          this.time.addEvent({
            delay: 1500, // 1.5 second pause
            callback: () => {
              const newY = GRID_OFFSET_Y + newRow * (TILE_SIZE + TILE_PADDING) + TILE_SIZE / 2;
              boss.setY(newY);
              boss.setData('row', newRow);
              boss.setVelocityX(-(boss.getData('originalSpeed') as number));
              boss.clearTint();
            }
          });
          
          boss.setData('rowSwitchCooldown', 8000); // Switch every 8 seconds
        } else {
          boss.setData('rowSwitchCooldown', 2000); // Try again soon if no valid move
        }
      } else {
        boss.setData('rowSwitchCooldown', rowSwitchCooldown);
      }
    }
    
    if (canBeamAttack) {
      // Turtle eye beam attack
      let beamCooldown = boss.getData('beamCooldown') as number;
      beamCooldown -= delta;
      
      if (beamCooldown <= 0) {
        this.fireBossBeam(boss);
        boss.setData('beamCooldown', 6000); // Beam every 6 seconds
      } else {
        boss.setData('beamCooldown', beamCooldown);
      }
    }
  }

  private fireBossBeam(boss: Phaser.Physics.Arcade.Image) {
    const bossRow = boss.getData('row') as number;
    const beamX = boss.x - TILE_SIZE; // Beam starts in front of boss
    const beamY = boss.y;
    
    // Play beam sound
    this.playSound('beam');
    
    // Create beam effect (visual line)
    const beam = this.add.graphics();
    beam.lineStyle(4, 0xff0000, 1);
    beam.strokeLineShape(new Phaser.Geom.Line(beamX, beamY, beamX - TILE_SIZE * 3, beamY));
    
    // Damage units in the beam path
    this.units.getChildren().forEach((child) => {
      const unit = child as Phaser.GameObjects.Image;
      if (unit.getData('row') === bossRow && unit.x < boss.x && unit.x > boss.x - TILE_SIZE * 3) {
        // Unit is in beam path - damage it
        const currentHealth = unit.getData('health') as number;
        unit.setData('health', currentHealth - 30); // 30 damage
        
        // Visual effect
        unit.setTint(0xff0000);
        this.time.addEvent({
          delay: 500,
          callback: () => unit.clearTint()
        });
      }
    });
    
    // Remove beam after short duration
    this.time.addEvent({
      delay: 300,
      callback: () => beam.destroy()
    });
  }

  private handlePufferfishExplosion(enemy: Phaser.Physics.Arcade.Image) {
    const enemyRow = enemy.getData('row') as number;
    const explosionX = enemy.x;
    const explosionY = enemy.y;
    
    // Damage nearby enemies and units
    const explosionRadius = TILE_SIZE * 2;
    
    // Damage other enemies in the same row
    this.enemies.getChildren().forEach((child) => {
      const otherEnemy = child as Phaser.Physics.Arcade.Image;
      if (otherEnemy === enemy || !otherEnemy.active) return;
      
      const distance = Phaser.Math.Distance.Between(explosionX, explosionY, otherEnemy.x, otherEnemy.y);
      if (distance <= explosionRadius) {
        const currentHealth = otherEnemy.getData('health') as number;
        otherEnemy.setData('health', Math.max(0, currentHealth - 50)); // 50 explosion damage
      }
    });
    
    // Damage units in the same row
    this.units.getChildren().forEach((child) => {
      const unit = child as Phaser.GameObjects.Image;
      if (unit.getData('row') !== enemyRow) return;
      
      const distance = Phaser.Math.Distance.Between(explosionX, explosionY, unit.x, unit.y);
      if (distance <= explosionRadius) {
        // Remove the unit (explosion destroys it)
        const row = unit.getData('row') as number;
        const col = unit.getData('col') as number;
        this.unitOccupancy[row][col] = false;
        unit.destroy();
      }
    });
    
    // Visual explosion effect
    const explosion = this.add.circle(explosionX, explosionY, explosionRadius, 0xff4444, 0.3);
    this.tweens.add({
      targets: explosion,
      scale: 0,
      duration: 500,
      onComplete: () => explosion.destroy()
    });
  }

  private createEnemyTextures() {
    Object.entries(ENEMY_CONFIGS).forEach(([type, config]) => {
      const width = config.widthTiles * TILE_SIZE;
      const height = TILE_SIZE;
      const graphics = this.add.graphics();
      graphics.fillStyle(config.color, 1);
      graphics.fillRoundedRect(0, 0, width, height, 12);
      graphics.lineStyle(4, 0xffffff, 0.7);
      graphics.strokeRoundedRect(0, 0, width, height, 12);
      graphics.generateTexture(`enemy-${type.toLowerCase()}`, width, height);
      graphics.destroy();
    });
  }

  private createUnitTextures() {
    Object.entries(UNIT_CONFIGS).forEach(([type, config]) => {
      const width = config.widthTiles * TILE_SIZE;
      const height = TILE_SIZE;
      const graphics = this.add.graphics();
      graphics.fillStyle(config.color, 1);
      graphics.fillRoundedRect(0, 0, width, height, 12);
      graphics.lineStyle(4, 0xffffff, 0.7);
      graphics.strokeRoundedRect(0, 0, width, height, 12);
      graphics.generateTexture(`unit-${type.toLowerCase()}`, width, height);
      graphics.destroy();
    });

    const bullet = this.add.graphics();
    bullet.fillStyle(0xffff66, 1);
    bullet.fillCircle(8, 8, 8);
    bullet.generateTexture('projectile', 16, 16);
    bullet.destroy();
  }

  private createUnitButtons() {
    const buttonX = GRID_OFFSET_X + GRID_COLS * (TILE_SIZE + TILE_PADDING) + 40;
    let buttonY = GRID_OFFSET_Y;

    Object.entries(UNIT_CONFIGS).forEach(([type, config]) => {
      const button = this.add
        .text(buttonX, buttonY, `${type} ($${config.cost})`, {
          fontFamily: 'Arial',
          fontSize: '20px',
          color: '#ffffff',
          backgroundColor: '#333333'
        })
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .setOrigin(0, 0);

      button.on('pointerdown', () => {
        if (this.currentCurrency >= config.cost) {
          this.selectedUnitType = type;
          this.selectionText.setText(`Selected: ${type}`);
          this.statusText.setText(`${type} selected for placement`);
        } else {
          this.statusText.setText(`Not enough currency for ${type}`);
        }
      });

      buttonY += 60;
    });

    const upgradeButton = this.add
      .text(buttonX, buttonY, 'Upgrade Start +25 ($20)', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#555500'
      })
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0, 0);

    upgradeButton.on('pointerdown', () => {
      if (this.gold >= 20) {
        this.purchaseCurrencyUpgrade();
      } else {
        this.statusText.setText('Not enough gold for upgrade');
      }
    });

    buttonY += 60;

    const freezeButton = this.add
      .text(buttonX, buttonY, 'Freeze Enemy (5s)', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#005555'
      })
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0, 0);

    freezeButton.on('pointerdown', () => {
      if (this.roundActive && this.freezeCooldownMs <= 0) {
        this.activateFreeze();
      } else if (!this.roundActive) {
        this.statusText.setText('Freeze only available during rounds');
      } else {
        this.statusText.setText('Freeze is on cooldown');
      }
    });

    buttonY += 60;

    const freezeUpgradeButton = this.add
      .text(buttonX, buttonY, 'Upgrade Freeze ($30)', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#550055'
      })
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0, 0);

    freezeUpgradeButton.on('pointerdown', () => {
      if (this.gold >= 30) {
        this.purchaseFreezeUpgrade();
      } else {
        this.statusText.setText('Not enough gold for freeze upgrade');
      }
    });
  }

  private loadPersistentProgress() {
    const savedGold = localStorage.getItem('aquatic-mafia-gold');
    const savedUpgrades = localStorage.getItem('aquatic-mafia-currency-upgrades');
    const savedFreezeUpgrades = localStorage.getItem('aquatic-mafia-freeze-upgrades');
    this.gold = savedGold ? Number(savedGold) : 0;
    this.currencyUpgradeCount = savedUpgrades ? Number(savedUpgrades) : 0;
    this.freezeUpgradeCount = savedFreezeUpgrades ? Number(savedFreezeUpgrades) : 0;
    this.startingCurrency = 200 + this.currencyUpgradeCount * 25;
    this.updateGoldText();
  }

  private savePersistentProgress() {
    localStorage.setItem('aquatic-mafia-gold', String(this.gold));
    localStorage.setItem('aquatic-mafia-currency-upgrades', String(this.currencyUpgradeCount));
    localStorage.setItem('aquatic-mafia-freeze-upgrades', String(this.freezeUpgradeCount));
  }

  private updateGoldText() {
    this.goldText.setText(`🪙 ${this.gold}`);
  }

  private purchaseCurrencyUpgrade() {
    this.gold -= 20;
    this.currencyUpgradeCount += 1;
    this.startingCurrency = 200 + this.currencyUpgradeCount * 25;
    this.savePersistentProgress();
    this.updateGoldText();
    this.statusText.setText('Starting currency permanently increased');
  }

  private purchaseFreezeUpgrade() {
    this.gold -= 30;
    this.freezeUpgradeCount += 1;
    this.savePersistentProgress();
    this.updateGoldText();
    this.statusText.setText('Freeze ability upgraded');
  }

  private activateFreeze() {
    this.freezeActive = true;
    this.freezeCooldownMs = 15000 - this.freezeUpgradeCount * 1000; // 15s base, -1s per upgrade
    this.statusText.setText('Click an enemy to freeze it');
  }
  
  private handlePointerDown(pointer: Phaser.Input.Pointer) {
    if (this.freezeActive) {
      this.handleFreezeClick(pointer);
      return;
    }

    if (!this.selectedUnitType || !this.roundActive) {
      return;
    }

    const row = Math.floor((pointer.y - GRID_OFFSET_Y) / (TILE_SIZE + TILE_PADDING));
    const col = Math.floor((pointer.x - GRID_OFFSET_X) / (TILE_SIZE + TILE_PADDING));

    if (row < 0 || row >= this.getCurrentGridRows() || col < 0 || col >= GRID_COLS) {
      return;
    }

    if (this.isTileOccupied(row, col)) {
      this.statusText.setText('Tile is occupied');
      return;
    }

    const unitConfig = UNIT_CONFIGS[this.selectedUnitType];
    if (!unitConfig) {
      return;
    }

    this.placeUnit(row, col, this.selectedUnitType);
    this.currentCurrency -= unitConfig.cost;
    this.updateCurrencyText();
    this.selectedUnitType = null;
    this.selectionText.setText('Select a unit to place');
    this.statusText.setText(`${unitConfig.displayName} placed`);
  }

  private handleFreezeClick(pointer: Phaser.Input.Pointer) {
    const clickedEnemy = this.enemies.getChildren().find((child) => {
      const enemy = child as Phaser.Physics.Arcade.Image;
      if (!enemy.active) {
        return false;
      }

      const body = enemy.body as Phaser.Physics.Arcade.Body;
      return body.hitTest(pointer.x, pointer.y);
    }) as Phaser.Physics.Arcade.Image;

    if (clickedEnemy) {
      this.freezeEnemy(clickedEnemy);
    } else {
      this.statusText.setText('No enemy clicked - freeze cancelled');
    }

    this.freezeActive = false;
  }

  private freezeEnemy(enemy: Phaser.Physics.Arcade.Image) {
    const body = enemy.body as Phaser.Physics.Arcade.Body;
    const originalSpeed = -body.velocity.x;
    enemy.setData('originalSpeed', originalSpeed);
    enemy.setVelocityX(0);
    enemy.setTint(0x6666ff);
    enemy.setData('freezeEndTime', this.time.now + this.freezeDurationMs);
    this.statusText.setText('Enemy frozen for 5 seconds');
  }

  private isTileOccupied(row: number, col: number): boolean {
    if (this.unitOccupancy[row][col]) {
      return true;
    }

    const tileX = GRID_OFFSET_X + col * (TILE_SIZE + TILE_PADDING);
    const tileY = GRID_OFFSET_Y + row * (TILE_SIZE + TILE_PADDING);
    const tileRect = new Phaser.Geom.Rectangle(tileX, tileY, TILE_SIZE, TILE_SIZE);

    return this.enemies.getChildren().some((child) => {
      const enemy = child as Phaser.Physics.Arcade.Image;
      if (!enemy.active) {
        return false;
      }

      const body = enemy.body as Phaser.Physics.Arcade.Body;
      const enemyRect = new Phaser.Geom.Rectangle(body.x, body.y, body.width, body.height);
      return Phaser.Geom.Intersects.RectangleToRectangle(tileRect, enemyRect);
    });
  }

  private placeUnit(row: number, col: number, type: string) {
    const unitConfig = UNIT_CONFIGS[type];
    const x = GRID_OFFSET_X + col * (TILE_SIZE + TILE_PADDING) + TILE_SIZE / 2;
    const y = GRID_OFFSET_Y + row * (TILE_SIZE + TILE_PADDING) + TILE_SIZE / 2;

    const unit = this.add.image(x, y, `unit-${type.toLowerCase()}`);
    unit.setOrigin(0.5, 0.5);
    unit.setData('type', type);
    unit.setData('row', row);
    unit.setData('col', col);
    unit.setData('nextFireTime', 0);
    unit.setData('config', {
      cost: unitConfig.cost,
      range: type === 'Hunter' ? 4 : type === 'Sniper' ? 9 : type === 'Bomber' ? 6 : 5, // Sheriff has shorter range
      cooldown: type === 'Hunter' ? 1000 : type === 'Sniper' ? 1800 : type === 'Bomber' ? 2500 : 1200, // Bomber has longer cooldown
      damage: type === 'Hunter' ? 18 : type === 'Sniper' ? 28 : type === 'Bomber' ? 35 : 15 // Sheriff has lower damage but buffs others
    });
    
    // Special unit properties
    if (type === 'Sheriff') {
      unit.setData('buffRange', 2); // Buffs units within 2 tiles
      unit.setData('damageBoost', 5); // +5 damage to adjacent units
      unit.setData('cooldownBoost', 200); // -200ms cooldown to adjacent units
    }

    this.units.add(unit);
    this.unitOccupancy[row][col] = true;
    
    // Play placement sound
    this.playSound('placeUnit');
  }

  private handleUnitFire(time: number) {
    this.units.getChildren().forEach((child) => {
      const unit = child as Phaser.GameObjects.Image;
      const type = unit.getData('type') as string;
      const config = unit.getData('config') as { range: number; cooldown: number; damage: number };
      const nextFireTime = unit.getData('nextFireTime') as number;
      const row = unit.getData('row') as number;

      if (time < nextFireTime) {
        return;
      }

      const target = this.findTargetEnemy(row, unit.x, config.range);
      if (!target) {
        return;
      }

      // Use buffed stats if available
      const buffedDamage = unit.getData('buffedDamage') as number || config.damage;
      const buffedCooldown = unit.getData('buffedCooldown') as number || config.cooldown;

      if (type === 'Bomber') {
        // Bomber fires dynamite that travels 3 spaces and can pass over enemies
        this.fireBomberProjectile(unit.x, unit.y, row, buffedDamage);
        this.playSound('shoot');
      } else {
        this.fireProjectile(unit.x, unit.y, target, buffedDamage);
        this.playSound('shoot');
      }
      unit.setData('nextFireTime', time + buffedCooldown);
      
      // Apply Sheriff buffs to adjacent units
      if (type === 'Sheriff') {
        this.applySheriffBuffs(unit);
      }
    });
  }

  private findTargetEnemy(row: number, unitX: number, range: number) {
    const maxDistance = range * (TILE_SIZE + TILE_PADDING);
    const enemiesInRow = this.enemies.getChildren().filter((child) => {
      const enemy = child as Phaser.Physics.Arcade.Image;
      return enemy.active && enemy.getData('row') === row && enemy.x > unitX;
    }) as Phaser.Physics.Arcade.Image[];

    return enemiesInRow
      .filter((enemy) => enemy.x - unitX <= maxDistance)
      .sort((a, b) => a.x - b.x)[0];
  }

  private fireProjectile(x: number, y: number, target: Phaser.Physics.Arcade.Image, damage: number) {
    const projectile = this.physics.add.image(x + TILE_SIZE / 2, y, 'projectile');
    projectile.setVelocityX(300);
    projectile.setData('damage', damage);
    projectile.body.setSize(16, 16);
    projectile.body.setAllowGravity(false);
    projectile.setData('target', target);

    this.projectiles.add(projectile);
  }

  private onProjectileHitEnemy(projectile: Phaser.GameObjects.GameObject, enemyObject: Phaser.GameObjects.GameObject) {
    const bullet = projectile as Phaser.Physics.Arcade.Image;
    const enemy = enemyObject as Phaser.Physics.Arcade.Image;
    const damage = bullet.getData('damage') as number;
    const currentHealth = enemy.getData('health') as number;
    enemy.setData('health', currentHealth - damage);
    
    // Boss retaliation when damaged
    const canRetaliate = enemy.getData('canRetaliate') as boolean;
    if (canRetaliate) {
      this.handleBossRetaliation(enemy);
    }
    
    // Dynamite passes through enemies, normal projectiles are destroyed
    if (!bullet.getData('isDynamite')) {
      bullet.destroy();
    }
  }

  private handleBossRetaliation(boss: Phaser.Physics.Arcade.Image) {
    const bossRow = boss.getData('row') as number;
    
    // Find the closest unit in the same row
    let closestUnit: Phaser.GameObjects.Image | null = null;
    let closestDistance = Infinity;
    
    this.units.getChildren().forEach((child) => {
      const unit = child as Phaser.GameObjects.Image;
      if (unit.getData('row') === bossRow && unit.x < boss.x) {
        const distance = boss.x - unit.x;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestUnit = unit;
        }
      }
    });
    
    if (closestUnit) {
      // Damage the closest unit
      const currentHealth = (closestUnit as Phaser.GameObjects.Image).getData('health') as number;
      (closestUnit as Phaser.GameObjects.Image).setData('health', currentHealth - 25); // 25 retaliation damage
      
      // Visual effect
      (closestUnit as Phaser.GameObjects.Image).setTint(0xff6600);
      this.time.addEvent({
        delay: 500,
        callback: () => (closestUnit as Phaser.GameObjects.Image)?.clearTint()
      });
      
      // Show retaliation effect
      const effect = this.add.text(boss.x, boss.y - 30, 'REVENGE!', { 
        fontSize: '16px', 
        color: '#ff0000',
        fontStyle: 'bold'
      });
      this.time.addEvent({
        delay: 1000,
        callback: () => effect.destroy()
      });
    }
  }

  private fireBomberProjectile(x: number, y: number, row: number, damage: number) {
    // Dynamite travels 3 spaces and can pass over enemies
    const projectile = this.physics.add.image(x + TILE_SIZE / 2, y, 'projectile');
    projectile.setVelocityX(200); // Slower than normal projectiles
    projectile.setData('damage', damage);
    projectile.setData('isDynamite', true);
    projectile.setData('travelDistance', 3 * (TILE_SIZE + TILE_PADDING));
    projectile.setData('startX', x);
    projectile.body.setSize(16, 16);
    projectile.body.setAllowGravity(false);

    this.projectiles.add(projectile);
  }

  private applySheriffBuffs(sheriff: Phaser.GameObjects.Image) {
    const sheriffRow = sheriff.getData('row') as number;
    const sheriffCol = sheriff.getData('col') as number;
    const buffRange = sheriff.getData('buffRange') as number;
    
    this.units.getChildren().forEach((child) => {
      const unit = child as Phaser.GameObjects.Image;
      if (unit === sheriff) return;
      
      const unitRow = unit.getData('row') as number;
      const unitCol = unit.getData('col') as number;
      
      // Check if unit is within buff range (adjacent tiles)
      const rowDiff = Math.abs(unitRow - sheriffRow);
      const colDiff = Math.abs(unitCol - sheriffCol);
      
      if (rowDiff <= buffRange && colDiff <= buffRange && (rowDiff + colDiff) > 0) {
        // Apply buff (increase damage and reduce cooldown)
        const config = unit.getData('config') as { damage: number; cooldown: number };
        unit.setData('buffedDamage', (unit.getData('buffedDamage') as number || config.damage) + 5);
        unit.setData('buffedCooldown', (unit.getData('buffedCooldown') as number || config.cooldown) - 200);
      }
    });
  }

  private onEnemyReachedDefense(enemy: Phaser.Physics.Arcade.Image) {
    enemy.destroy();
    this.applyDefenseDamage(20);
    if (this.defenseHealth <= 0) {
      this.failRound();
    }
  }

  private startRound() {
    // Check if grid should expand
    const newRowCount = this.getCurrentGridRows();
    const oldRowCount = this.gridTiles.length;
    if (newRowCount > oldRowCount) {
      this.createGrid();
      this.statusText.setText(`Map expanded to ${newRowCount} rows!`);
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.statusText.setText('Round started');
        }
      });
    }

    this.currentCurrency = this.startingCurrency;
    this.currentWave = 0;
    this.totalWaves = 1 + Math.floor((this.currentRound - 1) / 4); // +1 wave every 4 rounds
    this.roundElapsedMs = 0;
    this.damageTaken = 0;
    this.defenseHealth = this.defenseMaxHealth;
    this.roundActive = true;
    this.roundFailed = false;
    this.roundComplete = false;
    this.waveInProgress = false;
    this.enemyTypesSeen.clear();
    this.selectedUnitType = null;
    this.selectionText.setText('Select a unit to place');
    this.updateRoundText();
    this.updateCurrencyText();
    this.updateTimerText();
    this.updateDamageText();
    this.updateWaveText();
    if (newRowCount === oldRowCount) {
      this.statusText.setText('Round started');
    }
    
    // Start background music
    this.startBackgroundMusic();
    
    this.startNextWave();

    // Fade in camera
    this.cameras.main.fadeIn(500, 0, 0, 0);
  }

  private startNextWave() {
    if (!this.roundActive) {
      return;
    }

    this.currentWave += 1;
    this.pendingSpawns = 0;
    this.updateWaveText();
    this.statusText.setText(`Wave ${this.currentWave} of ${this.totalWaves}`);
    this.waveInProgress = true;
    this.spawnWave();
  }

  private spawnWave() {
    const currentRows = this.getCurrentGridRows();
    const rows = Array.from({ length: currentRows }, (_, i) => i);
    
    // Increase enemy count based on round (more enemies in higher rounds)
    const baseEnemiesPerRow = 1;
    const extraEnemies = Math.floor((this.currentRound - 1) / 3); // +1 enemy every 3 rounds
    const enemiesPerRow = baseEnemiesPerRow + extraEnemies;
    
    // Faster spawn rate in higher rounds
    const baseSpawnDelay = 1000; // 1 second
    const spawnDelayReduction = Math.min(800, (this.currentRound - 1) * 50); // Up to 800ms faster
    const spawnDelay = Math.max(200, baseSpawnDelay - spawnDelayReduction);
    
    let spawnIndex = 0;
    rows.forEach((rowIndex) => {
      // Determine enemy type based on round and row
      let enemyType: string;
      
      // Boss round every 10 rounds starting from round 20
      if (this.currentRound >= 20 && (this.currentRound - 20) % 10 === 0 && rowIndex === Math.floor(currentRows / 2)) {
        enemyType = 'Turtle';
      } else if (this.currentRound >= 15) {
        // Very high rounds: mix of all advanced enemies
        const advancedTypes = ['Dolphin', 'Seahorse', 'FlyingFish', 'Pufferfish'];
        enemyType = advancedTypes[rowIndex % advancedTypes.length];
      } else if (this.currentRound >= 10) {
        // High rounds: introduce advanced enemies
        if (rowIndex === 0) enemyType = 'Dolphin';
        else if (rowIndex === 1) enemyType = 'Seahorse';
        else if (rowIndex === 2) enemyType = 'FlyingFish';
        else if (rowIndex >= 3) enemyType = 'Pufferfish';
        else enemyType = 'Crab';
      } else if (this.currentRound >= 6) {
        // Mid rounds: mix with some advanced
        if (rowIndex === 0) enemyType = 'Fish';
        else if (rowIndex === 1) enemyType = 'Shrimp';
        else if (rowIndex === 2) enemyType = 'Dolphin';
        else enemyType = 'Crab';
      } else {
        // Early rounds: basic enemies
        enemyType = rowIndex === 0 ? 'Fish' : rowIndex === 1 ? 'Shrimp' : 'Crab';
      }
      
      for (let i = 0; i < enemiesPerRow; i++) {
        this.pendingSpawns += 1;
        this.time.addEvent({
          delay: spawnIndex * spawnDelay,
          callback: () => this.spawnEnemy(enemyType, rowIndex)
        });
        spawnIndex++;
      }
    });
  }

  private spawnEnemy(type: string, row: number) {
    const config = ENEMY_CONFIGS[type];
    
    // Apply difficulty scaling
    const healthMultiplier = 1 + (this.currentRound - 1) * 0.1; // +10% health per round
    const speedMultiplier = 1 + (this.currentRound - 1) * 0.05; // +5% speed per round
    
    const scaledHealth = Math.floor(config.maxHealth * healthMultiplier);
    const scaledSpeed = Math.floor(config.speed * speedMultiplier);
    
    const width = config.widthTiles * TILE_SIZE;
    const spawnX = GRID_OFFSET_X + GRID_COLS * (TILE_SIZE + TILE_PADDING) - TILE_PADDING - width / 2;
    const spawnY = GRID_OFFSET_Y + row * (TILE_SIZE + TILE_PADDING) + TILE_SIZE / 2;

    const enemy = this.physics.add.image(spawnX, spawnY, `enemy-${type.toLowerCase()}`);
    enemy.setOrigin(0.5, 0.5);
    enemy.setVelocityX(-scaledSpeed);
    enemy.setData('type', type);
    enemy.setData('health', scaledHealth);
    enemy.setData('maxHealth', scaledHealth);
    enemy.setData('widthTiles', config.widthTiles);
    enemy.setData('originalSpeed', scaledSpeed);
    enemy.setData('row', row);
    
    // Add behavior flags based on enemy type
    enemy.setData('canJumpRows', type === 'Dolphin' || type === 'Seahorse');
    enemy.setData('canGlide', type === 'FlyingFish');
    enemy.setData('explodesOnDeath', type === 'Pufferfish');
    enemy.setData('isBoss', type === 'Turtle');
    enemy.setData('canSwitchRows', type === 'Turtle');
    enemy.setData('canRetaliate', type === 'Turtle');
    enemy.setData('canBeamAttack', type === 'Turtle');
    enemy.setData('jumpCooldown', 0);
    enemy.setData('glideCooldown', 0);
    enemy.setData('rowSwitchCooldown', 0);
    enemy.setData('beamCooldown', 0);
    
    enemy.setImmovable(true);
    enemy.body.setSize(width, TILE_SIZE);
    enemy.body.setOffset(-width / 2 + TILE_SIZE / 2, 0);

    this.enemies.add(enemy);
    this.pendingSpawns = Math.max(0, this.pendingSpawns - 1);
    this.showEnemyInfo(type);
  }

  private showEnemyInfo(type: string) {
    if (this.enemyTypesSeen.has(type)) {
      return;
    }

    this.enemyTypesSeen.add(type);
    const config = ENEMY_CONFIGS[type];
    this.popupText.setText(`${config.displayName}: ${this.getEnemyDescription(type)}`);

    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.popupText.setText('');
      }
    });
  }

  private getEnemyDescription(type: string): string {
    switch (type) {
      case 'Fish':
        return 'Normal swimmer with balanced stats.';
      case 'Shrimp':
        return 'Fast mover with lower health.';
      case 'Crab':
        return 'Tanky and wide, occupies two spaces.';
      case 'Dolphin':
        return 'Jumps between rows to avoid obstacles.';
      case 'Seahorse':
        return 'Slowly jumps between rows.';
      case 'FlyingFish':
        return 'Glides over units in its path.';
      case 'Pufferfish':
        return 'Explodes on death, damaging nearby enemies.';
      case 'Turtle':
        return 'Boss: Switches rows, fires eye beams, retaliates when damaged.';
      default:
        return 'Unknown enemy.';
    }
  }

  private completeRound() {
    if (!this.roundActive) {
      return;
    }

    this.roundActive = false;
    this.roundComplete = true;
    const rank = this.calculateRank();
    const reward = this.goldForRank(rank);
    this.gold += reward;
    this.savePersistentProgress();
    this.updateGoldText();

    // Transition to round end scene
    this.transitionToScene('RoundEnd', {
      rank: rank,
      goldEarned: reward,
      roundNumber: this.currentRound
    });
  }

  private failRound() {
    if (!this.roundActive) {
      return;
    }

    this.roundActive = false;
    this.roundFailed = true;
    this.statusText.setText('Round failed - defense breached');
  }

  private updateRoundText() {
    this.roundText.setText(`Round ${this.currentRound}`);
  }

  private updateCurrencyText() {
    this.currencyText.setText(`💰 ${this.currentCurrency}`);
  }

  private updateTimerText() {
    const seconds = (this.roundElapsedMs / 1000).toFixed(1);
    this.timerText.setText(`⏱️ ${seconds}s`);
  }

  private updateDamageText() {
    this.damageText.setText(`❤️ ${this.defenseHealth}/${this.defenseMaxHealth} | 💥 ${this.damageTaken}`);
  }

  private updateWaveText() {
    this.waveText.setText(`🌊 ${this.currentWave}/${this.totalWaves}`);
  }

  private calculateRank(): string {
    const seconds = this.roundElapsedMs / 1000;

    if (this.damageTaken === 0 && seconds <= 30) {
      return 'S';
    }
    if (this.damageTaken <= 10 && seconds <= 45) {
      return 'A';
    }
    if (this.damageTaken <= 25 && seconds <= 60) {
      return 'B';
    }
    if (this.damageTaken <= 50 && seconds <= 90) {
      return 'C';
    }

    return 'D';
  }

  private goldForRank(rank: string): number {
    switch (rank) {
      case 'S':
        return 100;
      case 'A':
        return 75;
      case 'B':
        return 50;
      case 'C':
        return 25;
      default:
        return 10;
    }
  }

  private triggerDefenseBreach() {
    this.failRound();
  }

  private applyDefenseDamage(amount: number) {
    this.damageTaken += amount;
    this.defenseHealth = Math.max(0, this.defenseHealth - amount);
    this.updateDamageText();
    this.statusText.setText(`Defense hit for ${amount} damage`);
  }

  private startBackgroundMusic() {
    const music = this.game.registry.get('backgroundMusic');
    if (music && !this.backgroundMusicPlaying) {
      this.backgroundMusic = music.play();
      this.backgroundMusicPlaying = true;
    }
  }

  private stopBackgroundMusic() {
    if (this.backgroundMusic && this.backgroundMusicPlaying) {
      this.backgroundMusic.stop();
      this.backgroundMusicPlaying = false;
    }
  }

  private playSound(soundName: string) {
    const sound = this.game.registry.get(soundName);
    if (sound) {
      sound.play();
    }
  }

  private transitionToScene(sceneKey: string, data?: any) {
    // Add fade out effect
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(sceneKey, data);
    });
  }
}
