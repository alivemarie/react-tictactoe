import React, {useState} from 'react';
import '../index.css'
import Board from './board';
import Modal from './modal';

export default function Game() {

    const [modalActive, setModalActive] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');

    return (
        <div className='game'>
            <Board firstName={firstName} secondName={secondName}/>
            <Modal active={modalActive} setActive={setModalActive}
                   setFirstName={setFirstName} setSecondName={setSecondName}/>
        </div>
    );
}
