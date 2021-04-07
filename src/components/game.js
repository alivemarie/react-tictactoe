import React from 'react';
import Board from "./board";

export default function Game() {

    // const firstPlayerScore = useRef(
    //     {
    //         score: 0,
    //         plays: 'X'
    //     });
    // const secondPlayerScore = useRef(
    //     {
    //         score: 0,
    //         plays: 'O'
    //     });
    //
    //
    // function onWin(winner) {
    //     console.log(`выиграл ${winner}`)
    //     if (winner === firstPlayerScore.current.plays) {
    //         firstPlayerScore.current.score++;
    //     } else {
    //         secondPlayerScore.current.score++;
    //     }
    //     const tempo = firstPlayerScore.current.plays;
    //     firstPlayerScore.current.plays = secondPlayerScore.current.plays;
    //     secondPlayerScore.current.plays = tempo;
    //
    // }




    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">

            </div>
        </div>
    );
}
