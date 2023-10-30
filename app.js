const gameBoard = (() => {
    const board = document.querySelectorAll('.board');
    
    let gameRunning = true;

    const arrayBoard = [
        '','','',
        '','','',
        '','',''
    ];  
    board.forEach((board) => {
        board.addEventListener('click', () => {
            playRound(board);
        });
    })
    const playRound = (board) => {
        if (arrayBoard[board.id] != '') {
            return;
        } else if (gameRunning) {
        	arrayBoard[board.id] = players.getPersonSign();
        	checkForWin(arrayBoard);
       		updateDom();
       		getComputerChoice();
        }
    }
    const updateDom = () => {
        for (let i = 0; i <= arrayBoard.length - 1; i++){
            board[i].innerHTML = arrayBoard[i];
        }
    }
    const getComputerChoice = () => {
        const computerChoice = players.computerPlay();
        if (arrayBoard[computerChoice] != '') {
            getComputerChoice();
        } else if (gameRunning) {
            arrayBoard[computerChoice] = players.getComputerSign();
            updateDom();
            checkForWin(arrayBoard);
        }
    }
    const checkForWin = (arrayBoard) => {
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
                        console.log(board[i][j], 'win ROW');
                        gameOver();
                } //checks for columns
                else if (board[0][i] === board[1][i] && board[0][i] != ''
                    && board[1][i] === board[2][i] && board[1][i] != '') {
                        console.log(board[i][i], 'win COLUMN');
                        gameOver();
                }
            }
        } //checks for diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] != ''
            || board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] != '') {
                console.log(board[1][1], 'win DIAGONAL');
                gameOver();
        }
    }
    const gameOver = () => {
    	gameRunning = false;
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
    
    computer.computerPlay = () => {
        return Math.floor(Math.random() * 9);
    }
    return {
        computerPlay: computer.computerPlay,
        getPersonSign: person.getPlayerSign,
        getComputerSign: computer.getPlayerSign,
    }
})();

