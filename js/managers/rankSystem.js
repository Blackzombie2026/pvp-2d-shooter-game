class RankSystem {
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.rank = 1;
        this.experience = 0;
        this.experienceForNextRank = 100;
    }

    getRankInfo() {
        return GAME_CONSTANTS.RANKS[this.rank];
    }

    getDamage() {
        return this.getRankInfo().damage;
    }

    getFireRate() {
        return this.getRankInfo().fireRate;
    }

    getNextRankPoints() {
        return this.experienceForNextRank;
    }

    addExperience(amount) {
        this.experience += amount;
        
        if (this.experience >= this.experienceForNextRank && this.rank < 5) {
            this.rankUp();
        }
    }

    rankUp() {
        if (this.rank < 5) {
            this.rank++;
            this.experience = 0;
            this.experienceForNextRank += 50; // Next rank requires more points
            return true;
        }
        return false;
    }

    getRankColor() {
        return this.getRankInfo().color;
    }

    getRankName() {
        return this.getRankInfo().name;
    }
}