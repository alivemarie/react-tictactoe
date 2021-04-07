import React, {useEffect, useState} from 'react';
import Square from "./square";

export default function Board() {
    let status = '';
    const [firstPlayerScore, setFirstPlayerScore] = useState(
        {
            name: 'Vasya',
            score: 0,
            plays: 'X'
        });
    const [secondPlayerScore, setSecondPlayerScore] = useState(
        {
            name: 'Anna',
            score: 0,
            plays: 'O'
        });


    const [boardState, setBoardState] = useState(
        {
            squares: Array(9).fill(''),
            xIsNext: true
        })

    function handleClick(i) {
        const squares = boardState.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = boardState.xIsNext ? 'X' : 'O';
        setBoardState(
            {
                squares: squares,
                xIsNext: !boardState.xIsNext
            });
    }

    function renderSquare(i) {
        return (
            <Square
                value={boardState.squares[i]}
                onClick={() => handleClick(i)}
            />
            )
    }

    function clearBoard() {
            setBoardState(
                {
                    squares: Array(9).fill(''),
                    xIsNext: boardState.xIsNext
                });
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    function defineDraw(squares) {
        return !squares.includes('');
    }

    let winner = calculateWinner(boardState.squares);

    useEffect(() => {
        console.log(winner);
        if (winner) {
            status = 'Выиграл ' + winner;
        }
        if (winner === firstPlayerScore.plays) {
                setFirstPlayerScore(prev => {
                    return {
                        ...prev,
                        score: prev.score + 1
                    }
                });
            setTimeout(clearBoard, 2000)
        } else if (winner === secondPlayerScore.plays) {
            setSecondPlayerScore(prev => {
                return {
                        ...prev,
                        score: prev.score + 1
                    }
            });
            setTimeout(clearBoard, 2000)
        }
    }, [winner]);



    if ((defineDraw(boardState.squares)) && !winner) {
        status = 'Ничья!';
        setTimeout(clearBoard, 2000)
    }

    return (
            <div>
                <div>{status}</div>
                <button onClick={clearBoard}>Play again</button>
                    <div className="board-row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                    </div>
                    <div className="board-row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                    </div>
                    <div className="board-row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                    </div>
                <ol>
                               <li>Score</li>
                               <li>{firstPlayerScore.name}: {firstPlayerScore.score}</li>
                               <li>{secondPlayerScore.name}: {secondPlayerScore.score}</li>
                </ol>
            </div>

    );

}
