import React,{ Component} from 'react';
import Board from './Board';

export default class Game extends Component{
	constructor(props){
		super(props);
		this.state={
			xIsNext:true,
			stepNumber:0,
			history:[
			{squares:Array(9).fill(null)}
			]
		}
	}
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		});
  }
	handleClick(i){
		const history=this.state.history.slice(0,this.state.stepNumber+1);
		const current=history[history.length-1];
		const squares=current.squares.slice();
		const winner=calculateWinner(squares);
		if(winner || squares[i])
		{
			return;
		}
		squares[i]=this.state.xIsNext?"X":"O";
		this.setState({
			history:history.concat({
				squares:squares
			}),
			xIsNext:!this.state.xIsNext,
			stepNumber:history.length
		});
		
	}
	render(){
		const history=this.state.history;
		const current=history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const isFilled = areAllBoxesClicked(current.squares)
		const moves = history.map((step, move) => {
		const desc = move ?
        'Go to move #' + move :
        'Start the game';
		return (
        <li key={move}>
          <button className="btn" onClick={() => this.jumpTo(move)}>
		  {desc}
		  </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } 
	else if(!winner && isFilled ){
		status="Game drawn";
	}
	else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
		return(
		<div className="game">
		
			<div className="game-board">
				<h2>Tic-Tac-Toe</h2>
				<Board onClick={(i)=>this.handleClick(i)}
				squares={current.squares}/>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ul>{moves}</ul>
			</div>
		</div>
		);
	}
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function areAllBoxesClicked(squares) {
    // Declare variable to store number of clicked boxes.
    let count = 0

    // Iterate over all boxes
    squares.forEach(function (item) {
        // Check if box is clicked (not null)
        if (item !== null) {
            // If yes, increase the value of count by 1
            count++
        }
    })

    // Check if all boxes are clicked (filled)
    if (count === 9) {
        return true
    } else {
        return false
    }
}
