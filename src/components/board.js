import React, {useEffect, useState} from 'react';
import Square from './square';
import {STYLES, LINES, POWER} from "../const";

export default function Board(props) {
    let status = ''; // если ничья - то выведется статус "Ничья"
    let crossed = false; // статус активности красной линии
    let lineStyle; // стили для красной линии, будут определяться при победе - где показать линию

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

    function crossCells(line) { // матчит выигрышную линию с нужным положением красной линии
        crossed = true;
        lineStyle = STYLES.get(line.join(''));
    }

    function calculateWinner(squares) {
        for (let i = 0; i < LINES.length; i++) {
            const [a, b, c] = LINES[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                crossCells(LINES[i]);
                return squares[a];
            }
        }
        return null;
    }

    // подсчитывает возможен ли ещё выигрыш по модулю суммы всех клеток,
    // если Х = 1, O = -1, пустая клетка = 0
    function defineDraw(squares) {
        for (let i = 0; i < LINES.length; i++) {
            const [a, b, c] = LINES[i];
            const nextMove = boardState.xIsNext ? 'X' : 'O';

            if (((Math.abs(POWER[squares[a]] + POWER[squares[b]] + POWER[squares[c]] + POWER[nextMove]) === 3)
                && (boardState.movesLeft === 1))
                || ((Math.abs(POWER[squares[a]] + POWER[squares[b]] + POWER[squares[c]] + 2*POWER[nextMove]) === 3)
                    && (boardState.movesLeft > 1)))
            {
                return false;
            }
        }

        return boardState.movesLeft;
    }

    let winner = calculateWinner(boardState.squares);

    useEffect(() => { // следит, кто победил, меняет счёт игрока и очищает доску через 2 сек

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


    if (boardState.movesLeft < 4) { // макс число пустых клеток для ничьей - 3
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
                    <div className="moves_left">Осталось ходов : {boardState.movesLeft}</div>
                <div className='status'>{status}</div>
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
