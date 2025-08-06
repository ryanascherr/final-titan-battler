import { arrayOfChampions } from "./champions.js";

export let titan;
export let challenger;
export let playerOneBench = [];
export let playerTwoBench = [];

populateDropdowns();
function populateDropdowns() {
    let titanDropdown = $("#titan-select");
    let challengerDropdown = $("#challenger-select");

    arrayOfChampions.forEach(function(champion) {
        let championName = champion.name;
        $("#titan-select").append(`<option value="${championName}">${championName}</option>`);
        $("#challenger-select").append(`<option value="${championName}">${championName}</option>`);
    });

    randomizeDropdown(titanDropdown[0]);
    randomizeDropdown(challengerDropdown[0]);
}

function randomizeDropdown(dropdown) {
    let options = dropdown.options;
    let randomIndex = Math.floor(Math.random() * options.length);
    dropdown.selectedIndex = randomIndex;
}

$(".js_select-champions").on('click', function() {
    let titanName = getTitanName();
    let challengerName = getChallengerName();

    console.log(arrayOfChampions);

    arrayOfChampions.forEach(function(champion, index) {
        if (champion.name == titanName) {
            titan = champion;
            titan.isTitan = true;
            titan.nameOfPosition = "titan";
            titan.ownedBy = "Player 1";
            arrayOfChampions.splice(index, 1);
        }
        if (champion.name == challengerName) {
            challenger = champion;
            challenger.isTitan = false;
            challenger.nameOfPosition = "challenger";
            challenger.ownedBy = "Player 2";
            arrayOfChampions.splice(index, 1);
        }
    });

    console.log(arrayOfChampions);

    pickBench(playerOneBench, "Player 1");
    pickBench(playerTwoBench, "Player 2");
    
    console.log(playerOneBench, playerTwoBench);
    displayChampions();
});

function getTitanName() {
    let titanDropdown = $("#titan-select");
    return titanDropdown.val();
}

function getChallengerName() {
    let challengerDropdown = $("#challenger-select");
    return challengerDropdown.val();
}

function pickBench(benchArray, player) {
    for (let index = 0; index < 3; index++) {
        let randomNumber = Math.floor(Math.random() * arrayOfChampions.length-1) + 1;
        arrayOfChampions[randomNumber].ownedBy = player;
        benchArray.push(arrayOfChampions[randomNumber]);
        arrayOfChampions.splice(randomNumber, 1);
    }
}

function displayChampions() {
    console.log(titan.name.toUpperCase() + " VS " + challenger.name.toUpperCase());

    $(".js_fight-container").removeClass("hide");
    $(".js_start-fight-btn-container").removeClass("hide");
    $(".setup").addClass("hide");
    displayChampion(titan, "titan");
    displayChampion(challenger, "challenger");

    startFight();
}

export function displayChampion(champion, nameOfPosition) {
    let name = champion.name;
    name = name.toLowerCase();
    name = name.replace(/ /g, "_");
    $(`.js_${nameOfPosition}-card`).attr("src",`./img/champion_${name}.jpg`);
    // $(`.js_${nameOfPosition}-container`).prepend(`<img class="champion-holder__card" src="./img/champion_${name}.jpg">`);
    champion.updateHealthDisplay();
}

$(".js_titan-roll-btn").on('click', function() {
    titan.identifyOpponent();
    titan.startTurn();
    // for (let i = 0; i <= titan.actionTokens; i++) {
        titan.rollDie();
    // }
});

$(".js_challenger-roll-btn").on('click', function() {
    challenger.identifyOpponent();
    challenger.startTurn();
    // for (let i = 0; i <= challenger.actionTokens; i++) {
        challenger.rollDie();
    // }
});

$(".js_start-fight-btn").on('click', function() {
});

function startFight() {
    console.log("-------START OF FIGHT-------");
    if (challenger.speed >= titan.speed) {
        challenger.startFight();
        titan.startFight();
    } else {
        titan.startFight();
        challenger.startFight();
    }
}

// Dice

let isDiceRolling = false;
let roll = 0;
let rollTime = 750;
let modifier = 0;
let numberOfDice = 2;
let log = [];
let isLogShown = true;
let style = "classic";

// $(".roll-btn").click(function() {
//     if (isDiceRolling) return;
//     isDiceRolling = true;

//     setTimeout(function(){
//         isDiceRolling = false;
//     }, rollTime);

//     rollAllDice();
// });

// function rollAllDice() {
//     roll = 0;

//     $(".cube").each(function() {
//         let currentCube = this;
//         let currentRoll = Math.floor(Math.random() * 6 + 1);
//         let numberAsString = JSON.stringify(currentRoll);

//         roll += currentRoll;

//         if ($(currentCube).hasClass("low")) {
//             $(currentCube).removeClass();
//             $(currentCube).addClass("cube high");
//             $(currentCube).addClass(`face-${numberAsString}-high`);
//         } else {
//             $(currentCube).removeClass();
//             $(currentCube).addClass("cube low");
//             $(currentCube).addClass(`face-${numberAsString}-low`);
//         }
//     })
// }