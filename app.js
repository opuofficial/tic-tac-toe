
const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;

const gameData = [
    '', '', '',
    '', '', '',
    '', '', ''
];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], 
    [6, 7, 8], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];


let boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('click', e => {
        if(!e.target.innerHTML) {
            let boxIndex = e.target.dataset.box;

            gameData[boxIndex] = currentPlayer;
            e.target.innerHTML = currentPlayer;

            let result = checkCombinations();

            if(result.gameOver) {
                let boxContainer = document.querySelector('.box__container');
                boxContainer.style.pointerEvents = 'none';

                displayResult();
                changeBackgroundColor(result.combination);
            } else {
                if(isDraw()) {
                    displayResult('draw');
                } else {
                    swapPlayer();
                }    
            }        
        }
    })
})


function checkCombinations() {
    for(let i=0; i < winningCombinations.length; i++) {
        let notEmpty = winningCombinations[i].every(item => gameData[item] != '');
        
        if(notEmpty) {
            let value1 = gameData[winningCombinations[i][0]];
            let value2 = gameData[winningCombinations[i][1]];
            let value3 = gameData[winningCombinations[i][2]];

            if(value1 == value2 && value2 == value3) {
                return {
                    gameOver: true,
                    combination: winningCombinations[i]
                }
            }
        }
    }

    return false;
}


function swapPlayer() {
    let activePlayer = document.querySelector('div.' + currentPlayer);
    activePlayer.classList.remove('active');

    currentPlayer = (currentPlayer == PLAYER_X) ? PLAYER_O : PLAYER_X;

    activePlayer = document.querySelector('div.' + currentPlayer);
    activePlayer.classList.add('active');
}


function displayResult(draw) {
    let resultDiv = document.querySelector('.result');
    resultDiv.style.display = 'block';

    let text = draw ? 'Game Draw!' : 'Player ' + currentPlayer + ' wins!';
    resultDiv.querySelector('h2').innerHTML = text;

    let resetBtn = resultDiv.querySelector('button');
    resetBtn.addEventListener('click', resetGame);
}


function changeBackgroundColor(combination) {
    combination.forEach(boxIndex => {
        boxes[boxIndex].style.background = '#d3d3d3';
    })
}


function isDraw() {
    return gameData.every(value => value != '');
}

function resetGame() {
    boxes.forEach(box => {
        box.innerHTML = '';
        box.style.background = 'inherit';
    })

    document.querySelector('.' + PLAYER_O).classList.remove('active');
    document.querySelector('.' + PLAYER_X).classList.add('active');

    document.querySelector('.result').style.display = 'none';
    document.querySelector('.box__container').style.pointerEvents = 'auto';

    gameData.fill('');
    currentPlayer = PLAYER_X;
}