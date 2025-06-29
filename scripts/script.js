// import { Champion } from "./champion.js";
// import { titan, challenger } from "./champion.js";

const supabaseURL = 'https://jjdtikulxocedonohrpf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZHRpa3VseG9jZWRvbm9ocnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0OTI1NjEsImV4cCI6MjA1NjA2ODU2MX0.7H56TLX1hFXqCJBgDHRU5Evj7gPtdXYUugtyPBfZQuI';
const supabaseData = window.supabase.createClient(supabaseURL, supabaseKey);
const { data, error } = await supabaseData.from('champions').select()
.order('id', { ascending: true });
const champions = data;
console.log(champions);
let arrayOfChampions = [];
let titan;
let challenger;
let firstFighter;
let secondFighter;
let opponent;

class Champion {
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

        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }

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
    activateUltimate() {

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
    }
    gainPoisonTokens(number) {
        console.log(this.name + " gains " + number + " Poison Token(s).");
        this.poisonTokens += number;
        console.log(this.name + " has " + this.poisonTokens + " Poison Token(s).");
    }
    gainDodgeTokens(number) {
        console.log(this.name + " gains " + number + " Dodge Token(s).");
        this.dodgeTokens += number;
        console.log(this.name + " has " + this.dodgeTokens + " Dodge Token(s).");
    }
    gainActionTokens(number) {
        console.log(this.name + " gains " + number + " Action Token(s).");
        this.actionTokens += number;
        console.log(this.name + " has " + this.actionTokens + " Action Token(s).");
    }
    gainArmorTokens(number) {
        console.log(this.name + " gains " + number + " Armor Token(s).");
        this.armorTokens += number;
        console.log(this.name + " has " + this.armorTokens + " Armor Token(s).");
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

class Dummy extends Champion {
};
let dummy = new Dummy("Jade Ogre", "Hit Me!", 100, 5, 0, 1, 2, 3, 4, true);

//TODO: Cursed Pirate Ultimate Form
class CursedPirate extends Champion {
    attack2() {
        super.attack2();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        this.isInUltimateForm = true;
        this.attack4();
    }
};
let cursedPirateObject = champions[9];
let cursedPirate = new CursedPirate(cursedPirateObject.name, cursedPirateObject.flavorText, cursedPirateObject.health, cursedPirateObject.speed, cursedPirateObject.armor, cursedPirateObject.attack1, cursedPirateObject.attack2, cursedPirateObject.attack3, cursedPirateObject.attack4, true);

class CrimsonKnight extends Champion {
    activateUltimate() {
        this.isInUltimateForm = true;
        this.attack2();
    }
    attack1() {
        super.attack1();
        if (this.isInUltimateForm) {
            console.log(this.name + " is rolling again because of their Ultimate Form.")
            this.rollDie();
        }
    }
    attack2() {
        super.attack2();
        if (this.isInUltimateForm) {
            console.log(this.name + " is rolling again because of their Ultimate Form.")
            this.rollDie();
        }
    }
};
let crimsonKnightObject = champions[10];
let crimsonKnight = new CrimsonKnight(crimsonKnightObject.name, crimsonKnightObject.flavorText, crimsonKnightObject.health, crimsonKnightObject.speed, crimsonKnightObject.armor, crimsonKnightObject.attack1, crimsonKnightObject.attack2, crimsonKnightObject.attack3, crimsonKnightObject.attack4, true);

class Fang extends Champion {
    attack1() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack1();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    attack2() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack2();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    attack3() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack3();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    attack4() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack4();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    activateUltimate() {
        let totalDamage = 10 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        let healthBeforeAttack = opponent.currentHealth;
        opponent.takeDamage(totalDamage);
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
};
let fangObject = champions[30];
let fang = new Fang(fangObject.name, fangObject.flavorText, fangObject.health, fangObject.speed, fangObject.armor, fangObject.attack1, fangObject.attack2, fangObject.attack3, fangObject.attack4, true);

class Hunter extends Champion {
    startFight() {
        if (!this.isTitan) {
            console.log(this.name + " is the challenger. Their damage and speed are increased.");
            this.attack1Damage +=3;
            this.attack2Damage +=3;
            this.attack3Damage +=3;
            this.attack4Damage +=3;
            this.speed += 3;
        };
    }
    attack2() {
        super.attack2();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
};
let hunterObject = champions[7];
let hunter = new Hunter(hunterObject.name, hunterObject.flavorText, hunterObject.health, hunterObject.speed, hunterObject.armor, hunterObject.attack1, hunterObject.attack2, hunterObject.attack3, hunterObject.attack4, true);

class Impulse extends Champion {
    attack1() {
        super.attack1();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    attack2() {
        super.attack2();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        this.attack3();
        this.attack4();
    }
};
let impulseObject = champions[37];
let impulse = new Impulse(impulseObject.name, impulseObject.flavorText, impulseObject.health, impulseObject.speed, impulseObject.armor, impulseObject.attack1, impulseObject.attack2, impulseObject.attack3, impulseObject.attack4, true);

class SandWyrm extends Champion {
    activateUltimate() {
        this.isInUltimateForm = true;
        this.speed = 10;
        this.attack1Damage = 20;
        this.attack1();
    }
};
let sandWyrmObject = champions[26];
let sandWyrm = new SandWyrm(sandWyrmObject.name, sandWyrmObject.flavorText, sandWyrmObject.health, sandWyrmObject.speed, sandWyrmObject.armor, sandWyrmObject.attack1, sandWyrmObject.attack2, sandWyrmObject.attack3, sandWyrmObject.attack4, true);

class SteelForce extends Champion {
    takeDamage(damage) {
        let totalArmor = this.armor + this.armorTokens;
        if (totalArmor != 0 && damage >= 0) {
            damage -= totalArmor;
            console.log(this.name + "'s armor reduced incoming damage by " + this.armor + ".");
        }

        if (damage > 0) {
            damage = 1;
            console.log(this.name + " reduced damage taken to 1.")
        }

        if (this.dodgeTokens > 0) {
            console.log(this.name + " uses a Dodge Token to avoid the attack.");
            this.dodgeTokens -= 1;
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
    activateUltimate() {
        let healthBeforeAttack = opponent.currentHealth;
        let totalDamage = 4 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage);
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
};
let steelForceObject = champions[33];
let steelForce = new SteelForce(steelForceObject.name, steelForceObject.flavorText, steelForceObject.health, steelForceObject.speed, steelForceObject.armor, steelForceObject.attack1, steelForceObject.attack2, steelForceObject.attack3, steelForceObject.attack4, true);

class Sobek extends Champion {
    takeDamage(damage) {
        if (this.armor != 0 && damage >= this.armor) {
            damage -= this.armor;
            console.log(this.name + "'s armor reduced incoming damage by " + this.armor + ".");
        }

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
        } else {
            this.takeDamageSpecific(damage);
        }
        this.updateHealth();
    }
    takeDamageSpecific(damage) {
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }

        console.log(this.name + " uses Nile's Fury to deal " + damage + " back to " + opponent.name + ".");
        opponent.takeDamage(damage);
    }
    activateUltimate() {
        let healthBeforeAttack = opponent.currentHealth;
        let totalDamage = 6 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage);
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    attack4() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack4();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
};
let sobekObject = champions[12];
let sobek = new Sobek(sobekObject.name, sobekObject.flavorText, sobekObject.health, sobekObject.speed, steelForceObject.armor, sobekObject.attack1, sobekObject.attack2, sobekObject.attack3, sobekObject.attack4, true);

class TinyTerror extends Champion {
    attack2() {
        super.attack2();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    attack3() {
        super.attack3();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        let healthBeforeAttack = opponent.currentHealth;
        let totalDamage = 8 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage);
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }

        this.gainPowerTokens(1);
    }
};
let tinyTerrorObject = champions[36];
let tinyTerror = new TinyTerror(tinyTerrorObject.name, tinyTerrorObject.flavorText, tinyTerrorObject.health, tinyTerrorObject.speed, tinyTerrorObject.armor, tinyTerrorObject.attack1, tinyTerrorObject.attack2, tinyTerrorObject.attack3, tinyTerrorObject.attack4, true);

class NeoLeonidas extends Champion {
    countersRed = true;
    activateUltimate() {
        this.isInUltimateForm = true;
        this.countersYellow = true;
        this.attack1();
    }
};
let neoLeonidasObject = champions[14];
let neoLeonidas = new NeoLeonidas(neoLeonidasObject.name, neoLeonidasObject.flavorText, neoLeonidasObject.health, neoLeonidasObject.speed, neoLeonidasObject.armor, neoLeonidasObject.attack1, neoLeonidasObject.attack2, neoLeonidasObject.attack3, neoLeonidasObject.attack4, true);

class Cerberus extends Champion {
    startFight() {
        super.startFight();
        this.gainActionTokens(1);
    }
    attack4() {
        super.attack4();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        opponent.defeated();
    }
};
let cerberusObject = champions[27];
let cerberus = new Cerberus(cerberusObject.name, cerberusObject.flavorText, cerberusObject.health, cerberusObject.speed, cerberusObject.armor, cerberusObject.attack1, cerberusObject.attack2, cerberusObject.attack3, cerberusObject.attack4, true);

class Gunslinger extends Champion {
    startFight() {
        super.startFight();
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        console.log(this.name + " uses Quick Draw and deals 3 damage.");
        opponent.takeDamage(3);
    }
    attack2() {
        super.attack2();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        opponent.defeated();
    }
};
let gunslingerObject = champions[19];
let gunslinger = new Gunslinger(gunslingerObject.name, gunslingerObject.flavorText, gunslingerObject.health, gunslingerObject.speed, gunslingerObject.armor, gunslingerObject.attack1, gunslingerObject.attack2, gunslingerObject.attack3, gunslingerObject.attack4, true);

class Acranydra extends Champion {
    attack1() {
        console.log(this.name + " rolls their BLUE attack.");
        opponent.gainPoisonTokens(1);
    }
    attack2() {
        console.log(this.name + " rolls their GREEN attack.");
        opponent.gainPoisonTokens(1);
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        opponent.gainPoisonTokens(4);
    }
};
let acranydraObject = champions[41];
let acranydra = new Acranydra(acranydraObject.name, acranydraObject.flavorText, acranydraObject.health, acranydraObject.speed, acranydraObject.armor, acranydraObject.attack1, acranydraObject.attack2, acranydraObject.attack3, gunslingerObject.attack4, true);

class Azurian extends Champion {
    countersGreen = true;
    startFight() {
        this.gainDodgeTokens(1);
    }
    attack1() {
        super.attack1();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    attack4() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack4();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    activateUltimate() {
        this.attack4();
        this.attack4();
        this.attack4();
        this.attack4();
    }
};
let azurianObject = champions[28];
let azurian = new Azurian(azurianObject.name, azurianObject.flavorText, azurianObject.health, azurianObject.speed, azurianObject.armor, azurianObject.attack1, azurianObject.attack2, azurianObject.attack3, azurianObject.attack4, true);

class JadeOgre extends Champion {
    startFight() {
        super.startFight();
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        console.log(this.name + " uses Blade Wind and sets " + opponent.name + "'s health to 5.");
        opponent.currentHealth = 5;
        opponent.updateHealth();
    }
    attack1() {
        super.attack1();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    attack4() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack4();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    activateUltimate() {
        opponent.defeated();
    }
};
let jadeOgreObject = champions[22];
let jadeOgre = new JadeOgre(jadeOgreObject.name, jadeOgreObject.flavorText, jadeOgreObject.health, jadeOgreObject.speed, jadeOgreObject.armor, jadeOgreObject.attack1, jadeOgreObject.attack2, jadeOgreObject.attack3, jadeOgreObject.attack4, true);

//TODO: Change start of fight to start of game
class TheThreeMusketeers extends Champion {
    startFight() {
        super.startFight();
        this.gainActionTokens(2);
    }
    activateUltimate() {
        this.attack2();
        this.attack3();
        this.attack4();
    }
};
let theThreeMusketeersObject = champions[39];
let theThreeMusketeers = new TheThreeMusketeers(theThreeMusketeersObject.name, theThreeMusketeersObject.flavorText, theThreeMusketeersObject.health, theThreeMusketeersObject.speed, theThreeMusketeersObject.armor, theThreeMusketeersObject.attack1, theThreeMusketeersObject.attack2, theThreeMusketeersObject.attack3, theThreeMusketeersObject.attack4, true);

class WinterWraith extends Champion {
    startTurn() {
        super.startTurn();
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        let damageThreshold = 3;
        if (this.isInUltimateForm) {
            damageThreshold = 6;
        }
        if (opponent.currentHealth <= damageThreshold) {
            console.log(this.name + " uses Soul Harvest to defeat " + opponent.name + ".");
            opponent.defeated();
        }
    }
    activateUltimate() {
        this.isInUltimateForm = true;
        this.attack4();
    }
};
let winterWraithObject = champions[8];
let winterWraith = new WinterWraith(winterWraithObject.name, winterWraithObject.flavorText, winterWraithObject.health, winterWraithObject.speed, winterWraithObject.armor, winterWraithObject.attack1, winterWraithObject.attack2, winterWraithObject.attack3, winterWraithObject.attack4, true);

//TODO: Weird ultimate interaction with charging
class ArchangelGabriel extends Champion {
    attack1() {
        console.log(this.name + " rolls their BLUE attack.")
        this.gainPowerTokens(1);
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        this.gainPowerTokens(2);
        this.isCharged = false;
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
};
let archangelGabrielObject = champions[11];
let archangelGabriel = new ArchangelGabriel(archangelGabrielObject.name, archangelGabrielObject.flavorText, archangelGabrielObject.health, archangelGabrielObject.speed, archangelGabrielObject.armor, archangelGabrielObject.attack1, archangelGabrielObject.attack2, archangelGabrielObject.attack3, archangelGabrielObject.attack4, true);

class TheGreatAbomination extends Champion {
    startFight() {
        this.gainPoisonTokens(1);
    }
    activateUltimate() {
        opponent.defeated();
        this.poisonTokens = 0;
        console.log(this.name + " has " + this.poisonTokens + " Poison Token(s).");
    }
};
let theGreatAbominationObject = champions[3];
let theGreatAbomination = new TheGreatAbomination(theGreatAbominationObject.name, theGreatAbominationObject.flavorText, theGreatAbominationObject.health, theGreatAbominationObject.speed, theGreatAbominationObject.armor, theGreatAbominationObject.attack1, theGreatAbominationObject.attack2, theGreatAbominationObject.attack3, theGreatAbominationObject.attack4, true);

//TODO: Funkiness when gaining action token during ultimate
class Hydra extends Champion {
    countersRed = true;
    counter() {
        super.counter();
        console.log(this.name + " gains 1 Action Token.");
        this.actionTokens += 1;
        console.log(this.name + " has " + this.actionTokens + " Action Token(s).");
    }
    activateUltimate() {
        let totalDamage = 6 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage);
        if (!opponent.isAlive) {
            console.log(this.name + " gains 1 Action Token.");
            this.actionTokens += 1;
            console.log(this.name + " has " + this.actionTokens + " Action Token(s).");
        }
    }
};
let hydraObject = champions[24];
let hydra = new Hydra(hydraObject.name, hydraObject.flavorText, hydraObject.health, hydraObject.speed, hydraObject.armor, hydraObject.attack1, hydraObject.attack2, hydraObject.attack3, hydraObject.attack4, true);

class Dragonbane extends Champion {
    attack1() {
        console.log(this.name + " rolls their BLUE attack.");
        let mySpeed = this.speed;
        let opponentSpeed = opponent.speed;
        if (mySpeed > opponentSpeed || this.isInUltimateForm) {
            let healthBeforeAttack = opponent.currentHealth;
            let damage = 10 + this.powerTokens;
            console.log(this.name + " uses Essence Drain to attack " + opponent.name + " for " + damage + " damage.")
            opponent.takeDamage(damage);
            let healthAfterAttack = opponent.currentHealth;
            let differenceInHealth = healthBeforeAttack - healthAfterAttack;

            if (differenceInHealth > 0) {
                this.drainHealth(differenceInHealth);
            }
        } else {
            console.log(this.name + "'s Essence Drain does not activate.")
        }
        console.log("Rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        this.isInUltimateForm = true;
        let healthBeforeAttack = opponent.currentHealth;
        let damage = 10 + this.powerTokens;
        console.log(this.name + " uses Essence Drain to attack " + opponent.name + " for " + damage + " damage.")
        opponent.takeDamage(damage);
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
};
let dragonbaneObject = champions[29];
let dragonbane = new Dragonbane(dragonbaneObject.name, dragonbaneObject.flavorText, dragonbaneObject.health, dragonbaneObject.speed, dragonbaneObject.armor, dragonbaneObject.attack1, dragonbaneObject.attack2, dragonbaneObject.attack3, dragonbaneObject.attack4, true);

class EvilDjinn extends Champion {
    attack1() {
        console.log(this.name + " rolls their BLUE attack.");
        opponent.gainPoisonTokens(1);
    }
    attack2() {
        let healthBeforeAttack = opponent.currentHealth;
        super.attack2();
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    reactToCharge() {
        console.log(this.name + "'s Infernal Pact activates.");
        this.gainActionTokens(2);
    }
    activateUltimate() {
        this.defeated();
    }
};
let evilDjinnObject = champions[34];
let evilDjinn = new EvilDjinn(evilDjinnObject.name, evilDjinnObject.flavorText, evilDjinnObject.health, evilDjinnObject.speed, evilDjinnObject.armor, evilDjinnObject.attack1, evilDjinnObject.attack2, evilDjinnObject.attack3, evilDjinnObject.attack4, true);

//TODO: Make start of fight start of game
class Hornet extends Champion {
    startFight() {
        this.gainDodgeTokens(2);
    }
    attack2() {
        console.log(this.name + " rolls their GREEN attack.")
        if (this.dodgeTokens === 0) {
            console.log(this.name + "'s Bzzzzzzzzzzzzz activates.");
            this.gainDodgeTokens(2);
        } else {
            console.log(this.name + "'s Bzzzzzzzzzzzzz does not activate.");
        }
        console.log("Rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        opponent.defeated();
        this.gainDodgeTokens(2);
    }
};
let hornetObject = champions[0];
let hornet = new Hornet(hornetObject.name, hornetObject.flavorText, hornetObject.health, hornetObject.speed, hornetObject.armor, hornetObject.attack1, hornetObject.attack2, hornetObject.attack3, hornetObject.attack4, true);

class Kitsune extends Champion {
    countersBlue = true;
    countersGreen = true;
    counter() {
        super.counter();
        console.log(this.name + " gains a Charge.");
        if (!this.isCharged) {
            this.isCharged = true;
        } else {
            console.log(this.name + " activates their ultimate ability.");
            this.activateUltimate();
            this.isCharged = false;
        }
    }
    activateUltimate() {
        if (this.isTitan) {
            opponent = challenger;
        } else {
            opponent = titan;
        }
        opponent.defeated();
    }
};
let kitsuneObject = champions[13];
let kitsune = new Kitsune(kitsuneObject.name, kitsuneObject.flavorText, kitsuneObject.health, kitsuneObject.speed, kitsuneObject.armor, kitsuneObject.attack1, kitsuneObject.attack2, kitsuneObject.attack3, kitsuneObject.attack4, true);

class KuNan extends Champion {
    activateUltimate() {
        let healthBeforeAttack = opponent.currentHealth;
        let damage = 6 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + damage + " damage.")
        opponent.takeDamage(damage);
        let healthAfterAttack = opponent.currentHealth;
        let differenceInHealth = healthBeforeAttack - healthAfterAttack;

        if (differenceInHealth > 0) {
            this.drainHealth(differenceInHealth);
        }
    }
    win() {
        super.win();
        console.log(this.name + "'s Iron Will activates.");
        this.gainHealth(2);
        this.gainPowerTokens(1);
    }
};
let kuNanObject = champions[35];
let kuNan = new KuNan(kuNanObject.name, kuNanObject.flavorText, kuNanObject.health, kuNanObject.speed, kuNanObject.armor, kuNanObject.attack1, kuNanObject.attack2, kuNanObject.attack3, kuNanObject.attack4, true);

titan = hornet;
challenger = fang;

titan.isTitan = true;
challenger.isTitan = false;

displayChampions();
function displayChampions() {
    let titanName = titan.name;
    titanName = titanName.toLowerCase();
    titanName = titanName.replace(/ /g, "_");
    $(".js_titan-container").prepend(`<img class="champion-holder__card" src="./img/champion_${titanName}.jpg">`);

    let numberOfTitanFives = Math.floor(titan.currentHealth / 5);
    let numberOfTitanOnes = titan.currentHealth % 5;

    for (let i = 0; i < numberOfTitanFives; i++) {
        $(".js_titan-health").append(`<img class="champion-holder__health-icon champion-holder__health-icon--lg" src="./img/icons/icon_health_lg.png">`);
    }
    for (let i = 0; i < numberOfTitanOnes; i++) {
        $(".js_titan-health").append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
    }

    let challengerName = challenger.name;
    challengerName = challengerName.toLowerCase();
    challengerName = challengerName.replace(/ /g, "_");
    $(".js_challenger-container").prepend(`<img class="champion-holder__card" src="./img/champion_${challengerName}.jpg">`);

    let numberOfChallengerFives = Math.floor(challenger.currentHealth / 5);
    let numberOfChallengerOnes = challenger.currentHealth % 5;

    for (let i = 0; i < numberOfChallengerFives; i++) {
        $(".js_challenger-health").append(`<img class="champion-holder__health-icon champion-holder__health-icon--lg" src="./img/icons/icon_health_lg.png">`);
    }
    for (let i = 0; i < numberOfChallengerOnes; i++) {
        $(".js_challenger-health").append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
    }
}

$(".js_titan-roll-btn").on('click', function() {
    titan.reset();
    titan.startTurn();
    for (let i = 0; i <= titan.actionTokens; i++) {
        titan.rollDie();
    }
});

$(".js_challenger-roll-btn").on('click', function() {
    challenger.reset();
    challenger.startTurn();
    for (let i = 0; i <= challenger.actionTokens; i++) {
        challenger.rollDie();
    }
});

$(".js_start-fight-btn").on('click', function() {
    console.log("-------START OF FIGHT-------");
    if (challenger.speed >= titan.speed) {
        challenger.startFight();
        titan.startFight();
    } else {
        titan.startFight();
        challenger.startFight();
    }
});

console.log("Titan", titan);
console.log("Challenger", challenger);