//Global variables
let cluesArray;
let mainTag = document.querySelector("main");
let h3Tag = document.querySelector("h3");
let gameButton = document.getElementById("game-button");
let currentScore = 0;
let clueIndex;
let currentClue;  
let answerBox = document.createElement("INPUT");
let scoreBoard = document.createElement("div");

//Asynchronous code
function startGame ()  {
    fetch("https://jservice.io/api/random")
    .then((response) => response.json())
    .then((data) => fetch("https://jservice.io/api/clues?category="+data[0].category_id)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        cluesArray = data;
        displayQuestion(cluesArray)
    }))
}

//Global functions Alphabetized
function displayQuestion(data) {
    
    scoreBoard.innerText = `Current Score: ${currentScore}`
    mainTag.append(scoreBoard);

    clueIndex = Math.floor(Math.random() * data.length);
     currentClue = data[clueIndex];
     h3Tag.innerText = currentClue.question;
     console.log(currentClue.answer);
     cluesArray.splice(clueIndex, 1);
    

    
    answerBox.setAttribute("type", "text");
    answerBox.setAttribute("placeholder", "your answer?"),
    mainTag.append(answerBox);

    gameButton.innerText = "Submit";
};

function eventHandler() {
    if (gameButton.innerText == "Submit") {
        
        if (answerBox.value.toLowerCase() == currentClue.answer.toLowerCase()) {
            currentScore ++;
            scoreBoard.innerText = `Current Score: ${currentScore}`
            
            clueIndex = Math.floor(Math.random() * cluesArray.length);
            currentClue = cluesArray[clueIndex];
            console.log(currentClue.answer);
            
            h3Tag.innerText = currentClue.question;
            cluesArray.splice(clueIndex, 1);
        } else {
            currentScore = 0;
            h3Tag.innerText = "That was incorrect!";
            gameButton.innerText = "Start New Game?";
        }
    } else {
        startGame()
    }
}
gameButton.addEventListener("click", eventHandler);
