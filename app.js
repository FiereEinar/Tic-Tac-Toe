const gameBoard = (() => {
    let gameRunning = true;
    let availableSpots = 9;

    const arrayBoard = [
        '','','',
        '','','',
        '','',''
    ];  
    const checkForWin = (arrayBoard) => {
    	availableSpots--;
        const board = [[],[],[]];
        //converts my 1d array into 2d array
        let m = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = arrayBoard[m]
                m++;
            }
        }
        //checks for rows
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === board[i][j+1] && board[i][j] != ''
                    && board[i][j+1] === board[i][j+2] && board[i][j+1] != '') {
                        weHaveAWinner(board[i][j]);
                        return;
                } //checks for columns
                else if (board[0][i] === board[1][i] && board[0][i] != ''
                    && board[1][i] === board[2][i] && board[1][i] != '') {
						weHaveAWinner(board[i][i]);
                        return;
                }
            }
        } //checks for diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] != ''
            || board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] != '') {
				weHaveAWinner(board[1][1]);
                return;
        }
        else if (availableSpots == 0) {
        	weHaveAWinner('tie');
        }
    }
    const weHaveAWinner = (winner) => {
    	let result;
    	if (winner == 'X') {
    		result = 'Player won!';
    	} else if (winner == 'O') {
    		result = 'Computer won!';
    	} else if (winner == 'tie') {
    		result = "It's a tie!";
    	}
    	displayController.updateWinnerDisplay(`${result}`)
    	gameRunning = false;
    }
    const restartBoardArray = () => {
    	for (let i = 0; i < arrayBoard.length; i++) {
    		arrayBoard[i] = '';
    	}
    	gameRunning = true;
    }
    const getBoardArray = () => {
    	return arrayBoard;
    }
    const getGameStatus = () => {
    	return gameRunning;
    }
    const restartAvailableSpots = () => {
    	availableSpots = 9;
    }
    return {
    	restartBoardArray: restartBoardArray,
    	getBoardArray: getBoardArray,
    	checkForWin: checkForWin,
    	getGameStatus: getGameStatus,
    	restartAvailableSpots: restartAvailableSpots,
    }
})();

const players = (() => {
    function Player(sign) {
        this.sign = sign;
        this.getPlayerSign = () => {
            return sign;
        }
    }
    const person = new Player('X');
    const computer = new Player('O');
    const arrayBoard = gameBoard.getBoardArray();
    
    computer.computerPlay = () => {
        return Math.floor(Math.random() * 9);
    }
    const getComputerChoice = () => {
    	let gameRunning = gameBoard.getGameStatus();
        const computerChoice = computer.computerPlay();
        if (arrayBoard[computerChoice] != '') {
            getComputerChoice();
        } else if (gameRunning) {
            arrayBoard[computerChoice] = computer.getPlayerSign();
            gameBoard.checkForWin(arrayBoard);
            displayController.updateDom();
        }
    }
    return {
        getComputerChoice: getComputerChoice,
        getPersonSign: person.getPlayerSign,
        getComputerSign: computer.getPlayerSign,
    }
})();

const displayController = (() => {
	const restartButton = document.querySelector('.restart');
	const winnerDisplay = document.querySelector('.winner');
	const board = document.querySelectorAll('.board');
	const arrayBoard = gameBoard.getBoardArray();
	
	board.forEach((board) => {
        board.addEventListener('click', () => {
            playRound(board);
        });
    });
    const updateDom = () => {
    	for (let i = 0; i <= arrayBoard.length - 1; i++) {
    		board[i].innerHTML = arrayBoard[i];
    	}
    }
    const playRound = (board) => {
    	let gameRunning = gameBoard.getGameStatus();
        if (arrayBoard[board.id] != '') {
            return;
        } else if (gameRunning) {
        	arrayBoard[board.id] = players.getPersonSign();
        	gameBoard.checkForWin(arrayBoard);
       		updateDom();
       		players.getComputerChoice();
        }
    }
	const restart = () => {
		gameBoard.restartBoardArray();
		gameBoard.restartAvailableSpots();
		updateDom();
		updateWinnerDisplay('');
	}
	const updateWinnerDisplay = (winner) => {
		winnerDisplay.innerHTML = winner
	}
	restartButton.addEventListener('click', restart);
	return {
		restart: restart,
		updateWinnerDisplay: updateWinnerDisplay,
		updateDom: updateDom,
	}
})();