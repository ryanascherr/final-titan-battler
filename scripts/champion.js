import { titan, challenger, playerOneBench, playerTwoBench, displayChampion } from "./script.js";
let opponent;
let delayTime = 1000;
let historyText = document.querySelector(".js_history-text");

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
        $(historyText).append("<p>-----Start of " + this.name + "'s turn-----</p><hr>");

        if (this.poisonTokens === 0) return;

        this.currentHealth -= this.poisonTokens;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }

        console.log(this.name + " takes " + this.poisonTokens + " damage from Poison. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".");
        $(historyText).append("<p>" + this.name + " takes " + this.poisonTokens + " damage from Poison. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".</p><hr>");

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
        $(historyText).append("<p>Rolling die...</p><hr>");

        this.setDie(dieRoll);

        let doesCounter = false;

        setTimeout(() => {
            switch (dieRoll) {
                case 1:
                    console.log(this.name + " rolls their 🟦 attack.");
                    $(historyText).append("<p>" + this.name + " rolls their 🟦 attack.</p><hr>");
                    
                    doesCounter = this.checkForCounter(opponent.countersBlue);
                    if (doesCounter) {
                        opponent.counter();
                    } else {
                        this.attack1();
                    }
                    break;
                case 2:
                    console.log(this.name + " rolls their 🟩 attack.");
                    $(historyText).append("<p>" + this.name + " rolls their 🟩 attack.</p><hr>");

                    doesCounter = this.checkForCounter(opponent.countersGreen);
                    if (doesCounter) {
                        opponent.counter();
                    } else {
                        this.attack2();
                    }
                    break;
                case 3:
                    console.log(this.name + " rolls their 🟨 attack.");
                    $(historyText).append("<p>" + this.name + " rolls their 🟨 attack.</p><hr>");

                    doesCounter = this.checkForCounter(opponent.countersYellow);
                    if (doesCounter) {
                        opponent.counter();
                    } else {
                        this.attack3();
                    }
                    break;
                case 4:
                    console.log(this.name + " rolls their 🟥 attack.");
                    $(historyText).append("<p>" + this.name + " rolls their 🟥 attack.</p><hr>");

                    doesCounter = this.checkForCounter(opponent.countersRed);
                    if (doesCounter) {
                        opponent.counter();
                    } else {
                        this.attack4();
                    }
                    break;
                case 5:
                    console.log(this.name + " rolls a CHARGE.");
                    $(historyText).append("<p>" + this.name + " rolls a CHARGE.</p><hr>");

                    this.charge();
                    break;
                case 6:
                    console.log(this.name + " rolls a miss.");
                    $(historyText).append("<p>" + this.name + " rolls a miss.</p><hr>");

                    this.miss();
                    break;
                default:
                    console.log(this.name + " rolls a miss.");
                    $(historyText).append("<p>" + this.name + " rolls a miss.</p><hr>");

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
    checkForCounter(doesCounter) {
        if (doesCounter) {
            return true;
        } else {
            return false;
        }
    }
    attack1(drain) {
        let totalDamage = this.attack1Damage + this.powerTokens;

        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        $(historyText).append("<p>" + this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.</p><hr>");

        opponent.takeDamage(totalDamage, drain);
    }
    attack2(drain) {
        let totalDamage = this.attack2Damage + this.powerTokens;

        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        $(historyText).append("<p>" + this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.</p><hr>");

        opponent.takeDamage(totalDamage, drain);
    }
    attack3(drain) {
        let totalDamage = this.attack3Damage + this.powerTokens;

        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        $(historyText).append("<p>" + this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.</p><hr>");

        opponent.takeDamage(totalDamage, drain);
    }
    attack4(drain) {
        let totalDamage = this.attack4Damage + this.powerTokens;

        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        $(historyText).append("<p>" + this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.</p><hr>");

        opponent.takeDamage(totalDamage, drain);
    }
    charge() {
        opponent.reactToCharge();
        if (!this.isCharged) {
            this.isCharged = true;
            $(`.js_${this.nameOfPosition}-charge`).addClass(`js_${this.nameOfPosition}-charge--bright`);

            if (this.isAlive & opponent.isAlive) {
                console.log(this.name + " is charged.");
                $(historyText).append("<p>" + this.name + " is charged.</p><hr>");
                // console.log(this.name + " is charged. Rolling again...");
                // this.rollDie();
            }
        } else {
            console.log(this.name + " activates their ultimate ability.");
            $(historyText).append("<p>" + this.name + " activates their ultimate ability.</p><hr>");

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

            console.log(this.name + "'s Living Fortress reduces damage taken to 1.");
            $(historyText).append("<p>" + this.name + "'s Living Fortress reduces damage taken to 1.</p><hr>");
        }

        this.currentHealth -= damage;

        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }

        this.updateHealthDisplay();

        console.log(this.name + " takes " + damage + " damage. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".");
        $(historyText).append("<p>" + this.name + " takes " + damage + " damage. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".</p><hr>");

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
            $(historyText).append("<p>" + this.name + "'s armor reduces incoming damage by " + damageBlocked + ".</p><hr>");
        }
        return damage;
    }
    factorDodge(damage) {
        if (this.dodgeTokens === 0) return damage;

        console.log(this.name + " uses a Dodge Token to avoid the attack.");
        $(historyText).append("<p>" + this.name + " uses a Dodge Token to avoid the attack.</p><hr>");

        this.dodgeTokens -= 1;

        console.log(this.name + " has " + this.dodgeTokens + " Dodge Token(s).");
        $(historyText).append("<p>" + this.name + " has " + this.dodgeTokens + " Dodge Token(s).</p><hr>");

        this.updateTokensDisplay("dodge", this.dodgeTokens);
        damage = 0;

        return damage;
    }
    counter() {
        console.log(this.name + " counters the attack. Nothing happens.");
        $(historyText).append("<p>" + this.name + " counters the attack. Nothing happens.</p><hr>");
    }
    gainHealth(health) {
        this.currentHealth += health;

        if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
        
        console.log(this.name + " gains " + health + " health. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".");
        $(historyText).append("<p>" + this.name + " gains " + health + " health. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".</p><hr>");

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
        $(historyText).append("<p>" + this.name + " gains " + healthToAdd + " health from DRAIN. Their current health is " + this.currentHealth + "/" + this.maxHealth + ".</p><hr>");

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
        $(historyText).append("<p>" + this.name + " gains " + number + " Action Token(s).</p><hr>");

        this.actionTokens += number;

        console.log(this.name + " has " + this.actionTokens + " Action Token(s).");
        $(historyText).append("<p>" + this.name + " has " + this.actionTokens + " Action Token(s).</p><hr>");

        this.updateTokensDisplay("action", this.actionTokens);
    }
    gainArmorTokens(number) {
        console.log(this.name + " gains " + number + " Armor Token(s).");
        $(historyText).append("<p>" + this.name + " gains " + number + " Armor Token(s).</p><hr>");

        this.armorTokens += number;

        console.log(this.name + " has " + this.armorTokens + " Armor Token(s).");
        $(historyText).append("<p>" + this.name + " has " + this.armorTokens + " Armor Token(s).</p><hr>");

        this.updateTokensDisplay("armor", this.armorTokens);
    }
    gainDodgeTokens(number) {
        console.log(this.name + " gains " + number + " Dodge Token(s).");
        $(historyText).append("<p>" + this.name + " gains " + number + " Dodge Token(s).</p><hr>");

        this.dodgeTokens += number;

        console.log(this.name + " has " + this.dodgeTokens + " Dodge Token(s).");
        $(historyText).append("<p>" + this.name + " has " + this.dodgeTokens + " Dodge Token(s).</p><hr>");

        this.updateTokensDisplay("dodge", this.dodgeTokens);
    }
    gainPoisonTokens(number) {
        console.log(this.name + " gains " + number + " Poison Token(s).");
        $(historyText).append("<p>" + this.name + " gains " + number + " Poison Token(s).</p><hr>");

        this.poisonTokens += number;

        console.log(this.name + " has " + this.poisonTokens + " Poison Token(s).");
        $(historyText).append("<p>" + this.name + " has " + this.poisonTokens + " Poison Token(s).</p><hr>");

        this.updateTokensDisplay("poison", this.poisonTokens);
    }
    gainPowerTokens(number) {
        console.log(this.name + " gains " + number + " Power Token(s).");
        $(historyText).append("<p>" + this.name + " gains " + number + " Power Token(s).</p><hr>");

        this.powerTokens += number;

        console.log(this.name + " has " + this.powerTokens + " Power Token(s).");
        $(historyText).append("<p>" + this.name + " has " + this.powerTokens + " Power Token(s).</p><hr>");

        this.updateTokensDisplay("power", this.powerTokens);
    }
    defeated() {
        console.log(this.name + " is defeated.");
        $(historyText).append("<p>" + this.name + " is defeated.</p><hr>");

        this.currentHealth = 0;
        this.isAlive = false;
        this.updateHealthDisplay();
        this.die();
    }
    die() {
        console.log(this.name + " has died.");
        $(historyText).append("<p>" + this.name + " has died.</p><hr>");

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
        $(historyText).append("<p>" + this.name + " wins.</p><hr>");

        if (this.isTitan) {
            console.log(this.name + " remains the Titan.");
            $(historyText).append("<p>" + this.name + " remains the Titan.</p><hr>");
        } else {
            console.log(this.name + " becomes the Titan.");
            $(historyText).append("<p>" + this.name + " becomes the Titan.</p><hr>");
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