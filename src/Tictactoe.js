import React, { useState } from 'react';
import './App.css';

function Tictactoe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [playerScoreX, setPlayerScoreX] = useState(0);
    const [playerScoreO, setPlayerScoreO] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [gamesPlayed, setGamesPlayed] = useState(0);

    const checkWinner = () => {
        const winCombos = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];

        for (let i = 0; i < winCombos.length; i++) {
            const [a, b, c] = winCombos[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes(null)) {
            return 'draw';
        }

        return null;
    };

    const handleSquareClick = (index) => {
        if (gameOver || board[index] !== null) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const winner = checkWinner();
        if (winner) {
            setGameOver(true);
            setWinner(winner);
            if (winner === 'X') {
                setPlayerScoreX(playerScoreX + 1);
            } else if (winner === 'O') {
                setPlayerScoreO(playerScoreO + 1);
            }
            setGamesPlayed(gamesPlayed + 1);
            return;
        }

        setPlayer(player === 'X' ? 'O' : 'X');
    };

    const handleResetClick = () => {
        setBoard(Array(9).fill(null));
        setPlayer('X');
        setGameOver(false);
        setWinner(null);
    };

    const handleNewGameClick = () => {
        setPlayerScoreX(0);
        setPlayerScoreO(0);
        setGamesPlayed(0);
        handleResetClick();
    };

    return (
        <div className="app">
            <div className="board">
                {board.map((square, index) => (
                    <div
                        key={index}
                        className="square"
                        onClick={() => handleSquareClick(index)}
                    >
                        {square}
                    </div>
                ))}
            </div>
            {gameOver && (
                <div className="message">
                    {winner === 'draw' ? 'Draw' : `Player ${winner} wins`}
                </div>
            )}
            <div className="score">
                <div className="player">
                    <div className="name">Player X</div>
                    <div className="score">{playerScoreX}</div>
                </div>
                <div className="player">
                    <div className="name">Player O</div>
                    <div className="score">{playerScoreO}</div>
                </div>
            </div>
            <div className="controls">
                <button onClick={handleResetClick}>Reset Game</button>
                {gamesPlayed > 0 && (playerScoreX === 3 || playerScoreO === 3) && (
                    <div className="message">
                        {playerScoreX > playerScoreO ? 'Player X wins the game!' : 'Player O wins the game!'}
                        <button onClick={handleNewGameClick}>Start New Game</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tictactoe;