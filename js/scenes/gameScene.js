class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Initialize players
        this.player1 = new Player(this, 200, 360, 1, 0x00aa00);
        this.player2 = new Player(this, 1080, 360, 2, 0xff0000);

        // Create obstacle groups
        this.obstacles = this.physics.add.group();
        this.createObstacles();

        // Create projectile groups
        this.projectiles1 = this.physics.add.group();
        this.projectiles2 = this.physics.add.group();

        // Setup weapon systems
        this.player1.weapon = new Weapon(this, this.player1, this.projectiles1);
        this.player2.weapon = new Weapon(this, this.player2, this.projectiles2);

        // Setup rank systems
        this.player1.rankSystem = new RankSystem(1);
        this.player2.rankSystem = new RankSystem(2);

        // Physics collisions
        this.physics.add.overlap(this.projectiles1, this.player2.sprite, (projectile, player) => {
            this.handleHit(projectile, this.player2, this.player1);
        });

        this.physics.add.overlap(this.projectiles2, this.player1.sprite, (projectile, player) => {
            this.handleHit(projectile, this.player1, this.player2);
        });

        // Projectiles hit obstacles
        this.physics.add.collider(this.projectiles1, this.obstacles, (projectile) => {
            projectile.destroy();
        });

        this.physics.add.collider(this.projectiles2, this.obstacles, (projectile) => {
            projectile.destroy();
        });

        // Players collide with obstacles
        this.physics.add.collider(this.player1.sprite, this.obstacles);
        this.physics.add.collider(this.player2.sprite, this.obstacles);

        // Input handling
        this.setupInput();

        // Create HUD
        this.createHUD();

        // Game over flag
        this.gameOver = false;
    }

    createObstacles() {
        const obstaclePositions = [
            { x: 640, y: 360, type: 'box', width: 60, height: 60 },
            { x: 300, y: 200, type: 'house', width: 100, height: 80 },
            { x: 980, y: 200, type: 'house', width: 100, height: 80 },
            { x: 300, y: 520, type: 'box', width: 60, height: 60 },
            { x: 980, y: 520, type: 'box', width: 60, height: 60 }
        ];

        obstaclePositions.forEach(obs => {
            new Obstacle(this, obs.x, obs.y, obs.type, obs.width, obs.height);
        });
    }

    setupInput() {
        // Player 1 (WASD + Mouse)
        this.keys1 = {
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        // Player 2 (Arrow Keys + Mouse)
        this.keys2 = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        };

        // Mouse click for shooting
        this.input.on('pointerdown', (pointer) => {
            if (!this.gameOver) {
                this.player1.weapon.fire(pointer.x, pointer.y);
                this.player2.weapon.fire(pointer.x, pointer.y);
            }
        });
    }

    update() {
        if (this.gameOver) return;

        // Player 1 movement
        const vel1 = new Phaser.Math.Vector2(0, 0);
        if (this.keys1.w.isDown) vel1.y = -GAME_CONSTANTS.PLAYER_SPEED;
        if (this.keys1.s.isDown) vel1.y = GAME_CONSTANTS.PLAYER_SPEED;
        if (this.keys1.a.isDown) vel1.x = -GAME_CONSTANTS.PLAYER_SPEED;
        if (this.keys1.d.isDown) vel1.x = GAME_CONSTANTS.PLAYER_SPEED;
        this.player1.setVelocity(vel1);

        // Player 2 movement
        const vel2 = new Phaser.Math.Vector2(0, 0);
        if (this.keys2.up.isDown) vel2.y = -GAME_CONSTANTS.PLAYER_SPEED;
        if (this.keys2.down.isDown) vel2.y = GAME_CONSTANTS.PLAYER_SPEED;
        if (this.keys2.left.isDown) vel2.x = -GAME_CONSTANTS.PLAYER_SPEED;
        if (this.keys2.right.isDown) vel2.x = GAME_CONSTANTS.PLAYER_SPEED;
        this.player2.setVelocity(vel2);

        // Update player rotations based on mouse
        const pointer = this.input.activePointer;
        this.player1.rotateTowards(pointer.x, pointer.y);
        this.player2.rotateTowards(pointer.x, pointer.y);

        // Update HUD
        this.updateHUD();

        // Check for game over
        if (this.player1.health <= 0 || this.player2.health <= 0) {
            this.endGame();
        }
    }

    handleHit(projectile, hitPlayer, shootingPlayer) {
        const damage = shootingPlayer.rankSystem.getDamage();
        hitPlayer.takeDamage(damage);
        projectile.destroy();

        // Award points
        shootingPlayer.score += 10;

        // Check for rank up
        if (shootingPlayer.score >= shootingPlayer.rankSystem.getNextRankPoints()) {
            shootingPlayer.rankSystem.rankUp();
        }
    }

    createHUD() {
        this.player1HUD = this.add.text(10, 10, '', {
            font: '16px Arial',
            fill: '#00ff00'
        });

        this.player2HUD = this.add.text(1270, 10, '', {
            font: '16px Arial',
            fill: '#ff0000'
        }).setOrigin(1, 0);

        this.rankDisplay1 = this.add.text(10, 60, '', {
            font: 'bold 20px Arial',
            fill: '#ffff00'
        });

        this.rankDisplay2 = this.add.text(1270, 60, '', {
            font: 'bold 20px Arial',
            fill: '#ffff00'
        }).setOrigin(1, 0);
    }

    updateHUD() {
        this.player1HUD.setText(`Player 1 HP: ${this.player1.health}`);
        this.player2HUD.setText(`Player 2 HP: ${this.player2.health}`);

        const rank1 = GAME_CONSTANTS.RANKS[this.player1.rankSystem.rank];
        const rank2 = GAME_CONSTANTS.RANKS[this.player2.rankSystem.rank];

        this.rankDisplay1.setText(`${rank1.name} (${this.player1.rankSystem.rank})`);
        this.rankDisplay2.setText(`${rank2.name} (${this.player2.rankSystem.rank})`);
    }

    endGame() {
        this.gameOver = true;
        const winner = this.player1.health > 0 ? 'PLAYER 1' : 'PLAYER 2';
        
        const gameOverText = this.add.text(640, 360, `${winner} WINS!`, {
            font: 'bold 80px Arial',
            fill: '#ffff00',
            align: 'center',
            backgroundColor: '#000000',
            padding: { x: 20, y: 20 }
        }).setOrigin(0.5).setDepth(100);

        const restartText = this.add.text(640, 450, 'Click to Return to Menu', {
            font: '24px Arial',
            fill: '#00ff00',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        restartText.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
