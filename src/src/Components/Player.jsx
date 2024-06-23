import { useState } from "react";

export default function Player({name, playerSymbol, isActive, onNameChange}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function changePlayerName(event){
        setPlayerName(event.target.value);
        if(isEditing){
            onNameChange(playerSymbol, playerName);
        }
    }

    function editPlayerName(){
        setIsEditing((isEditing) => !isEditing);   
    }

    let playerNameEdit = isEditing? <input type="text" value={playerName} onChange={changePlayerName}/> : <span className="player-name">{playerName}</span>;
    return(
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {playerNameEdit}
            <span className="player-symbol">{playerSymbol}</span>
          </span>
         <button onClick={editPlayerName}>{isEditing? 'Save': 'Edit'}</button>
        </li>
    );
}