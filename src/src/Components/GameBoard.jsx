export default function GameBoard({ onHandleClick, board }) {
    return(
        <ol id="game-board">
            {board.map((row, rowIndex) => 
                <ol key={rowIndex}>{row.map((playerSymbol, colIndex)=> <li key={colIndex}><button onClick={() =>onHandleClick(rowIndex, colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button></li>)}
                </ol>)}
        </ol>
    );
}