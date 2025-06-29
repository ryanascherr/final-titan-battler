// import { Champion } from "./champion.js";
// import { titan, challenger } from "./champion.js";

// const supabaseURL = 'https://jjdtikulxocedonohrpf.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZHRpa3VseG9jZWRvbm9ocnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0OTI1NjEsImV4cCI6MjA1NjA2ODU2MX0.7H56TLX1hFXqCJBgDHRU5Evj7gPtdXYUugtyPBfZQuI';
// const supabaseData = window.supabase.createClient(supabaseURL, supabaseKey);
// const { data, error } = await supabaseData.from('champions').select()
// .order('id', { ascending: true });
// const champions = data;
// console.log(champions);
let arrayOfChampions = [];
// let titan;
// let challenger;
let firstFighter;
let secondFighter;
let opponent;

// import { titan, challenger } from "./champions.js";

import { dummy, acranydra, archangelGabriel, azurian, cerberus, crimsonKnight, cursedPirate, dragonbane, evilDjinn, fang, gunslinger, hornet, hunter, hydra, impulse, jadeOgre, kitsune, kuNan, neoLeonidas, sandWyrm, sobek, steelForce, theGreatAbomination, theThreeMusketeers, tinyTerror, uglyDuckling, winterWraith } from "./champions.js";

export let titan = dummy;
export let challenger = hornet;

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
    opponent = challenger;
    titan.identifyOpponent();
    for (let i = 0; i <= titan.actionTokens; i++) {
        titan.rollDie();
    }
});

$(".js_challenger-roll-btn").on('click', function() {
    challenger.reset();
    challenger.startTurn();
    opponent = titan;
    challenger.identifyOpponent();
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