var inputContainer = document.querySelector("table");
var currentMoveDisplay = document.querySelector(".display");
var currentMove = 'x';
var boardSize = [3, 3];
var inRow = 3;
var checkForWinnerContainer;

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
            console.log("Wygrały " + checkForWinnerContainer);
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