import React from 'react';
import './index.css';
import { calculateWinner } from './utils.js';
import { Board } from './Board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            stepNumber: 0,
            isAscending:true,
        };
    }

    handleSquareClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                lastClickedSquare:i,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }
    render() {
        const history = this.state.history;
        var current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let moves = history.map((step, move) => {
            const r=1+Math.floor(step.lastClickedSquare/3);
            const c=1+step.lastClickedSquare%3;
            const desc = move ? `Go to move # ${move} (${r},${c})`:
                'Go to Game start';
            
            return (
                <li key={move} className={move===this.state.stepNumber?'list-item-selected':''}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        if(!this.state.isAscending) moves.reverse();
        let status;
        if (winner) {
            status = 'winner is : ' + current.squares[winner[0]] + '; Win Squares are ('+winner[0]+','+winner[1]+','+winner[2]+')';
            
        }
        else {
            if(current.squares.includes(null)){
                status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
            }
            else{
                status=`Game is a Tie/Draw`;
            }
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleSquareClick(i)}
                        winSquares={winner}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={()=>this.handleSorting()}>{this.state.isAscending?'Ascending':'Descending'}</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
    handleSorting(){
        this.setState({
            isAscending:!this.state.isAscending,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

}