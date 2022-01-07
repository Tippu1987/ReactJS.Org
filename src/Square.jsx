import React from 'react';
import './index.css';

export default function Square(props) {
    const classname='square '+(props.highlight?'highlight':'');
    return (
        <button 
            onClick={props.onClick} className={classname}>
            {props.value}
        </button>
    );
}