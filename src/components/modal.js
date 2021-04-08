import React from 'react';
import "../modal.css"

export default function Modal(props) {
    return (
        <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div className={props.active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                <form action="">
                    <h1>Введите имена игроков:</h1>
                    <input onChange={evt =>  { props.setFirstName(evt.target.value)}} type="text" name="" id=""/>
                    <input onChange={evt =>  { props.setSecondName(evt.target.value)}} type="text" name="" id=""/>
                    <div className='close-btn' onClick={() =>  props.setActive(false)}>X</div>
                </form>
            </div>
        </div>

    )
}
