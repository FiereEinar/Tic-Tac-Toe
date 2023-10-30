const gameBoard = (function() {
    const board = document.querySelectorAll('.board');
    
    let gameOver = false;

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
    function playRound(board) {
        if(arrayBoard[board.id] != '') {
            return;
        }
        arrayBoard[board.id] = players.getPersonSign();
        checkForWin(arrayBoard);
        updateDom();
        getComputerChoice();
    }
    function updateDom() {
        for(let i = 0; i <= arrayBoard.length - 1; i++){
            board[i].innerHTML = arrayBoard[i];
        }
    }
    function getComputerChoice() {
        const computerChoice = players.computerPlay();
        if(arrayBoard[computerChoice] != '') {
            getComputerChoice();
        } else {
            arrayBoard[computerChoice] = players.getComputerSign();
            updateDom();
            checkForWin(arrayBoard);
        }
    }
    // checkForWin(arrayBoard);
    function checkForWin(arrayBoard) {
        const board = [
            [],
            [],
            []
        ];
        //converts my 1d array into 2d array
        let m = 0;
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                board[k][l] = arrayBoard[m]
                m++;
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === board[i][j+1] && board[i][j] != ''
                    && board[i][j+1] === board[i][j+2] && board[i][j+1] != '') {
                        console.log(board[i][j], 'win ROW');
                        return;
                } else if (board[0][i] === board[1][i] && board[0][i] != ''
                    && board[1][i] === board[2][i] && board[1][i] != '') {
                        console.log(board[i][i], 'win COLUMN');
                        return;
                }
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] != ''
            || board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] != '') {
                console.log(board[1][1], 'win DIAGONAL');
                return;
        }
    }
})();

const players = (function() {
    function Player(sign) {
        this.sign = sign;
        this.getPlayerSign = function() {
            return sign;
        }
    }
    
    const person = new Player('X');
    const computer = new Player('O');
    
    computer.computerPlay = function() {
        return Math.floor(Math.random() * 9);
    }
    return {
        computerPlay: computer.computerPlay,
        getPersonSign: person.getPlayerSign,
        getComputerSign: computer.getPlayerSign,
    }
})();

