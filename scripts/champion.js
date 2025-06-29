import { titan, challenger } from "./script.js";
let opponent;

export class Champion {
    constructor(name, flavorText, maxHealth, speed, armor, attack1, attack2, attack3, attack4, isTitan) {
        this.name = name;
        this.flavorText = flavorText;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.speed = speed;
        this.armor = armor;
        this.specialAbility = "";
        this.ultimate = "";
        this.isInUltimateForm = false;
        this.benchPower = "";
        this.attack1Damage = attack1;
        this.attack2Damage = attack2;
        this.attack3Damage = attack3;
        this.attack4Damage = attack4;
        this.isTitan = isTitan;
        this.isAlive = true;
        this.isCharged = false;
        this.countersBlue = false;
        this.countersGreen = false;
        this.countersYellow = false;
        this.countersRed = false;
        this.powerTokens = 0;
        this.armorTokens = 0;
        this.actionTokens = 0;
        this.actionTokensUsed = 0;
        this.poisonTokens = 0;
        this.dodgeTokens = 0;
    }
    takeDamage(damage) {
        let totalArmor = this.armor + this.armorTokens;
        if (totalArmor != 0 && damage >= 0) {
            damage -= totalArmor;
            console.log(this.name + "'s armor reduces incoming damage by " + this.armor + ".");
        }

        if (this.dodgeTokens > 0) {
            console.log(this.name + " uses a Dodge Token to avoid the attack.");
            this.dodgeTokens -= 1;
            console.log(this.name + " has " + this.dodgeTokens + " Dodge Token(s).");

            if (this.isTitan) {
                $(".js_titan-tokens-dodge").empty();
                for (let i = 0; i < this.dodgeTokens; i++) {
                    $(".js_titan-tokens-dodge").append(`<img class="token" src="./img/icons/icon_dodge_token.png">`);
                }
            } else {
                $(".js_challenger-tokens-dodge").empty();
                for (let i = 0; i < this.dodgeTokens; i++) {
                    $(".js_challenger-tokens-dodge").append(`<img class="token" src="./img/icons/icon_dodge_token.png">`);
                }
            }
        } else {
            this.currentHealth -= damage;
            if (this.currentHealth < 0) {
                this.currentHealth = 0;
            }
            console.log(this.name + " takes " + damage + " damage.");
            console.log(this.name + " has " + this.currentHealth + " health remaining.");

            if (this.currentHealth <= 0) {
                this.currentHealth = 0;
                this.isAlive = false;
            }

            if (!this.isAlive) {
                this.die();
            }

            this.takeDamageSpecific(damage);
            this.updateHealth();
        }

    }
    updateHealth() {
        let numberOfFives = Math.floor(this.currentHealth / 5);
        let numberOfOnes = this.currentHealth % 5;

        if (this.isTitan) {
            $(".js_titan-health").empty();
        
            for (let i = 0; i < numberOfFives; i++) {
                $(".js_titan-health").append(`<img class="champion-holder__health-icon champion-holder__health-icon--lg" src="./img/icons/icon_health_lg.png">`);
            }
            for (let i = 0; i < numberOfOnes; i++) {
                $(".js_titan-health").append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
            }
        } else {
            $(".js_challenger-health").empty();

            for (let i = 0; i < numberOfFives; i++) {
                $(".js_challenger-health").append(`<img class="champion-holder__health-icon champion-holder__health-icon--lg" src="./img/icons/icon_health_lg.png">`);
            }
            for (let i = 0; i < numberOfOnes; i++) {
                $(".js_challenger-health").append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
            }
        }
    }
    takeDamageSpecific(damage) {

    }
    gainHealth(health, index) {
        this.currentHealth += health;

        if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
        
        console.log(this.name + " gains " + health + " health. " + this.name + " has " + this.currentHealth + " remaining.");

        this.updateHealth();
    }
    startFight(index) {
    }
    startTurn(index) {
        console.log("-----START OF " + this.name.toUpperCase() + "'S TURN-----");
        if (this.poisonTokens === 0) return;

        this.currentHealth -= this.poisonTokens;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }
        console.log(this.name + " takes " + this.poisonTokens + " damage from Poison.")
        console.log(this.name + " has " + this.currentHealth + " health remaining.");

        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.isAlive = false;
        }

        if (!this.isAlive) {
            this.die();
        }

        this.updateHealth();
    }
    rollDie() {
        let dieRoll = Math.floor(Math.random() * 6) + 1;
        console.log("---ROLLING DIE---");

        opponent = this.identifyOpponent();

        if (dieRoll == 1) {
            this.attack1();
        }
        if (dieRoll == 2) {
            this.attack2();
        }
        if (dieRoll == 3) {
            this.attack3();
        }
        if (dieRoll == 4) {
            this.attack4();
        }
        if (dieRoll == 5) {
            this.charge();
        }
        if (dieRoll == 6) {
            this.miss();
        }
    }
    attack1() {
        console.log(this.name + " rolls their BLUE attack.");
        if (opponent.countersBlue) {
            opponent.counter();
        } else {
            let totalDamage = this.attack1Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage);
        }
    }
    attack2() {
        console.log(this.name + " rolls their GREEN attack.");
        if (opponent.countersGreen) {
            opponent.counter();
        } else {
            let totalDamage = this.attack2Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage);
        }
    }
    attack3() {
        console.log(this.name + " rolls their YELLOW attack.");
        if (opponent.countersYellow) {
            opponent.counter();
        } else {
            let totalDamage = this.attack3Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage);
        }
    }
    attack4() {
        console.log(this.name + " rolls their RED attack.");
        if (opponent.countersRed) {
            opponent.counter();
        } else {
            let totalDamage = this.attack4Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage);
        }
    }
    charge() {
        console.log(this.name + " rolls a CHARGE.");
        opponent.reactToCharge();
        if (!this.isCharged) {
            this.isCharged = true;
            if (this.isTitan) {
                $(".js_titan-charge").addClass("js_titan-charge--bright");
            } else {
                $(".js_challenger-charge").addClass("js_challenger-charge--bright");
            }
            console.log(this.name + " is charged. Rolling again...");
            this.rollDie();
        } else {
            console.log(this.name + " activates their ultimate ability.");
            this.activateUltimate();
            this.isCharged = false;
            if (this.isTitan) {
                $(".js_titan-charge").removeClass("js_titan-charge--bright");
            } else {
                $(".js_challenger-charge").removeClass("js_challenger-charge--bright");
            }
        }
    }
    reactToCharge() {
    }
    miss() {
        console.log(this.name + " misses.")
    }
    identifyOpponent() {
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        return opponent;
    }
    activateUltimate() {

    }
    gainUltimateForm() {
        if (this.isTitan) {
            $(".js_titan-ultimate").empty();
            $(".js_titan-ultimate").append(`<img class="token" src="./img/icons/icon_ultimate_token.png">`);
        } else {
            $(".js_challenger-ultimate").empty();
            $(".js_challenger-ultimate").append(`<img class="token" src="./img/icons/icon_ultimate_token.png">`);
        }
    }
    counter() {
        console.log(this.name + " counters the attack. Nothing happens.")
    }
    drainHealth(differenceInHealth) {
        this.currentHealth += differenceInHealth;
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
        console.log(this.name + " gains " + differenceInHealth + " health from DRAIN. " + this.name + "'s current health is " + this.currentHealth + ".");
        this.updateHealth();
    }
    gainPowerTokens(number) {
        console.log(this.name + " gains " + number + " Power Token(s).");
        this.powerTokens += number;
        console.log(this.name + " has " + this.powerTokens + " Power Token(s).");

        if (this.isTitan) {
            $(".js_titan-tokens-power").empty();
            for (let i = 0; i < this.powerTokens; i++) {
                $(".js_titan-tokens-power").append(`<img class="token" src="./img/icons/icon_power_token.png">`);
            }
        } else {
            $(".js_challenger-tokens-power").empty();
            for (let i = 0; i < this.powerTokens; i++) {
                $(".js_challenger-tokens-power").append(`<img class="token" src="./img/icons/icon_power_token.png">`);
            }
        }
    }
    gainPoisonTokens(number) {
        console.log(this.name + " gains " + number + " Poison Token(s).");
        this.poisonTokens += number;
        console.log(this.name + " has " + this.poisonTokens + " Poison Token(s).");

        if (this.isTitan) {
            $(".js_titan-tokens-poison").empty();
            for (let i = 0; i < this.poisonTokens; i++) {
                $(".js_titan-tokens-poison").append(`<img class="token" src="./img/icons/icon_poison_token.png">`);
            }
        } else {
            $(".js_challenger-tokens-poison").empty();
            for (let i = 0; i < this.poisonTokens; i++) {
                $(".js_challenger-tokens-poison").append(`<img class="token" src="./img/icons/icon_poison_token.png">`);
            }
        }
    }
    gainDodgeTokens(number) {
        console.log(this.name + " gains " + number + " Dodge Token(s).");
        this.dodgeTokens += number;
        console.log(this.name + " has " + this.dodgeTokens + " Dodge Token(s).");

        if (this.isTitan) {
            $(".js_titan-tokens-dodge").empty();
            for (let i = 0; i < this.dodgeTokens; i++) {
                $(".js_titan-tokens-dodge").append(`<img class="token" src="./img/icons/icon_dodge_token.png">`);
            }
        } else {
            $(".js_challenger-tokens-dodge").empty();
            for (let i = 0; i < this.dodgeTokens; i++) {
                $(".js_challenger-tokens-dodge").append(`<img class="token" src="./img/icons/icon_dodge_token.png">`);
            }
        }
    }
    gainActionTokens(number) {
        console.log(this.name + " gains " + number + " Action Token(s).");
        this.actionTokens += number;
        console.log(this.name + " has " + this.actionTokens + " Action Token(s).");

        if (this.isTitan) {
            $(".js_titan-tokens-action").empty();
            for (let i = 0; i < this.actionTokens; i++) {
                $(".js_titan-tokens-action").append(`<img class="token" src="./img/icons/icon_action_token.png">`);
            }
        } else {
            $(".js_challenger-tokens-action").empty();
            for (let i = 0; i < this.actionTokens; i++) {
                $(".js_challenger-tokens-action").append(`<img class="token" src="./img/icons/icon_action_token.png">`);
            }
        }
    }
    gainArmorTokens(number) {
        console.log(this.name + " gains " + number + " Armor Token(s).");
        this.armorTokens += number;
        console.log(this.name + " has " + this.armorTokens + " Armor Token(s).");

        if (this.isTitan) {
            $(".js_titan-tokens-armor").empty();
            for (let i = 0; i < this.armorTokens; i++) {
                $(".js_titan-tokens-armor").append(`<img class="token" src="./img/icons/icon_armor_token.png">`);
            }
        } else {
            $(".js_challenger-tokens-armor").empty();
            for (let i = 0; i < this.armorTokens; i++) {
                $(".js_challenger-tokens-armor").append(`<img class="token" src="./img/icons/icon_armor_token.png">`);
            }
        }
    }
    reset() {
        this.actionTokensUsed = 0;
    }
    defeated() {
        console.log(this.name + " is defeated.");
        this.currentHealth = 0;
        this.isAlive = false;
        this.updateHealth();
        this.die();
    }
    win () {
        console.log(this.name + " wins.");
        if (this.isTitan) {
            console.log(this.name + " remains the Titan.");
        } else {
            console.log(this.name + " becomes the Titan.");
        }
    }
    endFight(index) {

    }
    die() {
        console.log(this.name + " has died.");
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        opponent.win();
    }
};