
/*
  Name:        Programming assignment 2 (script.js)
  Purpose:     To make a terminal code/game with arrow functions and arrays

  Author:      Arnav    
  Created:     10-Dec-2022
  Updated:     22-Dec-2022
*/

const names = [];

while (true) {
  const name = prompt("Enter a name (or leave it blank to stop adding names):");
  if (name === "") break;
  names.push(name);
}

//makes sure any undeclared variables are not there
; "use strict";


//#static functions
/**
 * Function name : rand 
 * Generates a random number between 0 (inclusive) and 1 (exclusive).
 * @return {number} A random number between 0 and 1.
 */
const rand = () => { return Math.random(); }

/**
 * Function name : log
 * Prints a message to the console.
 * @param {...*} arguments - The values to print to the console.
 */
function log() { console.log.apply(console.log, arguments); }

/**
 * Prints an error message to the console.
 * @param {...*} arguments - The values to print to the console as an error.
 */
function error() { console.error.apply(console.error, arguments); }

/**
 * Function name : clearTerminal
 * Clears the console.
 */
function clearTerminal() { console.clear(); }

/**
 * Function name : emptyTerminalLine
 * Prints an empty line to the console.
 */
function emptyTerminalLine() { console.log(""); }


//#end of static functions


// `current_weapon` will be used as a pointer for a weapon from `WEAPONS` array
let current_weapon = null;

// set the points at the beginning of the game
let current_points = 200;
const __MAX_POINTS__ = 1000; //#readonly

//arrays for random damages
let current_health = 100;
const __MAX_HEALTH__ = 100; //#readonly
const __HEALTH_PACK_VALUE__ = 40; //#readonlya
const __RANDOM_DAMAGES__ = [40, 20, 10, 5, 1, 2, 15, 60, 80, 0, 100]; //#readonly
// const PLAYER_INVENTORY = [];

//let statements for kills and game over 
let kills_counter = 0;
let game_over = false;


/**
 * Prompts the user to press the Enter button to continue.
 *
 * @return {void}
 */
function waitingUserEnterButton() {
    prompt("Press Enter button to continue...");
}

/**
 * Checks the player's current health and handles game over if the player's health is 0 or below.
 */
const checkPlayerHealth = () => {
    if (current_health > 0) return;
    current_health = 0;
    game_over = true;
    clearTerminal();
    log("Enemy Killed You!.");
    log("Game Over.");
    waitingUserEnterButton();
}

//Object for the weapons 
const WEAPONS = [
    { name: "Pistol", accuracy: rand(), ammo: /* default */6 },
    { name: "Rifle", accuracy: rand(), ammo: /* default */12 },
    { name: "Shotgun", accuracy: rand(), ammo: /* default */8 },
    { name: "RPG", accuracy: rand(), ammo: /* default */1 },
    { name: "Grenade", accuracy: rand(), ammo: /* default */3 }
];

/**
 * Heals the player by a certain amount using a health pack.
 *
 * @param {number} current_health - The player's current health.
 * @param {number} __HEALTH_PACK_VALUE__ - The amount of health the health pack restores.
 * @param {number} __MAX_HEALTH__ - The player's maximum health.
 * @returns {void}
 */
const healPlayerUsingHealthPack = () => {
    if ((current_health + __HEALTH_PACK_VALUE__) > __MAX_HEALTH__) {
        current_health = __MAX_HEALTH__;
    } else {
        current_health += __HEALTH_PACK_VALUE__;
    }
};


//array for the perk items which will drop 
const PERK_ITEMS = [
    { name: "Health Pack", points: 20, trigger: () => healPlayerUsingHealthPack() },
    { name: "Gold", points: 50, trigger: () => { } },
    {
        name: "Ammo Crate", points: 10,
        trigger: () => {
            if (!!current_weapon) current_weapon.ammo += 4
        }
    }
];


// items users can buy from the shop which will benifit them 
const SHOP_ITEMS = [
    {
        name: "Extra Ammo", price: 50,
        trigger: () => {
            if (!!current_weapon)
                current_weapon.ammo += 5;
        }
    },
    {
        name: "Increase Accuracy", price: 100,
        trigger: () => {
            if (!!current_weapon)
                current_weapon.accuracy += 0.2;
        }
    },
    {
        name: "Health Pack", price: 20,
        trigger: () => healPlayerUsingHealthPack()
    }
];


// function is used to display a list of options to the user and receive their selection. It takes an object as an argument with the following properties:
/**
 * Shows a menu with the given options to the user.
 * @param {Object} options - An object containing the menu options.
 * @param {string} message - A message to display before the menu options.
 * @param {string} type - The type of menu to display (e.g. 'main', 'pause').
 */
const showMenuOptions = ({ options, message, type }) => {
    emptyTerminalLine();

  
    // always display points and health of player every menu also displays the kill the user gets updated 
  log("===========================================================================================");
    log(`> Points: ${(current_points === 0) ? "0.0" : current_points}`);
    log(`> Health: ${current_health}`);
    log(`> Kills: ${kills_counter}`);
    log(`> Name : ${names}`);
    // log(`> Inventory: ${ PLAYER_INVENTORY }`);

  //the accuracy of the weapons is displayed too
    if (!!current_weapon) {
        log(`> Weapon: ${current_weapon.name} (accuracy: ${current_weapon.accuracy}, ammo: ${current_weapon.ammo})`);
    }
    else log("You have to select a weapon!");
    emptyTerminalLine();

    // print menu options such as the type of weapon and ammo
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        log(
            `${i + 1}) ${!!option.name ? option.name : option}` +
            `${type === "weapons" ? "  (ammo: " + option.ammo + ")" : ""}` +
            `${type === "shop" ? " (price: " + option.price + ")" : ""}`
        );
    }
    const reply = parseInt(prompt(!!message ? message + ":" : "Select: "));
    if (isNaN(reply)) return null;

    // when user enter invalid selection
    if (reply > options.length || reply < 1) {
        emptyTerminalLine();
        error("Invalid selection.");
        waitingUserEnterButton();
        return null;
    }
    return reply;
}

// The GameMenus object appears to represent different menus in a game.
const GameMenus = {
  //The Main function represents the main menu of the game,
    Main: function () {
        return showMenuOptions({
            options: [
                "Shoot",
                !!current_weapon ? "Change Weapon" : "Select Weapon",
                "Visit Shop",
                "Quit"
            ]
        });
    },
  //the Shop function represents the shop menu,
    Shop: function () {
        return showMenuOptions({
            options: SHOP_ITEMS,
            message: "Buy",
            type: "shop"
        });
    },
  // Weapons function represents the weapons menu.
    Weapons: function () {
        return showMenuOptions({
            options: WEAPONS,
            message: "Select a weapon",
            type: "weapons"
        });
    },
};


/**
 * Handles the shooting mechanics of the game.
 * Checks if the player has a weapon selected, has enough ammo, and calculates the damage based on the weapon's accuracy and random factors.
 */
const Shoot = () => {

    if (!current_weapon) {
        log("No Weapon has been selected!");
        waitingUserEnterButton();
        return;
    }

    // check if weopan has enough ammo
    if (current_weapon.ammo === 0) {
        log("Out of ammo!");
        waitingUserEnterButton();
        return;
    }

    // decrease weapon ammo per shoot
    current_weapon.ammo -= 1;

    // using random accuracy and random drops for the perks every kill
    if (rand() < current_weapon.accuracy) {
        current_points += 10;
        kills_counter++;
        log("Hit!");
        if (rand() < 0.5 || current_weapon.name === "RPG" || current_weapon.name === "Grenade") {
            const item = PERK_ITEMS[Math.floor(rand() * PERK_ITEMS.length)];
            if ((current_points + item.points) > __MAX_POINTS__) current_points = __MAX_POINTS__;
            else current_points += item.points;
            log(`Congratulations You found ${item.name}!`);
            item.trigger();
        }
        waitingUserEnterButton();
    }
    else {
        const random_damage = __RANDOM_DAMAGES__[Math.floor(rand() * PERK_ITEMS.length)];
        current_health -= random_damage;
        log(" Missed!");
        log(" Damage: -" + random_damage);
        checkPlayerHealth();
        waitingUserEnterButton();
    }
};


//perks which is there so that the shop items work 
const Perks = [
    {
      //perks for the user to double his points
        name: "Double Points",
        trigger: () => {
            let new_points = current_points * 2;
            if (new_points > __MAX_POINTS__) new_points = __MAX_POINTS__;
            current_weapon = new_points;
        }
    },
    {
      //perk for extra ammo 
        name: "Extra Ammo",
        trigger: () => {
            current_weapon.ammo += 2;
        }
    },
    {
        //perk for increased accuracy 
        name: "Increase Accuracy",
        trigger: () => {
            current_weapon.accuracy += 0.1;
        }
    }
];

/**
 * Allows the player to buy an item from the shop.
 *
 * @param {number} itemIndex - The index of the item in the SHOP_ITEMS array.
 * @param {Object} SHOP_ITEMS - An array of objects representing items that can be bought from the shop.
 * @param {number} current_points - The player's current points.
 * @param {Object} current_weapon - The player's current weapon.
 * @param {number} current_health - The player's current health.
 * @param {number} __MAX_HEALTH__ - The player's maximum health.
 * @returns {void}
 */
const buy = (itemIndex) => {
    const item = SHOP_ITEMS[itemIndex - 1];
    if (current_points < item.price) {
        log("Not enough points!");
        return;
    }
    if (!current_weapon && item.name !== "Health Pack") {
        clearTerminal();
        log("You have to select a weapon!");
        waitingUserEnterButton();
        return;
    }
    if (item.name === "Health Pack" && current_health === __MAX_HEALTH__) {
        emptyTerminalLine();
        log("You already have full health!");
        waitingUserEnterButton();
        return;
    }
    current_points -= item.price;
    item.trigger();
    log(`Bought ${item.name}`);
};

//main arrow function for the user to actually perform the tasks
const main = () => {
    while (true) {
        if (game_over) break;

        // this menu will update everything
        const choice = GameMenus.Main();
        clearTerminal();

        switch (choice) {
            // If the user chooses option 1 ("Shoot"), the function calls the Shoot function. If the player dies (indicated by the game_over variable becoming true), the function exits the loop and returns.
            case 1:
                Shoot();
                // break the loop when the player die
                if (game_over) return;
                break;

            // If the user chooses option 2 ("Select Weapon"), the function calls the GameMenus.Weapons function to show the weapons menu and gets the selected weapon. 
            case 2: const selected_weapon = GameMenus.Weapons();
                if (selected_weapon !== null) {
                    current_weapon = WEAPONS[selected_weapon - 1];
                }
                break;

            // If the user chooses option 3 ("Visit Shop"), the function calls the GameMenus.Shop function to show the shop menu and gets the selected item.
            case 3: buy(GameMenus.Shop());
                break;

            // If the user chooses option 4 ("Quit"), the function clears the terminal and prints a goodbye message, then exits the loop and returns.
            case 4: clearTerminal();
                log("\x1b[31m Goodbye!");
                return; // break the loop


        }
        clearTerminal();
//kill_counter if the user hits 500 kills the user gets an option to pick if he wants to activate the nuke or not
        if (kills_counter >= 500) {
            log("\x1b[34m Congratulations, you have reached 500 kills!");
            log("\x1b[34m You have been rewarded with a nuke.");
            log("\x1b[34m Would you like to activate it? (y/n)");

            // get player's response
            const response = prompt("Enter y or n: ");

            // if player chooses to activate nuke, end the game
            if (response === "y") {
                game_over = true;
                log("Nuke activated. Game over.");
                return;
            }
        }
    }
};

// start the game with animation like count down timer
(function () {
    let count_down = 5;
    const interval_timer_func = setInterval(function () {
        if (count_down === 0) {
            clearInterval(interval_timer_func);
            clearTerminal();
            main();
            return;
        }
        count_down--;
        clearTerminal();
        log(`Game will be ready in ${count_down}s`);
    }, 1000);
})();

//navigation for the user and some steps for the user, also some tips and goals
prompt("\x1b[31m > To go through a breif discription of the game press Enter")
clearTerminal()

prompt("\x1b[35m > #1 The goal of the game is to get as many kills without dying")
clearTerminal()

prompt("\x1b[33m > #2 Throughout the game there are multiple drops for every time you hit the target")
clearTerminal()

prompt("\x1b[34m > #3 Buy items from the shops to get higher chance of getting kills ")
clearTerminal()

prompt("\x1b[32m > #4 Try getting 500 kills for a nuke ")
clearTerminal()
