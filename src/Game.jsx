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
        };
    }

    handleSquareClick(i) {
        const history = this.state.history;
        var current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext
        });
    }
    render() {
        const history = this.state.history;
        var current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
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
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

}