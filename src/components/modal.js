import React from 'react';
import "../modal.css"

export default function Modal(props) {
    return (
        <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div className={props.active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                {props.children} {/* переиспользуемый компонент */}
            </div>
        </div>

    )
}
