var inputContainer = document.querySelector("table");
var currentMoveDisplay = document.querySelector(".display");
var endScreen = document.querySelector(".endScreen");
var result = document.querySelector(".result");
var scoreDisplay1 = document.querySelector(".scoreDisplay1");
var scoreDisplay2 = document.querySelector(".scoreDisplay2");
var currentMove = 'x';
var boardSize = [3, 3];
var score = [0, 0]
var inRow = 3;
var checkForWinnerContainer;

if(localStorage.getItem("score") != null){
    score = [localStorage.getItem("score")[0], localStorage.getItem("score")[2]];
    currentMove = localStorage.getItem("currentMove");
    if(currentMove === 'o'){
        currentMoveDisplay.innerHTML = "O";
        currentMoveDisplay.classList.remove("red");
        currentMoveDisplay.classList.add("blue");
    }
    else {
        currentMoveDisplay.innerHTML = "X";
        currentMoveDisplay.classList.remove("blue");
        currentMoveDisplay.classList.add("red");
    }
    displayScore();
}

inputContainer.addEventListener("click", function(e){
    if(e.target.tagName === 'TD' && e.target.innerHTML === ''){
        if(currentMove === 'x'){
            e.target.innerHTML = "x";
            e.target.classList.add("red");
            currentMoveDisplay.innerHTML = "O";
            currentMoveDisplay.classList.remove("red");
            currentMoveDisplay.classList.add("blue");
            currentMove = 'o';
            checkForWinnerContainer = 'x';
        }
        else {
            e.target.innerHTML = "o";
            e.target.classList.add("blue");
            currentMoveDisplay.innerHTML = "X";
            currentMoveDisplay.classList.remove("blue");
            currentMoveDisplay.classList.add("red");
            currentMove = 'x';
            checkForWinnerContainer = 'o';
        }
        let isWinner = checkForWinner(e.target);
        if(isWinner){
            onWin(checkForWinnerContainer);
        }
    }
})

function checkForWinner(element){
    let v = parseInt(element.classList[0].slice(1, 2));
    let h = parseInt(element.classList[0].slice(3, 4));
    let count = 1;
    let current;

    if(element.classList.contains("red")){
        current = "red";
    }
    else {
        current = "blue";
    }

    for(let i = v - 1; i > 0; i--){
        let currentElement = document.querySelector(`.v${i}h${h}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    for(let i = v + 1; i <= boardSize[0]; i++){
        let currentElement = document.querySelector(`.v${i}h${h}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    if(count >= inRow){
        return true;
    }

    count = 1;
    for(let i = h - 1; i > 0; i--){
        let currentElement = document.querySelector(`.v${v}h${i}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    for(let i = h + 1; i <= boardSize[1]; i++){
        let currentElement = document.querySelector(`.v${v}h${i}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    if(count >= inRow){
        return true;
    }

    count = 1;
    for(let i = v - 1, j = h - 1; i > 0 && j > 0; i--, j--){
        let currentElement = document.querySelector(`.v${i}h${j}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    for(let i = v + 1, j = h + 1; i <= boardSize[0] && j <= boardSize[1]; i++, j++){
        let currentElement = document.querySelector(`.v${i}h${j}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    if(count >= inRow){
        return true;
    }

    count = 1;
    for(let i = v - 1, j = h + 1; i > 0 && j <= boardSize[1]; i--, j++){
        let currentElement = document.querySelector(`.v${i}h${j}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    for(let i = v + 1, j = h - 1; i <= boardSize[0] && j > 0; i++, j--){
        let currentElement = document.querySelector(`.v${i}h${j}`);
        if(currentElement && currentElement.classList.contains(current)) {
            count++;
        } else {
            break;
        }
    }
    if(count >= inRow){
        return true;
    }
}

function onWin(winner){
    endScreen.classList.remove("displayNone");
    result.classList.remove("red");
    result.classList.remove("blue");
    if(winner == 'x'){
        result.classList.add("red");
        result.innerHTML = "X";
        score[0]++;
    }
    else if(winner == 'o'){
        result.classList.add("blue");
        result.innerHTML = "O";
        score[1]++;
    }
    displayScore();
}

function displayScore(){
    scoreDisplay1.innerHTML = `${score[0]} - ${score[1]}`;
    scoreDisplay2.innerHTML = scoreDisplay1.innerHTML;
}

function continueGame(){
    document.querySelector("table").innerHTML = 
    `
        <table>
            <tr class="v1">
                <td class="v1h1"></td>
                <td class="v1h2"></td>
                <td class="v1h3"></td>
            </tr>
            <tr class="v2">
                <td class="v2h1"></td>
                <td class="v2h2"></td>
                <td class="v2h3"></td>
            </tr>
            <tr class="v3">
                <td class="v3h1"></td>
                <td class="v3h2"></td>
                <td class="v3h3"></td>
            </tr>
        </table>
    `;
    endScreen.classList.add("displayNone");
}

function save(){
    let block = true;
    if(block){
        !block;
        document.querySelector(".s").innerHTML = "Score saved!";
        localStorage.setItem("score", score);
        localStorage.setItem("currentMove", currentMove);
        setTimeout(() => {
            document.querySelector(".s").innerHTML = "Save score";
        }, 2000);
        !block
    }
}

function reset(){
    let block = true;
    if(block){
        !block;
        document.querySelector(".r").innerHTML = "Score reseted!";
        localStorage.clear();
        score = [0, 0];
        displayScore();
        setTimeout(() => {
            document.querySelector(".r").innerHTML = "Reset score";
        }, 2000);
        !block
    }
}