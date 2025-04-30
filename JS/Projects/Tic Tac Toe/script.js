let buttons = document.querySelectorAll(".box");

let resetBtn = document.querySelector("#reset");

let newGameButton = document.querySelector("#new-game");

let msgContainer = document.querySelector(".msg");

let msgPara = document.querySelector("#winner-para");

let gameContainer = document.querySelector(".game");

let turnO = true; //$ First Time turn of Player 1 with O

let count = 0; //$ Track the number of moves.

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//- Function to Reset Game
function resetGame() {
    msgContainer.classList.add("hide");
    turnO = true;
    count = 0;
    buttons.forEach((button) => {
        button.disabled = false;
        button.innerText = "";
    });
}

//- Function to Show Game Winner
function showWinner(winner) {
    msgPara.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    buttons.forEach((button) => {
        button.disabled = true;
    });
}

function checkDraw() {
    if (count === 9) {
        msgPara.innerText = "The Game resulted in a Draw.";
        msgContainer.classList.remove("hide");
        count = 0;
    }
}

//- Function to Show Check Winner
function checkWinner() {
    for (let pattern of winningPatterns) {
        let pos1Val = buttons[pattern[0]].innerText;
        let pos2Val = buttons[pattern[1]].innerText;
        let pos3Val = buttons[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
}

//- Adding a Function on each button Click
buttons.forEach((button) => {
    button.addEventListener(
        "click",
        () => {
            if (turnO) {
                button.style.color = "#e15a97";
                button.innerText = "O";
                turnO = false;
            } else {
                button.style.color = "#4b2840";
                button.innerText = "X";
                turnO = true;
            }
            button.disabled = true;

            count++;

            if (!checkWinner()) {
                checkDraw();
            }
        },
        false
    );
});

//- Adding a Function when Reset Button is Click
resetBtn.addEventListener("click", resetGame);

//- Adding a Function when New Game Button is Click
newGameButton.addEventListener("click", resetGame);
