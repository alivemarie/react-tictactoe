// import React, {useEffect, useState} from 'react';

// export default function Score(props) {

    // const [firstPlayerScore, setFirstPlayerScore] = useState(
    //     {
    //         name: 'Vasya',
    //         score: 0,
    //         plays: 'X'
    //     });
    // const [secondPlayerScore, setSecondPlayerScore] = useState(
    //     {
    //         name: 'Anna',
    //         score: 0,
    //         plays: 'O'
    //     });
//
//     useEffect(() => {
//         if (props.winner) {
//             console.log(`выиграл ${props.winner}`)
//             if (props.winner === firstPlayerScore.plays) {
//                 setFirstPlayerScore(prev => {
//                     return {
//                         ...prev,
//                         score: prev.score + 1
//                     }
//                 });
//                 console.log(firstPlayerScore);
//             } else {
//                 setSecondPlayerScore(prev => {
//                     return {
//                         ...prev,
//                         score: prev.score + 1
//                     }
//                 });
//             }
//         }
//     }, [props.round]);
//
//
//     return (
//         <ol>
//             <li>Score</li>
//             <li>{firstPlayerScore.name}: {firstPlayerScore.score}</li>
//             <li>{secondPlayerScore.name}: {secondPlayerScore.score}</li>
//         </ol>
//     )
//
// }
