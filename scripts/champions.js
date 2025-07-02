import { Champion } from "./champion.js";
let opponent;

//TODO: Test all drain champions
//TODO: Remove all forced roll agains

const supabaseURL = 'https://jjdtikulxocedonohrpf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZHRpa3VseG9jZWRvbm9ocnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0OTI1NjEsImV4cCI6MjA1NjA2ODU2MX0.7H56TLX1hFXqCJBgDHRU5Evj7gPtdXYUugtyPBfZQuI';
const supabaseData = window.supabase.createClient(supabaseURL, supabaseKey);
const { data, error } = await supabaseData.from('champions').select()
.order('id', { ascending: true });
const champions = data;

class Dummy extends Champion {
};
export let dummy = new Dummy("Mindbug", "Hit Me!", 100, 5, 0, 1, 2, 3, 4, true);

class Acranydra extends Champion {
    attack1() {
        opponent = this.identifyOpponent();
        console.log(this.name + " rolls their BLUE attack.");
        opponent.gainPoisonTokens(1);
    }
    attack2() {
        opponent = this.identifyOpponent();
        console.log(this.name + " rolls their GREEN attack.");
        opponent.gainPoisonTokens(1);
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        opponent.gainPoisonTokens(4);
    }
};
let acranydraObject = champions[41];
export let acranydra = new Acranydra(acranydraObject.name, acranydraObject.flavorText, acranydraObject.health, acranydraObject.speed, acranydraObject.armor, acranydraObject.attack1, acranydraObject.attack2, acranydraObject.attack3, acranydraObject.attack4, true);

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
export let archangelGabriel = new ArchangelGabriel(archangelGabrielObject.name, archangelGabrielObject.flavorText, archangelGabrielObject.health, archangelGabrielObject.speed, archangelGabrielObject.armor, archangelGabrielObject.attack1, archangelGabrielObject.attack2, archangelGabrielObject.attack3, archangelGabrielObject.attack4, true);

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
        let drain = true;
        super.attack4(drain);
    }
    activateUltimate() {
        this.attack4();
        this.attack4();
        this.attack4();
        this.attack4();
    }
};
let azurianObject = champions[28];
export let azurian = new Azurian(azurianObject.name, azurianObject.flavorText, azurianObject.health, azurianObject.speed, azurianObject.armor, azurianObject.attack1, azurianObject.attack2, azurianObject.attack3, azurianObject.attack4, true);

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
        opponent = this.identifyOpponent();
        opponent.defeated();
    }
};
let cerberusObject = champions[27];
export let cerberus = new Cerberus(cerberusObject.name, cerberusObject.flavorText, cerberusObject.health, cerberusObject.speed, cerberusObject.armor, cerberusObject.attack1, cerberusObject.attack2, cerberusObject.attack3, cerberusObject.attack4, true);

class CrimsonKnight extends Champion {
    activateUltimate() {
        this.isInUltimateForm = true;
        this.gainUltimateForm();
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
export let crimsonKnight = new CrimsonKnight(crimsonKnightObject.name, crimsonKnightObject.flavorText, crimsonKnightObject.health, crimsonKnightObject.speed, crimsonKnightObject.armor, crimsonKnightObject.attack1, crimsonKnightObject.attack2, crimsonKnightObject.attack3, crimsonKnightObject.attack4, true);

class CursedPirate extends Champion {
    attack1() {
        if (this.isInUltimateForm) {
            let drain = true;
            super.attack1(drain);
        } else {
            super.attack1();
        }
    }
    attack2() {
        if (this.isInUltimateForm) {
            let drain = true;
            super.attack2(drain);
        } else {
            super.attack2();
        }

        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    attack3() {
        if (this.isInUltimateForm) {
            let drain = true;
            super.attack3(drain);
        } else {
            super.attack3();
        }
    }
    attack4() {
        opponent = this.identifyOpponent();
        if (this.isInUltimateForm) {
            let drain = true;
            super.attack4(drain);
        } else {
            super.attack4();
        }
    }
    activateUltimate() {
        this.isInUltimateForm = true;
        this.gainUltimateForm();
        this.attack4();
    }
};
let cursedPirateObject = champions[9];
export let cursedPirate = new CursedPirate(cursedPirateObject.name, cursedPirateObject.flavorText, cursedPirateObject.health, cursedPirateObject.speed, cursedPirateObject.armor, cursedPirateObject.attack1, cursedPirateObject.attack2, cursedPirateObject.attack3, cursedPirateObject.attack4, true);

class Dragonbane extends Champion {
    attack1() {
        opponent = this.identifyOpponent();
        console.log(this.name + " rolls their BLUE attack.");
        let mySpeed = this.speed;
        let opponentSpeed = opponent.speed;
        if (mySpeed > opponentSpeed || this.isInUltimateForm) {
            let drain = true;
            let damage = 10 + this.powerTokens;
            console.log(this.name + " uses Essence Drain to attack " + opponent.name + " for " + damage + " damage.")
            opponent.takeDamage(damage, drain);
        } else {
            console.log(this.name + "'s Essence Drain does not activate.")
        }
        console.log("Rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        this.isInUltimateForm = true;
        this.gainUltimateForm();
        let drain = true;
        let damage = 10 + this.powerTokens;
        console.log(this.name + " uses Essence Drain to attack " + opponent.name + " for " + damage + " damage.")
        opponent.takeDamage(damage, drain);
    }
};
let dragonbaneObject = champions[29];
export let dragonbane = new Dragonbane(dragonbaneObject.name, dragonbaneObject.flavorText, dragonbaneObject.health, dragonbaneObject.speed, dragonbaneObject.armor, dragonbaneObject.attack1, dragonbaneObject.attack2, dragonbaneObject.attack3, dragonbaneObject.attack4, true);

class EvilDjinn extends Champion {
    attack1() {
        opponent = this.identifyOpponent();
        console.log(this.name + " rolls their BLUE attack.");
        opponent.gainPoisonTokens(1);
    }
    attack2() {
        let drain = true;
        super.attack2(drain);
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
export let evilDjinn = new EvilDjinn(evilDjinnObject.name, evilDjinnObject.flavorText, evilDjinnObject.health, evilDjinnObject.speed, evilDjinnObject.armor, evilDjinnObject.attack1, evilDjinnObject.attack2, evilDjinnObject.attack3, evilDjinnObject.attack4, true);

class Fang extends Champion {
    attack1() {
        let drain = true;
        super.attack1(drain);
    }
    attack2() {
        let drain = true;
        super.attack2(drain);
    }
    attack3() {
        let drain = true;
        super.attack3(drain);
    }
    attack4() {
        let drain = true;
        super.attack4(drain);
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        let totalDamage = 10 + this.powerTokens;
        let drain = true;

        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");

        opponent.takeDamage(totalDamage, drain);
    }
};
let fangObject = champions[30];
export let fang = new Fang(fangObject.name, fangObject.flavorText, fangObject.health, fangObject.speed, fangObject.armor, fangObject.attack1, fangObject.attack2, fangObject.attack3, fangObject.attack4, true);

class Gunslinger extends Champion {
    startFight() {
        super.startFight();
        opponent = this.identifyOpponent();
        console.log(this.name + " uses Quick Draw and deals 3 damage.");
        opponent.takeDamage(3);
    }
    attack2() {
        super.attack2();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        opponent.defeated();
    }
};
let gunslingerObject = champions[19];
export let gunslinger = new Gunslinger(gunslingerObject.name, gunslingerObject.flavorText, gunslingerObject.health, gunslingerObject.speed, gunslingerObject.armor, gunslingerObject.attack1, gunslingerObject.attack2, gunslingerObject.attack3, gunslingerObject.attack4, true);

//TODO: Make start of fight start of game
class Hornet extends Champion {
    startFight() {
        this.gainDodgeTokens(2);
        this.gain
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
        opponent = this.identifyOpponent();
        opponent.defeated();
        this.gainDodgeTokens(2);
    }
};
let hornetObject = champions[0];
export let hornet = new Hornet(hornetObject.name, hornetObject.flavorText, hornetObject.health, hornetObject.speed, hornetObject.armor, hornetObject.attack1, hornetObject.attack2, hornetObject.attack3, hornetObject.attack4, true);

//TODO: Make ultimate
class Hunter extends Champion {
    startFight() {
        if (!this.isTitan) {
            console.log(this.name + " is the challenger. Their damage and speed are increased.");
            this.attack1Damage = 4;
            this.attack2Damage = 4;
            this.attack3Damage = 6;
            this.attack4Damage = 7;
            this.speed = 8;
        } else {
            this.attack1Damage = 1;
            this.attack2Damage = 1;
            this.attack3Damage = 3;
            this.attack4Damage = 4;
            this.speed = 8;
        }
    }
    attack2() {
        super.attack2();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
};
let hunterObject = champions[7];
export let hunter = new Hunter(hunterObject.name, hunterObject.flavorText, hunterObject.health, hunterObject.speed, hunterObject.armor, hunterObject.attack1, hunterObject.attack2, hunterObject.attack3, hunterObject.attack4, true);

class Hydra extends Champion {
    countersRed = true;
    counter() {
        super.counter();
        this.gainActionTokens(1);
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        let totalDamage = 6 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage);
        if (!opponent.isAlive) {
            this.gainActionTokens(1);
        }
    }
};
let hydraObject = champions[24];
export let hydra = new Hydra(hydraObject.name, hydraObject.flavorText, hydraObject.health, hydraObject.speed, hydraObject.armor, hydraObject.attack1, hydraObject.attack2, hydraObject.attack3, hydraObject.attack4, true);

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
export let impulse = new Impulse(impulseObject.name, impulseObject.flavorText, impulseObject.health, impulseObject.speed, impulseObject.armor, impulseObject.attack1, impulseObject.attack2, impulseObject.attack3, impulseObject.attack4, true);

class JadeOgre extends Champion {
    startFight() {
        super.startFight();
        opponent = this.identifyOpponent();
        console.log(this.name + " uses Blade Wind and sets " + opponent.name + "'s health to 5.");
        opponent.currentHealth = 5;
        opponent.updateHealthDisplay();
    }
    attack1() {
        super.attack1();
        console.log(this.name + " is rolling again...");
        this.rollDie();
    }
    attack4() {
        let drain = true;
        super.attack4(drain);
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        opponent.defeated();
    }
};
let jadeOgreObject = champions[22];
export let jadeOgre = new JadeOgre(jadeOgreObject.name, jadeOgreObject.flavorText, jadeOgreObject.health, jadeOgreObject.speed, jadeOgreObject.armor, jadeOgreObject.attack1, jadeOgreObject.attack2, jadeOgreObject.attack3, jadeOgreObject.attack4, true);

//TODO: Charge not showing up
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
        opponent = this.identifyOpponent();
        opponent.defeated();
    }
};
let kitsuneObject = champions[13];
export let kitsune = new Kitsune(kitsuneObject.name, kitsuneObject.flavorText, kitsuneObject.health, kitsuneObject.speed, kitsuneObject.armor, kitsuneObject.attack1, kitsuneObject.attack2, kitsuneObject.attack3, kitsuneObject.attack4, true);

//TODO: If Ku'Nan kills with ult, won't drain health?
class KuNan extends Champion {
    activateUltimate() {
        opponent = this.identifyOpponent();
        let drain = true;
        let damage = 6 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + damage + " damage.")
        opponent.takeDamage(damage, drain);
    }
    win() {
        super.win();
        console.log(this.name + "'s Iron Will activates.");
        this.gainHealth(2);
        this.gainPowerTokens(1);
    }
};
let kuNanObject = champions[35];
export let kuNan = new KuNan(kuNanObject.name, kuNanObject.flavorText, kuNanObject.health, kuNanObject.speed, kuNanObject.armor, kuNanObject.attack1, kuNanObject.attack2, kuNanObject.attack3, kuNanObject.attack4, true);

//TODO: Add gainUltimateForm to others?
class NeoLeonidas extends Champion {
    countersRed = true;
    activateUltimate() {
        this.isInUltimateForm = true;
        this.gainUltimateForm();
        this.countersYellow = true;
        this.attack1();
    }
};
let neoLeonidasObject = champions[14];
export let neoLeonidas = new NeoLeonidas(neoLeonidasObject.name, neoLeonidasObject.flavorText, neoLeonidasObject.health, neoLeonidasObject.speed, neoLeonidasObject.armor, neoLeonidasObject.attack1, neoLeonidasObject.attack2, neoLeonidasObject.attack3, neoLeonidasObject.attack4, true);

class SandWyrm extends Champion {
    activateUltimate() {
        this.isInUltimateForm = true;
        this.gainUltimateForm();
        this.speed = 10;
        this.attack1Damage = 20;
        this.attack1();
    }
};
let sandWyrmObject = champions[26];
export let sandWyrm = new SandWyrm(sandWyrmObject.name, sandWyrmObject.flavorText, sandWyrmObject.health, sandWyrmObject.speed, sandWyrmObject.armor, sandWyrmObject.attack1, sandWyrmObject.attack2, sandWyrmObject.attack3, sandWyrmObject.attack4, true);

class Sobek extends Champion {
    takeDamage(damage, drain) {
        super.takeDamage(damage);

        if (!this.isAlive) return;

        opponent = this.identifyOpponent();
        console.log(this.name + " uses Nile's Fury to deal " + damage + " back to " + opponent.name + ".");
        opponent.takeDamage(damage);
    }

    activateUltimate() {
        opponent = this.identifyOpponent();
        let drain = true;
        let totalDamage = 6 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage, drain);
    }
    attack4() {
        let drain = true;
        super.attack4(drain);
    }
};
let sobekObject = champions[12];
export let sobek = new Sobek(sobekObject.name, sobekObject.flavorText, sobekObject.health, sobekObject.speed, sobekObject.armor, sobekObject.attack1, sobekObject.attack2, sobekObject.attack3, sobekObject.attack4, true);

//TODO: Figure out Poison
class SteelForce extends Champion {
    takeDamage(damage, drain) {
        let isSteelFortress = true;
        super.takeDamage(damage, drain, isSteelFortress);
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        let drain = true;
        let totalDamage = 4 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage, drain);
    }
};
let steelForceObject = champions[33];
export let steelForce = new SteelForce(steelForceObject.name, steelForceObject.flavorText, steelForceObject.health, steelForceObject.speed, steelForceObject.armor, steelForceObject.attack1, steelForceObject.attack2, steelForceObject.attack3, steelForceObject.attack4, true);

class TheGreatAbomination extends Champion {
    startFight() {
        this.gainPoisonTokens(1);
    }
    activateUltimate() {
        opponent = this.identifyOpponent();
        opponent.defeated();
        this.poisonTokens = 0;
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
};
let theGreatAbominationObject = champions[3];
export let theGreatAbomination = new TheGreatAbomination(theGreatAbominationObject.name, theGreatAbominationObject.flavorText, theGreatAbominationObject.health, theGreatAbominationObject.speed, theGreatAbominationObject.armor, theGreatAbominationObject.attack1, theGreatAbominationObject.attack2, theGreatAbominationObject.attack3, theGreatAbominationObject.attack4, true);

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
export let theThreeMusketeers = new TheThreeMusketeers(theThreeMusketeersObject.name, theThreeMusketeersObject.flavorText, theThreeMusketeersObject.health, theThreeMusketeersObject.speed, theThreeMusketeersObject.armor, theThreeMusketeersObject.attack1, theThreeMusketeersObject.attack2, theThreeMusketeersObject.attack3, theThreeMusketeersObject.attack4, true);

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
        opponent = this.identifyOpponent();
        let drain = true;
        let totalDamage = 8 + this.powerTokens;
        console.log(this.name + " attacks " + opponent.name + " for " + totalDamage + " damage.");
        opponent.takeDamage(totalDamage, drain);

        this.gainPowerTokens(1);
    }
};
let tinyTerrorObject = champions[36];
export let tinyTerror = new TinyTerror(tinyTerrorObject.name, tinyTerrorObject.flavorText, tinyTerrorObject.health, tinyTerrorObject.speed, tinyTerrorObject.armor, tinyTerrorObject.attack1, tinyTerrorObject.attack2, tinyTerrorObject.attack3, tinyTerrorObject.attack4, true);

class UglyDuckling extends Champion {
    attack1() {
        opponent = this.identifyOpponent();
        if (this.currentHealth <= 6) {
            console.log(this.name + "'s Smaaaash! activates.");
            if (this.isInUltimateForm) {
                this.attack1Damage = 8;
            } else {
                this.attack1Damage = 5;
            }
        } else {
            this.attack1Damage = 2;
        }
        let drain = true;
        super.attack1(drain);
    }
    attack2() {
        if (this.currentHealth <= 6) {
            console.log(this.name + "'s Smaaaash! activates.");
            if (this.isInUltimateForm) {
                this.attack2Damage = 9;
            } else {
                this.attack2Damage = 6;
            }
        } else {
            this.attack2Damage = 3;
        }
        super.attack2();
    }
    attack3() {
        if (this.currentHealth <= 6) {
            console.log(this.name + "'s Smaaaash! activates.");
            if (this.isInUltimateForm) {
                this.attack3Damage = 10;
            } else {
                this.attack3Damage = 7;
            }
        } else {
            this.attack3Damage = 4;
        }
        super.attack3();
    }
    attack4() {
        if (this.currentHealth <= 6) {
            console.log(this.name + "'s Smaaaash! activates.");
            if (this.isInUltimateForm) {
                this.attack4Damage = 11;
            } else {
                this.attack4Damage = 8;
            }
        } else {
            this.attack4Damage = 5;
        }
        super.attack4();
    }
    activateUltimate() {
        this.isInUltimateForm = true;
        this.gainUltimateForm();
        this.attack1();
    }
};
let uglyDucklingObject = champions[20];
export let uglyDuckling = new UglyDuckling(uglyDucklingObject.name, uglyDucklingObject.flavorText, uglyDucklingObject.health, uglyDucklingObject.speed, uglyDucklingObject.armor, uglyDucklingObject.attack1, uglyDucklingObject.attack2, uglyDucklingObject.attack3, uglyDucklingObject.attack4, true);

class WinterWraith extends Champion {
    startTurn() {
        super.startTurn();
        opponent = this.identifyOpponent();
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
        this.gainUltimateForm();
        this.attack4();
    }
};
let winterWraithObject = champions[8];
export let winterWraith = new WinterWraith(winterWraithObject.name, winterWraithObject.flavorText, winterWraithObject.health, winterWraithObject.speed, winterWraithObject.armor, winterWraithObject.attack1, winterWraithObject.attack2, winterWraithObject.attack3, winterWraithObject.attack4, true);

export let arrayOfChampions = [acranydra, archangelGabriel, azurian, cerberus, crimsonKnight, cursedPirate, dragonbane, evilDjinn, fang, gunslinger, hornet, hunter, hydra, impulse, jadeOgre, kitsune, kuNan, neoLeonidas, sandWyrm, sobek, steelForce, theGreatAbomination, theThreeMusketeers, tinyTerror, uglyDuckling, winterWraith];