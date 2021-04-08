import React, {useState} from 'react';
import Board from "./board";
import Modal from "./modal";
import '../modal.css'

export default function Game() {

    const [modalActive, setModalActive] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');

    return (
        <div className="game">
            <div className="game-board">
                <Board firstName={firstName} secondName={secondName}/>
            </div>
            <Modal active={modalActive} setActive={setModalActive}
                   setFirstName={setFirstName} setSecondName={setSecondName}/>
        </div>
    );
}
