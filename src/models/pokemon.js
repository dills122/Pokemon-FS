class Pokemon {

    constructor (name, power, defense) {
        this.name = name;
        this.count = 1;
        this.power = power;
        this.defense = defense;
    }

    LevelDefense() {
        this.defense += Math.floor(((this.defense * .20) - (this.defense * .05)) * 1.05);
    }

    LevelPower() {
        this.defense += Math.floor(((this.defense * .12) - (this.defense * .04)) * 1.11);
    }
}

module.exports = {
    Pokemon
}