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
    }
    takeDamage(damage) {
        if (this.armor != 0 && damage >= this.armor) {
            damage -= this.armor;
            console.log(this.name + "'s armor reduced incoming damage by " + this.armor + ".");
        }

        this.currentHealth -= damage;
        console.log(this.name + " takes " + damage + " damage.");
        console.log(this.name + " has " + this.currentHealth + " health remaining.");

        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.isAlive = false;
        }

        if (!this.isAlive) {
            this.die(index);
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
        console.log(this.name + " attacks " + opponent.name + " for " + this.attack1Damage + " damage!");
        opponent.takeDamage(this.attack1Damage);
    }
    attack2() {
        console.log(this.name + " rolled their GREEN attack.");
        console.log(this.name + " attacks " + opponent.name + " for " + this.attack2Damage + " damage!");
        opponent.takeDamage(this.attack2Damage);
    }
    attack3() {
        console.log(this.name + " rolled their YELLOW attack.");
        console.log(this.name + " attacks " + opponent.name + " for " + this.attack3Damage + " damage!");
        opponent.takeDamage(this.attack3Damage);
    }
    attack4() {
        console.log(this.name + " rolled their RED attack.");
        console.log(this.name + " attacks " + opponent.name + " for " + this.attack4Damage + " damage!");
        opponent.takeDamage(this.attack4Damage);
    }
    charge() {
        console.log(this.name + " rolled a CHARGE.");
        if (!this.isCharged) {
            this.isCharged = true;
            console.log(this.name + " is charged! Rolling again...");
            this.rollDie();
        } else {
            console.log(this.name + " activated their ultimate ability!");
            // activateUltimate();
        }
    }
    miss() {
        console.log(this.name + " missed!")
    }
    activateUltimate() {

    }
    endFight(index) {

    }
    die(index) {

    }
}

class Titan extends Champion {};

// let abc = new Titan("name","flavor",10,8,0,1,2,3,4,false);
// abc.rollDie() {
//     console.log("abc");
// }
// console.log(abc);

makeTitan()
function makeTitan() {
    let length = champions.length;
    let randomNumber = Math.floor(Math.random() * length);
    randomNumber = 10;
    let titanObject = champions[randomNumber];
    titan = new Titan(titanObject.name, titanObject.flavorText, titanObject.health, titanObject.speed, titanObject.armor, titanObject.attack1, titanObject.attack2, titanObject.attack3, titanObject.attack4, true);
    $(".js_titan-container").prepend(`<img style="max-width: 100%;" src="./img/champion_crimson_knight.jpg">`);
    for (let i = 0; i < titan.maxHealth; i++) {
        $(".js_titan-health").append(`<img style="width: 25px;" src="./img/icons/icon_health.png">`);
    }
}

makeChallenger()
function makeChallenger() {
    let length = champions.length;
    let randomNumber = Math.floor(Math.random() * length);
    randomNumber = 30;
    let challengerObject = champions[randomNumber];
    // challenger = new Titan(challengerObject.name, challengerObject.flavorText, challengerObject.health, challengerObject.speed, challengerObject.armor, challengerObject.attack1, challengerObject.attack2, challengerObject.attack3, challengerObject.attack4, false);

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
    };

    let fang = new Fang(challengerObject.name, challengerObject.flavorText, challengerObject.health, challengerObject.speed, challengerObject.armor, challengerObject.attack1, challengerObject.attack2, challengerObject.attack3, challengerObject.attack4, false);

    challenger = fang;

    $(".js_challenger-container").prepend(`<img style="max-width: 100%;" src="./img/champion_fang.jpg">`);
    for (let i = 0; i < challenger.maxHealth; i++) {
        $(".js_challenger-health").append(`<img style="width: 25px;" src="./img/icons/icon_health.png">`);
    }
}

$(".js_titan-roll-btn").on('click', function() {
    titan.rollDie();
});

$(".js_challenger-roll-btn").on('click', function() {
    challenger.rollDie();
});

startFight();
function startFight() {
    determineHigherSpeed();
    // firstFighter.startOfFight();
    // secondFighter.startOfFight();
}

function determineHigherSpeed() {

    if (titan.speed > challenger.speed) {
        titan.isFirst = true;
        firstFighter = titan;
        secondFighter = challenger;
    } else {
        challenger.isFirst = true;
        firstFighter = challenger;
        secondFighter = titan;
    }
}

console.log("Titan", titan);
console.log("Challenger", challenger);

// class Titan extends Champion {
//     startOfFight() {
//         console.log("Sobeck!");
//     }
//     takeDamageSpecific(damage) {
//         console.log(this.name + " uses Nile's Fury and deals damage back!")
//         challenger.takeDamage(damage);
//     }
// }

// let titan = new Sobek("Sobek", "Arisen from his Slumber", 10, 1, 0, 1, 1, 1, 3);

class CrimsonKnight extends Champion {
    startOfFight() {
        console.log("Crimson Knight!");
    }
}

// challenger = new CrimsonKnight("Crimson Knight", "Firewalk with me", 8, 3, 1, 3, 4, 5, 6);

// console.log(challenger);


// console.log(titan);
// console.log(challenger);

// sobek.takeDamageSpecific();

// let firstFighter;
// let secondFighter;

// startRound();
function startRound() {
    // let dieRoll = getRandomNumber();
    // console.log(dieRoll);
    firstFighter.rollDie();
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}