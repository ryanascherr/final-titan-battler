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
    }
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
        }

        this.takeDamageSpecific(damage);
        this.updateHealth();
    }
    updateHealth() {
        if (this.isTitan) {
            $(".js_titan-health").empty();
            for (let i = 0; i < this.currentHealth; i++) {
                $(".js_titan-health").append(`<img style="width: 25px;" src="./img/icons/icon_health.png">`);
            }
        } else {
            $(".js_challenger-health").empty();
            for (let i = 0; i < this.currentHealth; i++) {
                $(".js_challenger-health").append(`<img style="width: 25px;" src="./img/icons/icon_health.png">`);
            }
        }
    }
    takeDamageSpecific(damage) {

    }
    gainHealth(health, index) {
        this.currentHealth += health;

        if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
        
        console.log(this.name + " gained " + health + " health. " + this.name + "'s current health is " + this.currentHealth + "/" + this.maxHealth + ".");
    }
    startFight(index) {

    }
    startTurn(index) {

    }
    rollDie() {
        let dieRoll = Math.floor(Math.random() * 6) + 1;
        console.log("------------");
        console.log(this.name + " is rolling their die...");

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
            console.log(this.name + " attacks " + opponent.name + " for " + this.attack1Damage + " damage!");
            opponent.takeDamage(this.attack1Damage);
        }
    }
    attack2() {
        console.log(this.name + " rolled their GREEN attack.");
        if (opponent.countersGreen) {
            opponent.counter();
        } else {
            console.log(this.name + " attacks " + opponent.name + " for " + this.attack2Damage + " damage!");
            opponent.takeDamage(this.attack2Damage);
        }
    }
    attack3() {
        console.log(this.name + " rolled their YELLOW attack.");
        if (opponent.countersYellow) {
            opponent.counter();
        } else {
            console.log(this.name + " attacks " + opponent.name + " for " + this.attack3Damage + " damage!");
            opponent.takeDamage(this.attack3Damage);
        }
    }
    attack4() {
        console.log(this.name + " rolled their RED attack.");
        if (opponent.countersRed) {
            opponent.counter();
        } else {
            console.log(this.name + " attacks " + opponent.name + " for " + this.attack4Damage + " damage!");
            opponent.takeDamage(this.attack4Damage);
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
    drainHealth(differenceInHealth) {
        this.currentHealth += differenceInHealth;
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
        console.log(this.name + " gained " + differenceInHealth + " health from DRAIN. " + this.name + "'s current health is " + this.currentHealth + ".");
        this.updateHealth();
    }
    activateUltimate() {
        console.log(this.name + " attacks " + opponent.name + " for " + 10 + " damage!");
        let healthBeforeAttack = opponent.currentHealth;
        opponent.takeDamage(10);
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

titan = impulse;
challenger = cursedPirate;

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
    titan.rollDie();
});

$(".js_challenger-roll-btn").on('click', function() {
    challenger.rollDie();
});

$(".js_start-fight-btn").on('click', function() {
    console.log("The fight has begun!");
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