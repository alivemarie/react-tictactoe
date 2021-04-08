import React from 'react';
import '../modal.css'

export default function Modal(props) {
    return (
        <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div className={props.active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                <form action=''>
                    <h1>Введите имена игроков:</h1>
                    <div className='row'>
                        <label className='label' htmlFor='player1'>Player-1</label>
                        <input onChange={evt =>  { props.setFirstName(evt.target.value)}}
                               type='text' name='player1' id='player1'/>
                    </div>
                    <div className='row'>
                        <label className='label' htmlFor='player2'>Player-2</label>
                        <input onChange={evt =>  { props.setSecondName(evt.target.value)}}
                               type='text' name='player2' id='player2'/>
                    </div>


                    <div className='close-btn' onClick={() =>  props.setActive(false)}>✓</div>
                </form>
            </div>
        </div>

    )
}
