import { titan, challenger, playerOneBench, playerTwoBench, displayChampion } from "./script.js";
let opponent;
let delayTime = 1000;

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
        this.poisonTokens = 0;
        this.dodgeTokens = 0;
        this.nameOfPosition = "";
        this.ownedBy = "";
    }
    startFight(index) {
    }
    startTurn(index) {
        opponent = this.identifyOpponent();
        if (!this.isAlive || !opponent.isAlive) return;

        console.log("-----START OF " + this.name.toUpperCase() + "'S TURN-----");
        if (this.poisonTokens === 0) return;

        this.currentHealth -= this.poisonTokens;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }
        console.log(this.name + " takes " + this.poisonTokens + " damage from Poison. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".");
        // console.log(this.name + " has " + this.currentHealth + " health remaining.");

        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.isAlive = false;
        }

        if (!this.isAlive) {
            this.die();
        }

        this.updateHealthDisplay();
    }
    identifyOpponent() {
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        return opponent;
    }
    rollDie() {
        opponent = this.identifyOpponent();
        if (!this.isAlive || !opponent.isAlive) return;

        let dieRoll = Math.floor(Math.random() * 6) + 1;
        console.log("---ROLLING DIE---");

        this.setDie(dieRoll);

        setTimeout(() => {
            switch (dieRoll) {
                case 1:
                    console.log(this.name + " rolls their 🟦 attack.");
                    this.attack1();
                    break;
                case 2:
                    console.log(this.name + " rolls their 🟩 attack.");
                    this.attack2();
                    break;
                case 3:
                    console.log(this.name + " rolls their 🟨 attack.");
                    this.attack3();
                    break;
                case 4:
                    console.log(this.name + " rolls their 🟥 attack.");
                    this.attack4();
                    break;
                case 5:
                    console.log(this.name + " rolls a CHARGE.");
                    this.charge();
                    break;
                case 6:
                    console.log(this.name + " rolls a miss.");
                    this.miss();
                    break;
                default:
                    console.log(this.name + " rolls a miss.");
                    this.miss();
                    break;
            }      
        }, delayTime);
    }
    setDie(dieRoll) {
        let die = $(`.js_${this.nameOfPosition}-die`);
        die = die[0];
        if ($(die).hasClass("low")) {
            $(die).removeClass();
            $(die).addClass(`cube high js_${this.nameOfPosition}-die js_${this.nameOfPosition}-roll-btn`);
            $(die).addClass(`face-${dieRoll}-high`);
        } else {
            $(die).removeClass();
            $(die).addClass(`cube low js_${this.nameOfPosition}-die js_${this.nameOfPosition}-roll-btn`);
            $(die).addClass(`face-${dieRoll}-low`);
        }
    }
    attack1(drain) {
        if (opponent.countersBlue) {
            opponent.counter();
        } else {
            let totalDamage = this.attack1Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage, drain);
        }
    }
    attack2(drain) {
        if (opponent.countersGreen) {
            opponent.counter();
        } else {
            let totalDamage = this.attack2Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage, drain);
        }
    }
    attack3(drain) {
        if (opponent.countersYellow) {
            opponent.counter();
        } else {
            let totalDamage = this.attack3Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage, drain);
        }
    }
    attack4(drain) {
        
        if (opponent.countersRed) {
            opponent.counter();
        } else {
            let totalDamage = this.attack4Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
            opponent.takeDamage(totalDamage, drain);
        }
    }
    charge() {
        opponent.reactToCharge();
        if (!this.isCharged) {
            this.isCharged = true;
            $(`.js_${this.nameOfPosition}-charge`).addClass(`js_${this.nameOfPosition}-charge--bright`);

            if (this.isAlive & opponent.isAlive) {
                console.log(this.name + " is charged.");
                // console.log(this.name + " is charged. Rolling again...");
                // this.rollDie();
            }
        } else {
            console.log(this.name + " activates their ultimate ability.");
            this.activateUltimate();
            this.isCharged = false;
            $(`.js_${this.nameOfPosition}-charge`).removeClass(`js_${this.nameOfPosition}-charge--bright`);
        }
    }
    reactToCharge() {
    }
    miss() {
        
    }
    takeDamage(damage, drain, isSteelFortress) {
        damage = this.factorArmor(damage);
        damage = this.factorDodge(damage);

        if (damage > 0 && isSteelFortress) {
            damage = 1;
            console.log(this.name + "'s Living Fortress reduces damage taken to 1.")
        }

        this.currentHealth -= damage;

        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }

        this.updateHealthDisplay();

        console.log(this.name + " takes " + damage + " damage. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".");

        if (drain) {
            let tempOpponent = "";
            if (this.isTitan) {
                tempOpponent = challenger;
            } else {
                tempOpponent = titan;
            }
            tempOpponent.drainHealth(damage);
        }

        if (this.currentHealth <= 0) {
            this.isAlive = false;
        }

        if (!this.isAlive) this.die();

    }
    factorArmor(damage) {
        let totalArmor = this.armor + this.armorTokens;
        if (totalArmor != 0 && damage >= 0) {
            let damageBlocked = 0;
            if (damage >= totalArmor) {
                damageBlocked = totalArmor;
            } else {
                damageBlocked = damage;
            }
            damage -= totalArmor;
            console.log(this.name + "'s armor reduces incoming damage by " + damageBlocked + ".");
        }
        return damage;
    }
    factorDodge(damage) {
        if (this.dodgeTokens === 0) return damage;

        console.log(this.name + " uses a Dodge Token to avoid the attack.");
        this.dodgeTokens -= 1;
        console.log(this.name + " has " + this.dodgeTokens + " Dodge Token(s).");
        this.updateTokensDisplay("dodge", this.dodgeTokens);
        damage = 0;

        return damage;
    }
    counter() {
        console.log(this.name + " counters the attack. Nothing happens.")
    }
    gainHealth(health) {
        this.currentHealth += health;

        if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
        
        console.log(this.name + " gains " + health + " health. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".");

        this.updateHealthDisplay();
    }
    drainHealth(number) {
        let maxHealthToGain = this.maxHealth - this.currentHealth;
        let healthToAdd = number;

        if (number > maxHealthToGain) {
            healthToAdd = maxHealthToGain;
        }

        this.currentHealth += healthToAdd;

        console.log(this.name + " gains " + healthToAdd + " health from DRAIN. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".");
        this.updateHealthDisplay();
    }
    updateHealthDisplay() {
        let numberOfFives = Math.floor(this.currentHealth / 5);
        let numberOfOnes = this.currentHealth % 5;

        $(`.js_${this.nameOfPosition}-health`).empty();
        for (let i = 0; i < numberOfFives; i++) {
            $(`.js_${this.nameOfPosition}-health`).append(`<img class="champion-holder__health-icon champion-holder__health-icon--lg" src="./img/icons/icon_health_lg.png">`);
        }
        for (let i = 0; i < numberOfOnes; i++) {
            $(`.js_${this.nameOfPosition}-health`).append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
        }
    }
    updateTokensDisplay(nameOfToken, numberOfTokens) {
        $(`.js_${this.nameOfPosition}-tokens-${nameOfToken}`).empty();
        for (let i = 0; i < numberOfTokens; i++) {
            $(`.js_${this.nameOfPosition}-tokens-${nameOfToken}`).append(`<img class="token" src="./img/icons/icon_${nameOfToken}_token.png">`);
        }
    }
    activateUltimate() {

    }
    gainUltimateForm() {
        $(`.js_${this.nameOfPosition}-ultimate`).empty();
        $(`.js_${this.nameOfPosition}-ultimate`).append(`<img class="token" src="./img/icons/icon_ultimate_token.png">`);
    }
    gainActionTokens(number) {
        console.log(this.name + " gains " + number + " Action Token(s).");
        this.actionTokens += number;
        console.log(this.name + " has " + this.actionTokens + " Action Token(s).");

        this.updateTokensDisplay("action", this.actionTokens);
    }
    gainArmorTokens(number) {
        console.log(this.name + " gains " + number + " Armor Token(s).");
        this.armorTokens += number;
        console.log(this.name + " has " + this.armorTokens + " Armor Token(s).");

        this.updateTokensDisplay("armor", this.armorTokens);
    }
    gainDodgeTokens(number) {
        console.log(this.name + " gains " + number + " Dodge Token(s).");
        this.dodgeTokens += number;
        console.log(this.name + " has " + this.dodgeTokens + " Dodge Token(s).");

        this.updateTokensDisplay("dodge", this.dodgeTokens);
    }
    gainPoisonTokens(number) {
        console.log(this.name + " gains " + number + " Poison Token(s).");
        this.poisonTokens += number;
        console.log(this.name + " has " + this.poisonTokens + " Poison Token(s).");

        this.updateTokensDisplay("poison", this.poisonTokens);
    }
    gainPowerTokens(number) {
        console.log(this.name + " gains " + number + " Power Token(s).");
        this.powerTokens += number;
        console.log(this.name + " has " + this.powerTokens + " Power Token(s).");

        this.updateTokensDisplay("power", this.powerTokens);
    }
    defeated() {
        console.log(this.name + " is defeated.");
        this.currentHealth = 0;
        this.isAlive = false;
        this.updateHealthDisplay();
        this.die();
    }
    die() {
        console.log(this.name + " has died.");
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        opponent.win();
        // this.pickNewChampion();
    }
    win () {
        console.log(this.name + " wins.");
        if (this.isTitan) {
            console.log(this.name + " remains the Titan.");
        } else {
            console.log(this.name + " becomes the Titan.");
        }
    }
    // pickNewChampion() {
    //     console.log(this.ownedBy);
    //     console.log(typeof(challenger))
    //     let abc;
    //     if (this.ownedBy === "Player 1") {
    //         console.log(playerOneBench);

    //         let randomNumber = Math.floor(Math.random() * playerOneBench.length);
    //         let nextChampion = playerOneBench[randomNumber];

    //         console.log(nextChampion);

    //         abc = nextChampion;
    //         abc.isTitan = false;
    //         abc.nameOfPosition = "challenger";
    //         abc.ownedBy = "Player 1";

    //         displayChampion(nextChampion, "challenger");
    //     }

    //     if (this.ownedBy === "Player 2") {
    //         console.log(playerTwoBench);

    //         let randomNumber = Math.floor(Math.random() * playerOneBench.length);
    //         let nextChampion = playerTwoBench[randomNumber];

    //         console.log(nextChampion);

    //         abc = nextChampion;
    //         abc.isTitan = false;
    //         abc.nameOfPosition = "challenger";
    //         abc.ownedBy = "Player 2";

    //         displayChampion(nextChampion, "challenger");
    //     }
    // }
    endFight(index) {

    }
};