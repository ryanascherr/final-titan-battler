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
            console.log(this.name + "'s armor reduced incoming damage by " + this.armor + ".");
        }

        if (this.dodgeTokens > 0) {
            console.log(this.name + " used a Dodge Token to avoid the attack.");
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
    updateHealth() {
        if (this.isTitan) {
            $(".js_titan-health").empty();
            for (let i = 0; i < this.currentHealth; i++) {
                $(".js_titan-health").append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
            }
        } else {
            $(".js_challenger-health").empty();
            for (let i = 0; i < this.currentHealth; i++) {
                $(".js_challenger-health").append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
            }
        }
    }
    takeDamageSpecific(damage) {

    }
    gainHealth(health, index) {
        this.currentHealth += health;

        if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
        
        console.log(this.name + " gains " + health + " health. " + this.name + "'s current health is " + this.currentHealth + "/" + this.maxHealth + ".");
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
        console.log(this.name + " rolled their BLUE attack.");
        if (opponent.countersBlue) {
            opponent.counter();
        } else {
            let totalDamage = this.attack1Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
            opponent.takeDamage(totalDamage);
        }
    }
    attack2() {
        console.log(this.name + " rolled their GREEN attack.");
        if (opponent.countersGreen) {
            opponent.counter();
        } else {
            let totalDamage = this.attack2Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
            opponent.takeDamage(totalDamage);
        }
    }
    attack3() {
        console.log(this.name + " rolled their YELLOW attack.");
        if (opponent.countersYellow) {
            opponent.counter();
        } else {
            let totalDamage = this.attack3Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
            opponent.takeDamage(totalDamage);
        }
    }
    attack4() {
        console.log(this.name + " rolled their RED attack.");
        if (opponent.countersRed) {
            opponent.counter();
        } else {
            let totalDamage = this.attack4Damage + this.powerTokens;
            console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
            opponent.takeDamage(totalDamage);
        }
    }
    charge() {
        console.log(this.name + " rolled a CHARGE.");
        if (!this.isCharged) {
            this.isCharged = true;
            console.log(this.name + " is charged! Rolling again...");
            this.rollDie();
        } else {
            console.log(this.name + " activated their ultimate ability!");
            this.activateUltimate();
            this.isCharged = false;
        }
    }
    miss() {
        console.log(this.name + " missed!")
    }
    activateUltimate() {

    }
    counter() {
        console.log(this.name + " counters the attack! Nothing happens.")
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
    }
    gainPoisonTokens(number) {
        console.log(this.name + " gains " + number + " Poison Token(s).");
        this.poisonTokens += number;
    }
    gainDodgeTokens(number) {
        console.log(this.name + " gains " + number + " Dodge Token(s).");
        this.dodgeTokens += number;
    }
    gainActionTokens(number) {
        console.log(this.name + " gains " + number + " Action Token(s).");
        this.actionTokens += number;
    }
    gainArmorTokens(number) {
        console.log(this.name + " gains " + number + " Armor Token(s).");
        this.armorTokens += number;
    }
    reset() {
        this.actionTokensUsed = 0;
    }
    defeated() {
        console.log(this.name + " is Defeated.");
        this.currentHealth = 0;
        this.isAlive = false;
        this.updateHealth();
        this.die();
    }
    endFight(index) {

    }
    die() {
        console.log(this.name + " has died. ");
    }
};

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
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
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
            console.log(this.name + " is the challenger. Their damage and speed are increased!");
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
            console.log(this.name + " used a Dodge Token to avoid the attack.");
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
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
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
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
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
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage!");
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
let neoLeonidas = new NeoLeonidas(neoLeonidasObject.name, neoLeonidasObject.flavorText, neoLeonidasObject, neoLeonidasObject.speed, neoLeonidasObject.armor, neoLeonidasObject.attack1, neoLeonidasObject.attack2, neoLeonidasObject.attack3, neoLeonidasObject.attack4, true);

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
        console.log(this.name + " uses Quick Draw and deals 3 damage.")
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

titan = cerberus;
challenger = gunslinger;

titan.isTitan = true;
challenger.isTitan = false;

displayChampions();
function displayChampions() {
    let titanName = titan.name;
    titanName = titanName.toLowerCase();
    titanName = titanName.replace(/ /g, "_");
    $(".js_titan-container").prepend(`<img class="champion-holder__card" src="./img/champion_${titanName}.jpg">`);
    for (let i = 0; i < titan.maxHealth; i++) {
        $(".js_titan-health").append(`<img class="champion-holder__health-icon" src="./img/icons/icon_health.png">`);
    }

    let challengerName = challenger.name;
    challengerName = challengerName.toLowerCase();
    challengerName = challengerName.replace(/ /g, "_");
    $(".js_challenger-container").prepend(`<img class="champion-holder__card" src="./img/champion_${challengerName}.jpg">`);
    for (let i = 0; i < challenger.maxHealth; i++) {
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