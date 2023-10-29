const gameBoard = (function() {
    const board = document.querySelectorAll('.board');

    const arrayBoard = [
        '','','',
        '','','',
        '','',''
    ];

    board.forEach((board) => {
        board.addEventListener('click', () => {
            if(arrayBoard[board.id] != '') {
                return;
            }
            arrayBoard[board.id] = players.getPersonSign;
            playRound();
        });
    })
    function playRound() {
        update();
        getComputerChoice();
    }
    function update() {
        for(let i = 0; i <= arrayBoard.length - 1; i++){
            board[i].innerHTML = arrayBoard[i];
        }
    }
    function getComputerChoice() {
        const computerChoice = players.computerPlay();
        if(arrayBoard[computerChoice] != '') {
            getComputerChoice();
        } else {
            arrayBoard[computerChoice] = 'O';
            update();
        }
    }
})();

const players = (function() {
    function Player(sign) {
        this.sign = sign;
    }
    Player.prototype.getPlayerSign = () => {
    		return sign;
    }
    
    const person = new Player('X');
    const computer = new Player('O');
    
    const computerPlay = function() {
        return Math.floor(Math.random() * 9);
    }
    return {
        computerPlay: computerPlay,
        getPersonSign: person.getPlayerSign,
        //computerSign: computer.sign
    }
})();

