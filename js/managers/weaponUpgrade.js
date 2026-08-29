class WeaponUpgrade {
    constructor(player) {
        this.player = player;
        this.upgrades = {
            fireRate: 0,
            damage: 0,
            projectileSpeed: 0
        };
    }

    upgradeFireRate() {
        if (this.player.score >= 50) {
            this.player.score -= 50;
            this.upgrades.fireRate++;
            this.player.weapon.upgradeFireRate(20);
            return true;
        }
        return false;
    }

    upgradeDamage() {
        if (this.player.score >= 100) {
            this.player.score -= 100;
            this.upgrades.damage++;
            return true;
        }
        return false;
    }

    upgradeProjectileSpeed() {
        if (this.player.score >= 75) {
            this.player.score -= 75;
            this.upgrades.projectileSpeed++;
            return true;
        }
        return false;
    }

    getUpgradeLevel(type) {
        return this.upgrades[type] || 0;
    }
}