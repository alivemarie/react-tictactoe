import React, {useEffect, useState} from 'react';
import Square from './square';

export default function Board(props) {
    let status = '';
    let crossed = false;
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
            crossed = false;
    }
    let lineStyle;

    function crossCells(line) {
        const styles = new Map();
        styles.set('012', {transform: 'rotate(90deg)', top: '-57px'})
        styles.set('345', {transform: 'rotate(90deg)'})
        styles.set('678', {transform: 'rotate(90deg)', top: '143px'})
        styles.set('036', {left: '90px'})
        styles.set('147', {left: '190px'})
        styles.set('258', {left: '290px'})
        styles.set('048', {transform: 'rotate(135deg)'})
        styles.set('246', {transform: 'rotate(45deg)'})

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
        return !squares.includes('');
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



    if ((defineDraw(boardState.squares)) && !winner) {
        status = 'Ничья!';
        setTimeout(clearBoard, 2000)
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
