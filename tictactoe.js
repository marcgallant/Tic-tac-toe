"use strict";

const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];

const endMessage = document.createElement('h2');
endMessage.style.marginTop = '30px';
endMessage.style.textAlign='center';
board.after(endMessage);

endMessage.textContent= `${currentPlayer}'s turn!`;

let side = 3;
function checkRows(currentPlayer) {
    for (let i = 0; i < side; i++) {
        let j = 0;

        for (; j < side; j++) {
            if (squares[i * side + j].textContent !== currentPlayer)
                break;
        }
        if (j === side)
            return true;
    }
    return false;
}

function checkColumns(currentPlayer) {
    for (let j = 0; j < side; j++) {
        let i = 0;

        for (; i < side; i++) {
            if (squares[i * side + j].textContent !== currentPlayer)
                break;
        }
        if (i === side)
            return true;
    }
    return false;
}

function checkDiagonals(currentPlayer) {
    let i = 0;
    for (; i < side; i++) {
        if (squares[i * side + i].textContent !== currentPlayer)
            break;
    }
    if (i === side)
        return true;

	i = 0;
    for (; i < side; i++) {
        if (squares[i * side + side - 1 - i].textContent !== currentPlayer)
            break;
    }
    return i === side;
}

function checkWin(currentPlayer) {
	return checkRows(currentPlayer) || checkColumns(currentPlayer) || checkDiagonals(currentPlayer);
}

function checkTie(){
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].textContent === '')
            return false;
    }
    return true;
}

for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        if(squares[i].textContent !== '')
            return;

        squares[i].textContent = currentPlayer;

        if(checkWin(currentPlayer))
            endMessage.textContent=`Game over! ${currentPlayer} wins!`;
        else if(checkTie())
            endMessage.textContent= `Game is tied!`;
        else {
			currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
			endMessage.textContent= `${currentPlayer}'s turn!`;
		}
    })   
}

function restartButton() {
	for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }
	currentPlayer = players[0];
	endMessage.textContent= `${currentPlayer}'s turn!`;
}