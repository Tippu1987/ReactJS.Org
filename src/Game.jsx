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
            row:null,
            col:null,
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
        const moves = history.map((step, move) => {
            const r=1+Math.floor(step.lastClickedSquare/3);
            const c=1+step.lastClickedSquare%3;
            const desc = move ? `Go to move # ${move} (${r},${c})`:
                'Go to Game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'winner is : ' + winner;
        }
        else {
            status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleSquareClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    }

}