class Projectile {
    constructor(scene, x, y, targetX, targetY, speed, group) {
        this.scene = scene;
        this.damage = 10;

        // Calculate direction
        const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
        const velocity = new Phaser.Math.Vector2(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );

        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, null);
        
        // Draw bullet
        const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffff00, 1);
        graphics.fillCircle(4, 4, 4);
        graphics.generateTexture('projectile', 8, 8);
        graphics.destroy();

        this.sprite.setTexture('projectile');
        this.sprite.setVelocity(velocity.x, velocity.y);
        this.sprite.setRotation(angle);
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setGravityY(0);

        group.add(this.sprite);

        // Auto-destroy after 10 seconds
        scene.time.delayedCall(10000, () => {
            if (this.sprite && this.sprite.active) {
                this.sprite.destroy();
            }
        });
    }
}