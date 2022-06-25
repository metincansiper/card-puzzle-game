import './Game.css';
import GameModel from '../model/GameModel';
import { useState } from 'react';
import GridRow from './GridRow';

function Game() {
  const [ gameModel, setGameModel ] = useState( new GameModel({}) );
  const [ boardData, setBoardData ] = useState( gameModel.cloneBoardData() );
  return (
    <div className="game">
      {
        boardData.map( rowData => {
          return (
            <GridRow rowData={rowData} />
          )
        } )
      }
    </div>
  );
}

export default Game;
