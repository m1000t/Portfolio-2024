
/*
Author: Arnav Pal 
Student number: 866744      
Name: A2 Programming Assignment (script.js)
Class:Introduction to Computer Science Grade 11
Teacher:Mr. Cho
Purpose:Generates a new file for use in the ICS3U course
Created:23-Oct-2022
Updated:5-Nov-2022
  
*/


// function Chancesofsurvival{
//all the let statements
let guess = 0
let num4 = 0
let num1 = 100
let a = 0
let counter = 0
let num3 = 0
let num2 = 0
let attempt = 5
let choice = ""
let choice2 = ""
let choice3 = ""
let choice4 = ""
let choice5 = ""
let choice6 = ""
let amountOfNumbers = 5
let total = 0
let i = 0


// Random numbers for diffrent paths
let randomNum1 = Math.floor(Math.random() * 10) + 1
let randomNum2 = Math.floor(Math.random() * 10) + 1
let randomNum3 = Math.floor(Math.random() * 10) + 1
let randomNum4 = Math.floor(Math.random() * 10) + 1



//Functions used 
//function to calculate the accuracy in percent the polar bear is going to strike
function percentagetohit(num1, guess) {
  if (num1 < 0 || guess < 0 || guess >= 100) {

    return N / A
  }
  num1 = num1 * (1 - (guess / 100))
  num1 = (Math.round(num1 * 100)) / 100
  return num1
}
//function to get the distance from polar bear intial location to final
function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}
//The intro to the story basically the back story
console.log("The polar bear wants to meet his brother\n")
console.log("You have to pick one direction to see if you can complete the story")

choice = prompt("What is your choice, left, right or straight ")

console.log("\n")

// 1st choice
if (choice == "right") {
  console.log("You are in a paradise for food you see two animals a seal and a giant fish which will you go for -")
  console.log("\n")
  //user is asked to make a decsion 
  choice = prompt("Choose your dinner || Fish or seal")
}


//choose a number between 1-10 to guess the percentage of the accuracy of the strike. 
if (choice == "Fish" || choice == "fish") {
  console.log("guess a number from 1-100 to strike the fish")
  console.log("\n")
  console.log("If number is under 50% you have failed to strike fish")
  console.log("\n")
  console.log("you die of hunger and reset if you are unable to get above 50%")
  console.log("\n")
  console.log("The number must be between 1-100 not above that")
  //the computer asks for the users guess 
  let guess = parseInt(prompt(console.log("My guesss is- ")))
  num1 = percentagetohit(num1, guess)
  //whatever the guess is it is divied by a 100 to get the percentage
  console.log("chance to strike is % " + num1)

  console.log("\n")
  //if the percentage is above %50 you pass 
  if (num1 >= 50) {
    console.log("You have passed and have succeded to kill the fish ")
    console.log("\n")
    console.log("With that energy you are able to finish the game")
    //else if the percentage is less then %50 you fail 
  } else {
    console.log("you have failed to kill the fish")
  }
}
//if choice is seal you dont have to do anything
else if (choice == "Seal" || choice == "seal") {
  prompt("Press enter to get a number if number is higher than 5 you get to eat the seal")
  //random number for seal
  console.log(randomNum3)
  //if the random number is greater than 5 or = you pass without trouble.
  if (randomNum3 >= 5) {
    console.log("Lucky you get to eat the seal without any trouble you win and have succeded.")

    console.log("\n")
  }
  //else if the number is less than 5 you fail
  else {
    console.log("You have died of hunger and have to restart")
  }
}

//2 choice in the story
if (choice == "straight") {
  console.log("The Polar bear is running in a straight line he has two options to either is either fly or teleport")

  console.log("\n")

  //the user is asked to pick an option between two things
  choice = prompt("Choose your option || Fly or teleport")
}
//if choice = fly enter 5 numbers 
if (choice == "Fly" || choice == "fly") {
  console.log("You have to enter 5 numbers you cannot use 0 if you are able to get a sum of 299799509 M/S with the 5 numbers you succeed ")
  console.log("\n")
  prompt("Press enter to answer the question")
  // you are to enter 5 numbers which the for loops does
  for (i = 0; i < amountOfNumbers; i++) {
    let number = parseInt(prompt("Enter your number"))
    if (Number.isInteger(number) && number != 0) {
      total = total + number
    }
    else {
      console.log("Invalid input")
    }
  }
  console.log(total)
  //this is to make sure the answer is 299799509
  if (total == 299799509) {
    console.log("You have succeded ")
  }
  else {
    console.log("you failed and have died ")
  }

}
//if the user picks teleport 
if (choice == "Teleport" || choice == "teleport") {
  prompt("Press enter to get a number (if number is higher than 6 you pass)")
  //random number for seal
  console.log(randomNum4)
  //if the number is greater or = 6 you have passed the test 
  if (randomNum4 >= 6) {
    console.log("you have passed and the polar bear meets his brother")
  }
  //if the person get anything lower than you fail
  else {
    console.log("you have failed and have failed to reach the goal")

  }
}
// 3rd choice 
// You meet a whale and the whale asks you a math questions 
if (choice == "left" || choice == "Left") {
  console.log("YOU MEET A SIDEKICK WHICH GIVES YOU A MATH QUESTIONS")

  console.log("\n")
  //the questions the user is asked 
  console.log("Guess the points intial postion and the final postions to get the distance which will be the nearest 500km (450km - 550km)")

  console.log("\n")

  console.log("You have to guess the distance the polar bear travelled ")

  //while loop used for the attempts in the questions
  while (attempt > 0) {
    console.log("You have " + attempt + " tries left.")
    x2 = parseInt(prompt("What is x2 = "))
    y2 = parseInt(prompt("What is y2 = "))
    x1 = parseInt(prompt("What is x1 = "))
    y1 = parseInt(prompt("What is y1 = "))

    //function to get the distance the equation used is the distance equation on a graph 
    num2 = parseInt(getDistance(x1, x2, y1, y2))
    console.log(num2)
    console.log("Distance travelled is " + num2 + " km")

    //if number is greater than 450 and less than 550 is correct
    if (num2 >= 450 && num2 <= 550) {
      console.log("You have succeded and finished the game ")
      attempt = 0
    } else {
      console.log("YOU HAVE FAILED THE TEST AND HAVE TO RESTART ")
      attempt = attempt - 1
    }
  }
}





