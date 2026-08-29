class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Title
        this.add.text(centerX, centerY - 150, 'PvP 2D SHOOTER', {
            font: 'bold 60px Arial',
            fill: '#00ff00',
            align: 'center'
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(centerX, centerY - 50, 'Top-Down Action Battle', {
            font: '24px Arial',
            fill: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);

        // Start Button
        const startButton = this.add.text(centerX, centerY + 50, 'START GAME', {
            font: 'bold 28px Arial',
            fill: '#ffffff',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerover', () => {
            startButton.setStyle({ backgroundColor: '#00ff00' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ backgroundColor: '#00aa00' });
        });

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Instructions
        this.add.text(centerX, centerY + 150, 'Player 1: WASD + Mouse to aim/shoot\nPlayer 2: Arrow Keys + Click to aim/shoot', {
            font: '16px Arial',
            fill: '#cccccc',
            align: 'center'
        }).setOrigin(0.5);

        // Features
        this.add.text(centerX, centerY + 230, 'Features: 5 Ranks • Weapon Upgrades • Obstacles', {
            font: 'bold 18px Arial',
            fill: '#00ffff',
            align: 'center'
        }).setOrigin(0.5);
    }
}
