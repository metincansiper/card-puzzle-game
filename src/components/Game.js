import './Game.css';
import GameModel from '../model/GameModel';
import { useState, useEffect } from 'react';
import GridContainer from './GridContainer';
import DecksContainer from './DecksContainer';
import Score from './Score';

function Game() {
  const [ gameModel, setGameModel ] = useState( new GameModel({}) );
  const [ boardData, setBoardData ] = useState( gameModel.cloneBoardData() );
  const [ decks, setDecks ] = useState( gameModel.getDecks() );
  const [ selectedDeckType, setSelectedDeckType ] = useState( gameModel.getSelectedDeckType() );
  const [ score, setScore ] = useState( gameModel.getScore() );

  useEffect( () => {
    gameModel.on( 'boardUpdate', () => {
      setBoardData( gameModel.cloneBoardData() );
    } );

    gameModel.on( 'scoreUpdate', () => {
      setScore( gameModel.getScore() );
    } );

    gameModel.on( 'selectedDeckUpdate', () => {
      setSelectedDeckType( gameModel.getSelectedDeckType() );
    } );
  }, [ gameModel ] );

  const onCellClick = ( rowIndex, colIndex ) => {
    if ( gameModel.getIsGameOver() ) {
      console.log( 'game is over' );
      return;
    }
    if ( !gameModel.checkCellAvailability( rowIndex, colIndex ) ) {
      console.log( 'cell is not available' );
      return;
    }
    gameModel.locateTopFromSelectedDeck( rowIndex, colIndex );
    const selectedDeck = gameModel.getSelectedDeck();
    if ( selectedDeck.isEmpty() ) {
      gameModel.selectNonEmptyDeck();
    }
  };

  const selectDeck = ( deckType ) => {
    gameModel.selectDeck( deckType );
    setSelectedDeckType( deckType );
  };

  return (
    <div className="game">
      <GridContainer boardData={ boardData } onCellClick={ onCellClick } />
      <div className="leftBox">
        <Score score={ score } />
        <DecksContainer decks={ decks } selectedDeckType={ selectedDeckType } selectDeck={ selectDeck } />
      </div>
    </div>
  );
}

export default Game;
