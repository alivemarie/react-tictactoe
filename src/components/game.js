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
            <Modal active={modalActive} setActive={setModalActive}>
                <form action="">
                    <h1>Введите имена игроков:</h1>
                    <input onChange={evt =>  { setFirstName(evt.target.value)}} type="text" name="" id="" value={firstName}/>
                    <input onChange={evt =>  { setSecondName(evt.target.value)}} type="text" name="" id="" value={secondName}/>
                    <div className='close-btn' onClick={() =>  setModalActive(false)}>X</div>
                </form>
            </Modal>
        </div>
    );
}
