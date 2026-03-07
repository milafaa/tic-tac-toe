import { useState } from 'react'

type Player = "X" | "O";
type SquareValue = Player | null;

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick}: SquareProps) {
  return ( 
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
};

function Board({xIsNext, squares, onPlay}: BoardProps) {

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares))
      return;
    

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(square => square !== null);
    const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;
  
  return (
    <>
    <div className="status">{status}</div>
    <div className="board">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
  </div>
  </>
  );
   
}

export default function Game() {

  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((_squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
    <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
    </div>
  );
}

function calculateWinner(squares: SquareValue[]) : Player | null {
  const lines : [number, number, number][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares [a] === squares[c]) {
        return squares[a];
    }
  }

      return null;
}
