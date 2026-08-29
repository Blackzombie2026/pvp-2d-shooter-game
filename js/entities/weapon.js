class Weapon {
    constructor(scene, player, projectileGroup) {
        this.scene = scene;
        this.player = player;
        this.projectileGroup = projectileGroup;
        this.lastFiredTime = 0;
        this.fireRate = GAME_CONSTANTS.WEAPON_COOLDOWN;
    }

    fire(targetX, targetY) {
        const now = this.scene.time.now;
        
        if (now - this.lastFiredTime < this.fireRate) {
            return; // Weapon not ready
        }

        this.lastFiredTime = now;

        // Create projectile from player position towards target
        new Projectile(
            this.scene,
            this.player.sprite.x,
            this.player.sprite.y,
            targetX,
            targetY,
            GAME_CONSTANTS.PROJECTILE_SPEED,
            this.projectileGroup
        );

        // Weapon recoil effect
        const recoilAngle = this.player.sprite.rotation + Math.PI;
        this.player.sprite.setVelocity(
            Math.cos(recoilAngle) * 50,
            Math.sin(recoilAngle) * 50
        );
    }

    upgradeFireRate(reduction) {
        this.fireRate = Math.max(50, this.fireRate - reduction);
    }

    upgradeDamage(increase) {
        // Damage is handled by RankSystem
    }
}