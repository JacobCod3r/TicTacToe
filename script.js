var inputContainer = document.querySelector("table");
var currentMoveDisplay = document.querySelector(".display");
var currentMove = 'x';

inputContainer.addEventListener("click", function(e){
    if(e.target.tagName === 'TD' && e.target.innerHTML === ''){
        if(currentMove === 'x'){
            e.target.innerHTML = "x";
            e.target.classList.add("red");
            currentMoveDisplay.innerHTML = "O";
            currentMoveDisplay.classList.remove("red");
            currentMoveDisplay.classList.add("blue");
            currentMove = 'o';
        }
        else {
            e.target.innerHTML = "o";
            e.target.classList.add("blue");
            currentMoveDisplay.innerHTML = "X";
            currentMoveDisplay.classList.remove("blue");
            currentMoveDisplay.classList.add("red");
            currentMove = 'x';
        }
    }
})