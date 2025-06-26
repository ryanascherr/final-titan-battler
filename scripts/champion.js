// export let titan;
// export let challenger;

// export class Champion {
//     constructor(name, flavorText, health, speed, armor, attack1, attack2, attack3, attack4) {
//         this.name = name;
//         this.flavorText = flavorText;
//         this.health = health;
//         this.speed = speed;
//         this.armor = armor;
//         this.specialAbility = "";
//         this.ultimate = "";
//         this.isInUltimateForm = false;
//         this.benchPower = "";
//         this.attack1Damage = attack1;
//         this.attack2Damage = attack2;
//         this.attack3Damage = attack3;
//         this.attack4Damage = attack4;
//         this.isTitan = true;
//         this.isAlive = true;
//         this.isCharged = false;
//     }
//     takeDamage(damage) {
//         // damage = this.calcArmor(damage, attacker);

//         if (this.armor != 0) {
//             damage -= this.armor;
//         }

//         this.health -= damage;
//         console.log(this.name + " takes " + damage + " damage.");
//         console.log(this.name + " has " + this.health + " health remaining.");

//         if (this.currentHealth <= 0) {
//             this.currentHealth = 0;
//             this.isAlive = false;
//         }

//         if (!this.isAlive) {
//             this.die(index);
//         }

//         this.takeDamageSpecific(damage);
//     }
//     takeDamageSpecific(damage) {

//     }
//     gainHealth(health, index) {
//         this.currentHealth += health;

//         if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
        
//         console.log(this.name + " gained " + health + " health. " + this.name + "'s current health is " + this.currentHealth + "/" + this.maxHealth + ".");
//     }
//     startFight(index) {

//     }
//     startTurn(index) {

//     }
//     rollDie() {
//         let dieRoll = Math.floor(Math.random() * 6) + 1;

//         if (dieRoll == 1) {
//             this.attack1();
//         }
//         if (dieRoll == 2) {
//             this.attack2();
//         }
//         if (dieRoll == 3) {
//             this.attack3();
//         }
//         if (dieRoll == 4) {
//             this.attack4();
//         }
//         if (dieRoll == 5) {
//             this.charge();
//         }
//         if (dieRoll == 6) {
//             this.miss();
//         }
//     }
//     attack1() {
//         console.log(this.name + " attacks " + titan.name + " for " + this.attack1Damage + " damage!");
//         titan.takeDamage(this.attack1Damage);
//     }
//     attack2() {
//         console.log(this.name + " attacks " + titan.name + " for " + this.attack2Damage + " damage!");
//         titan.takeDamage(this.attack2Damage);
//     }
//     attack3() {
//         console.log(this.name + " attacks " + titan.name + " for " + this.attack3Damage + " damage!");
//         titan.takeDamage(this.attack3Damage);
//     }
//     attack4() {
//         console.log(this.name + " attacks " + titan.name + " for " + this.attack4Damage + " damage!");
//         titan.takeDamage(this.attack4Damage);
//     }
//     charge() {
//         if (!this.isCharged) {
//             this.isCharged = true;
//             console.log(this.name + " is charged! Rolling again...");
//             this.rollDie();
//         } else {
//             console.log(this.name + " activated their ultimate ability!");
//             activateUltimate();
//         }
//     }
//     miss() {
//         console.log(this.name + " missed!")
//     }
//     activateUltimate() {

//     }
//     endFight(index) {

//     }
//     die(index) {

//     }
// }