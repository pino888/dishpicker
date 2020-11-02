// fetching elements
var userInput = document.getElementById("input");
const addButton = document.getElementById("add");
const button = document.getElementById("generate");
const saveButton = document.getElementById("save");
var answerDish = document.getElementById("answer");
var userTypedText = "";

// list of dishes and parameters
var userDishes = [];
var stockDishes = ["Burger and Chips", "Pizza", "Fish and Chips", "Kebab", "Roast Chicken", "Spaghetti Bolognese"];
var uniqRate = 0; // for future option
var recentDishes = [];

userInput.focus();

// adds users dishes to the list
const adding = () => {
    if (userInput.value == 0) {
        answerDish.style.backgroundColor = "red";
        answerDish.style.color = "white";
        answerDish.innerHTML = `Please type in your dish name.`;
        userInput.value = "";
        userInput.focus();
    } else {
        answerDish.style.backgroundColor = "teal";
        answerDish.style.color = "white";
        userTypedText = userInput.value;
        answerDish.innerHTML = `You have added <strong><u>${userTypedText}</u></strong> to the list of your favourite dinner ideas.`;
        userDishes.push(userTypedText);
        localStorage.setItem("savedFood", JSON.stringify(userDishes));
        userInput.value = "";
        userInput.focus();
    }
}

// dish generator function
const dishGenerator = () => {
    var retrievedData = localStorage.getItem("savedFood");
    userDishes = JSON.parse(retrievedData);
    var choicedStockDish = stockDishes[Math.floor(Math.random() * stockDishes.length)];
    // if no dishes entered it will use stock dishes
    if (userDishes.length == 0) {
        answerDish.style.backgroundColor = "teal";
        answerDish.style.color = "white";
        answerDish.innerHTML = `Your dinner suggestion for today is: <br><strong><u>${choicedStockDish}!</u></strong>`;
    } else {
        var choicedDish = userDishes[Math.floor(Math.random() * userDishes.length)];
        // checks if choice was used recently and if not, do the function, otherwise repeat
        var n = recentDishes.includes(choicedDish);
        if (n == false){
            // checks if recent dishes limit reached and adds on if not or delete oldest and add new if it did reach
            if (recentDishes.length < 5) {
                recentDishes.push(choicedDish);
                answerDish.style.backgroundColor = "teal";
                answerDish.style.color = "white";
                answerDish.innerHTML = `Your dinner suggestion for today is: <br><strong><u>${choicedDish}!</u></strong>`;
            } else {
                recentDishes.shift();
                recentDishes.push(choicedDish);
                answerDish.style.backgroundColor = "teal";
                answerDish.style.color = "white";
                answerDish.innerHTML = `Your dinner suggestion for today is: <br><strong><u>${choicedDish}!</u></strong>`;
            }
        } else {
            dishGenerator();
        }
    }
}

button.onmouseup = dishGenerator;
addButton.onmouseup = adding;