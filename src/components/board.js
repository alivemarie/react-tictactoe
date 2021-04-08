import React, {useEffect, useState} from 'react';
import Square from './square';
import {styles} from "../utils";

export default function Board(props) {
    let status = '';
    let crossed = false;
    let lineStyle;

    const [firstPlayerScore, setFirstPlayerScore] = useState(
        {
            score: 0,
            plays: 'X'
        });
    const [secondPlayerScore, setSecondPlayerScore] = useState(
        {
            score: 0,
            plays: 'O'
        });

    const [boardState, setBoardState] = useState(
        {
            squares: Array(9).fill(''),
            xIsNext: true,
            movesLeft: 9
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
                xIsNext: !boardState.xIsNext,
                movesLeft: boardState.movesLeft - 1
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
                    xIsNext: boardState.xIsNext,
                    movesLeft: 9
                });
            crossed = false;
    }

    function crossCells(line) {
        crossed = true;
        lineStyle = styles.get(line.join(''));
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
                crossCells(lines[i]);
                return squares[a];
            }
        }
        return null;
    }

    function defineDraw(squares) {
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
            const nextMove = boardState.xIsNext ? 'X' : 'O';
            const power = {
                'X': 1,
                'O': -1,
                '': 0
            }

            if (((Math.abs(power[squares[a]] + power[squares[b]] + power[squares[c]] + power[nextMove]) === 3)
                && (boardState.movesLeft === 1))
                || ((Math.abs(power[squares[a]] + power[squares[b]] + power[squares[c]] + 2*power[nextMove]) === 3)
                    && (boardState.movesLeft > 1)))
            {
                return false;
            }

        }

        return boardState.movesLeft;
    }

    let winner = calculateWinner(boardState.squares);

    useEffect(() => {

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


    if (boardState.movesLeft < 4) {
        if ((defineDraw(boardState.squares)) && !winner) {
            status = 'Ничья!';
            setTimeout(clearBoard, 2000)
        }
    }


    return (
            <div className='flexbox'>
                <div className='game-info'>
                <ul className='scoreboard'>
                    <li>Score</li>
                    <li>{props.firstName ? props.firstName : 'Player-1'}: {firstPlayerScore.score}</li>
                    <li>{props.secondName ? props.secondName : 'Player-2'}: {secondPlayerScore.score}</li>
                </ul>
                <button className='btn-clear' onClick={clearBoard}>Clear board</button>
                <div className='status'>{status}</div>
                    <div className="moves_left">Осталось ходов : {boardState.movesLeft}</div>
                <div className={crossed ? 'cross active' : 'cross'} style={lineStyle}></div>
                </div>
                <div className='game-board'>
                    <div className='board-row'>
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                    </div>
                    <div className='board-row'>
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                    </div>
                    <div className='board-row'>
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                    </div>
                </div>
            </div>

    );

}
