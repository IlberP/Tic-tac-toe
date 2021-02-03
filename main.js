//create the gameboard, players, player turn logic and restart button 
//need to add ai gameplay in to make buttons functional

const gameBoard = (() => {
    const Players = (name, sign, ai, turn) => {
        return{name, sign, ai, turn}
    }

    const playerOne = Players('player 1', 'X', false, true)
    const playerTwo = Players('player 2', 'O', false, false)
    //winning combinations
    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let board = []
    let turns = 0
    let winner = null;
    let winRow = []

    const playerChoice = (function(){
        const grid = document.querySelectorAll('.grid');
        grid.forEach(grid => {
            grid.addEventListener('click', e=> {
                if(playerOne.turn == true && gameBoard.winner == null && event.target.textContent == ''){
                    board[e.target.id] = playerOne.sign;
                    grid.textContent = playerOne.sign;
                    grid.style.color = 'red'
                    playerOne.turn = false;
                    playerTwo.turn = true;
                }else if(playerTwo.turn == true && gameBoard.winner == null && event.target.textContent == ''){
                    board[e.target.id] = playerTwo.sign;
                    grid.textContent = playerTwo.sign;
                    grid.style.color = 'blue';
                    playerOne.turn = true;
                    playerTwo.turn = false;
                }else {
                    return;
                }
                const restart = document.querySelectorAll('#restart');
                restart.forEach(restart => {
                    restart.addEventListener('click', function(){
                        grid.textContent = ''
                        gameBoard.winner = null;
                        gameBoard.winRow = undefined;
                        turns = 0
                        playerOne.turn = true;
                        playerTwo.turn = false;
                        board.splice(0, board.length)
                    })
                })
                checkWinner()
            })
        })
        return {grid}
    })()
    checkWinner = () => {
        turns++
        // separates the X and O arrays into their own arrays to match up with the possible winning combinations
        let playerX = board.reduce((a,e,i) =>
        (e === playerOne.sign) ? a.concat(i):a, [])
        let playerO = board.reduce((a,e,i) =>
        (e === playerTwo.sign) ? a.concat(i): a, [])
        for(let [index, combo]of win.entries()){
            if(combo.every(elem => playerX.indexOf(elem) > -1)){
                gameBoard.winner = 'player 1'
                gameBoard.winRow = combo
            }else if(combo.every(elem => playerO.indexOf(elem) > -1)){
                gameBoard.winner = 'player 2'
                gameBoard.winRow = combo
            }else if(gameBoard.winner == null && gameBoard.winner == undefined && turns == 9){
                gameBoard.winner = 'tie'
                gameBoard.winner = combo
            }
        }
        winDisplay()
        return winRow
    }
    return {checkWinner, playerChoice, board, winRow}
})()
//alerts the screen of the winning player
const displayScreen = (() => {
    winDisplay = () => {
        winComb = () => {

        }
        if(gameBoard.winner === 'player 1'){
            alert('X wins');
            winComb()
        }else if(gameBoard.winner === 'player 2'){
            alert('O wins!')
            winComb()
        } else if(gameBoard.winner === 'tie'){
            alert('Tie game!')
            
        } else{
            return;
        }
    }
    return {winDisplay}
})()