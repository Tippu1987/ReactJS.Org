import React from 'react';
import './index.css';
import Square from './Square.jsx';

export function Board(props) {
    const boardsize=3;
    let squares=[];
    
    for (let index = 0; index < boardsize; index++) {
        let rows=[];
        for(let j=0;j<3;j++){
            rows.push(renderSquare(index*boardsize + j));
        }
        squares.push(<div key={index} className="board-row">{rows}</div>)
    }
    function renderSquare(i) {
        return (<Square
            key={i}
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
            highlight={props.winSquares && props.winSquares.includes(i)}
        />);
    }
    return (
       <div>{squares}</div>
    );

}