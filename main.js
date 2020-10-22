// fetching elements
var userInput = document.getElementById("input");
const addButton = document.getElementById("add");
const button = document.getElementById("generate");
const saveButton = document.getElementById("save");
var answerDish = document.getElementById("answer");
var userTypedText = "";

// list of dishes and parameters
var userDishes = [];
var stockDishes = ["stock1", "stock2", "stock3"];
var uniqRate = 0; // for future option
var recentDishes = [];

userInput.focus();

// adds users dishes to the list
const adding = () => {
    userTypedText = userInput.value;
    answerDish.innerHTML = `You have added <strong><u>${userTypedText}</u></strong> to the list of your favourite dinner ideas.`;
    userDishes.push(userTypedText);
    localStorage.setItem("savedFood", JSON.stringify(userDishes));
    userInput.value = "";
    userInput.focus();
}

// dish generator function
const dishGenerator = () => {
    var retrievedData = localStorage.getItem("savedFood");
    userDishes = JSON.parse(retrievedData);
    var choicedDish = userDishes[Math.floor(Math.random() * userDishes.length)];
    var choicedStockDish = stockDishes[Math.floor(Math.random() * stockDishes.length)];
    // checks if used recently
    var n = recentDishes.includes(choicedDish);
    if (n == false){
        // if none entered it will use stock dishes
        if (userDishes.length == 0) {
            answerDish.innerHTML = `Your dinner suggestion for today is <strong><u>${choicedStockDish}.</u></strong>`;
        }
        // checks if recent limit reached
        else if (recentDishes.length < 5) {
            recentDishes.push(choicedDish);
            answerDish.innerHTML = `Your dinner suggestion for today is <strong><u>${choicedDish}.</u></strong>`;
        } else {
            recentDishes.shift();
            recentDishes.push(choicedDish);
            answerDish.innerHTML = `Your dinner suggestion for today is <strong><u>${choicedDish}.</u></strong>`;
        }
    } else {
        dishGenerator();
    }
}

button.onmouseup = dishGenerator;
addButton.onmouseup = adding;