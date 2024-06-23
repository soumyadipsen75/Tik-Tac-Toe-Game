import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Components/GameOver";
import { useState } from "react";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
  
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  let gameBoard = [...initialGameBoard.map(array=>[...array])];

  for(const turn of gameTurns){
      let {square, player} = turn;
      let {row, col} = square;
      gameBoard[row][col] = player;
  }

  let winner;
  let draw = gameTurns.length === 9 && !winner;
  
  let activePlayer = deriveActivePlayer(gameTurns);

  function restartGame(){
    setGameTurns([]);
  }

  for(const combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
      winner = players[firstSquareSymbol];
    }
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevsPlayers) => {
      return {...prevsPlayers,
      [symbol]: newName};
     });
  }

  function editActiveSquare(rowIndex, colIndex){
    setGameTurns((prevTurns) => {
      const playerSymbol = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: playerSymbol},...prevTurns];
      return updatedTurns;
      }) 
    }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name='Player 1' playerSymbol='X' isActive = {activePlayer === 'X'} onChange={handlePlayerNameChange}></Player>
        <Player name='Player 2' playerSymbol='O' isActive = {activePlayer === 'O'} onChange={handlePlayerNameChange}></Player>
      </ol>
      {(winner || draw) && <GameOver winner={winner} onRestart={restartGame}></GameOver>}
      <GameBoard onHandleClick={editActiveSquare} board={gameBoard} currActivePlayer={activePlayer} />    
    </div>
    <Log turns={gameTurns} />
  </main>;
}

export default App
