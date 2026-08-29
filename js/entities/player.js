class Player {
    constructor(scene, x, y, playerNumber, color) {
        this.scene = scene;
        this.playerNumber = playerNumber;
        this.color = color;
        this.health = GAME_CONSTANTS.MAX_HEALTH;
        this.score = 0;
        this.rankSystem = null;
        this.weapon = null;

        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, null);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(0.2);

        // Draw player circle
        const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(color, 1);
        graphics.fillCircle(15, 15, 15);
        graphics.generateTexture('player' + playerNumber, 30, 30);
        graphics.destroy();

        this.sprite.setTexture('player' + playerNumber);
        this.sprite.setScale(1.5);
    }

    setVelocity(velocity) {
        this.sprite.setVelocity(velocity.x, velocity.y);
    }

    rotateTowards(x, y) {
        const angle = Phaser.Math.Angle.Between(
            this.sprite.x,
            this.sprite.y,
            x,
            y
        );
        this.sprite.setRotation(angle);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;

        // Visual feedback - flash
        this.sprite.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => {
            this.sprite.clearTint();
        });
    }

    heal(amount) {
        this.health += amount;
        if (this.health > GAME_CONSTANTS.MAX_HEALTH) {
            this.health = GAME_CONSTANTS.MAX_HEALTH;
        }
    }

    addScore(points) {
        this.score += points;
    }
}