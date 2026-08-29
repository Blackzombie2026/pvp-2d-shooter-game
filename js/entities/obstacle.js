class Obstacle {
    constructor(scene, x, y, type, width, height) {
        this.scene = scene;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, null);
        this.sprite.setImmovable(true);
        this.sprite.setCollideWorldBounds(false);

        // Draw obstacle based on type
        if (type === 'box') {
            this.drawBox();
        } else if (type === 'house') {
            this.drawHouse();
        }

        this.sprite.setDisplaySize(width, height);
        scene.obstacles.add(this.sprite);
    }

    drawBox() {
        const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x8b4513, 1); // Brown color
        graphics.fillRect(0, 0, 60, 60);
        graphics.lineStyle(2, 0x654321, 1);
        graphics.strokeRect(0, 0, 60, 60);
        graphics.generateTexture('obstacle_box', 60, 60);
        graphics.destroy();
        this.sprite.setTexture('obstacle_box');
    }

    drawHouse() {
        const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
        
        // Walls
        graphics.fillStyle(0xd2691e, 1); // Chocolate color
        graphics.fillRect(0, 20, 100, 60);
        
        // Roof
        graphics.fillStyle(0x8b0000, 1); // Dark red
        graphics.fillTriangleShape(new Phaser.Geom.Triangle(50, 0, 0, 20, 100, 20));
        
        // Door
        graphics.fillStyle(0x654321, 1);
        graphics.fillRect(40, 60, 20, 20);
        
        graphics.generateTexture('obstacle_house', 100, 80);
        graphics.destroy();
        this.sprite.setTexture('obstacle_house');
    }

    canBlock(projectile) {
        return true; // All obstacles block projectiles
    }
}