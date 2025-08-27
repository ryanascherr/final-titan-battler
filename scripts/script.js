import { arrayOfChampions } from "./champions.js";

export let titan;
export let challenger;
export let playerOneBench = [];
export let playerTwoBench = [];

let historyText = document.querySelector(".js_history-text");

const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            } else if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
                historyText.lastElementChild.scrollIntoView(false);
                // $(historyText).append("<hr>");
            } else if (mutation.type === 'characterData') {
                console.log('The text content of a node has changed.');
            }
        }
};
const observer = new MutationObserver(callback);
const targetNode = historyText; // Or any other way to select the element
const config = { attributes: true, childList: true, subtree: true, characterData: true };

observer.observe(targetNode, config);


document.querySelector("body").addEventListener('click', function(event) {
    if (event.target.closest('.js_choose-img')) {
        let clickedElem = event.srcElement;
        clickedElem.classList.add("highlight")
    }
});


populateChoices();
function populateChoices() {
    arrayOfChampions.forEach(function(champion, index) {
        let name = champion.name;
        name = name.toLowerCase();
        name = name.replace(/ /g, "_");

        let newImg = document.createElement("img");
        $(newImg).attr("src", `./img/champion_${name}.jpg`);
        $(newImg).attr("data-name", champion.name);
        $(newImg).addClass("choose__img js_choose-img");

        $(".choose").append(newImg);
    })
}

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

    // console.log(titanName, challengerName);

    // console.log(arrayOfChampions);

    arrayOfChampions.forEach(function(champion, index) {
        if (champion.name == titanName) {
            titan = champion;
            titan.isTitan = true;
            titan.nameOfPosition = "titan";
            titan.ownedBy = "Player 1";
            // arrayOfChampions.splice(index, 1);
        }
        if (champion.name == challengerName) {
            challenger = champion;
            challenger.isTitan = false;
            challenger.nameOfPosition = "challenger";
            challenger.ownedBy = "Player 2";
            // arrayOfChampions.splice(index, 1);
        }
    });

    // console.log(arrayOfChampions);

    // pickBench(playerOneBench, "Player 1");
    // pickBench(playerTwoBench, "Player 2");
    
    // console.log(playerOneBench, playerTwoBench);
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
    $(historyText).append("<p>" + titan.name + " VS " + challenger.name + "</p><hr>");

    titanRollBtn.css("pointer-events", "none");
    $(".js_titan-roll-btn img").css("filter", "grayscale()");

    challengerRollBtn.css("pointer-events", "none");
    $(".js_challenger-roll-btn img").css("filter", "grayscale()");

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

let titanStartTurnBtn = $(".js_titan-start-turn-btn");
let titanRollBtn = $(".js_titan-roll-btn");
let challengerStartTurnBtn = $(".js_challenger-start-turn-btn");
let challengerRollBtn = $(".js_challenger-roll-btn");

$(".js_titan-start-turn-btn").on('click', function() {
    titanStartTurnBtn.css("opacity", ".5");
    titanStartTurnBtn.css("pointer-events", "none");
    titanStartTurnBtn.text("My Turn");

    challengerStartTurnBtn.css("opacity", "1");
    challengerStartTurnBtn.css("pointer-events", "auto");
    challengerStartTurnBtn.text("Start Turn");

    titanRollBtn.css("pointer-events", "auto");
    $(".js_titan-roll-btn img").css("filter", "none");

    challengerRollBtn.css("pointer-events", "none");
    $(".js_challenger-roll-btn img").css("filter", "grayscale()");

    titan.identifyOpponent();
    titan.startTurn();
});

$(".js_challenger-start-turn-btn").on('click', function() {
    challengerStartTurnBtn.css("opacity", ".5");
    challengerStartTurnBtn.css("pointer-events", "none");
    challengerStartTurnBtn.text("My Turn");

    titanStartTurnBtn.css("opacity", "1");
    titanStartTurnBtn.css("pointer-events", "auto");
    titanStartTurnBtn.text("Start Turn");

    challengerRollBtn.css("pointer-events", "auto");
    $(".js_challenger-roll-btn img").css("filter", "none");

    titanRollBtn.css("pointer-events", "none");
    $(".js_titan-roll-btn img").css("filter", "grayscale()");

    challenger.identifyOpponent();
    challenger.startTurn();
});

$(".js_titan-roll-btn").on('click', function() {
    titan.rollDie();
});

$(".js_challenger-roll-btn").on('click', function() {
    challenger.rollDie();
});

$(".js_start-fight-btn").on('click', function() {
});

function startFight() {
    console.log("-------START OF FIGHT-------");
    $(historyText).append("<p>START OF FIGHT</p><hr>");

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