import './Game.css';
import GameModel from '../model/GameModel';
import { useState, useEffect } from 'react';
import GridContainer from './GridContainer';
import DecksContainer from './DecksContainer';
import Score from './Score';
import Card from './Card';
import GameOverModal from './GameOverModal';

function Game() {
  const [ gameModel, setGameModel ] = useState( new GameModel({}) );
  const [ boardData, setBoardData ] = useState( gameModel.cloneBoardData() );
  const [ decks, setDecks ] = useState( gameModel.getDecks() );
  const [ selectedDeckType, setSelectedDeckType ] = useState( gameModel.getSelectedDeckType() );
  const [ score, setScore ] = useState( gameModel.getScore() );
  const [ modalIsOpen, setIsModalOpen ] = useState( gameModel.getIsGameOver() );
  const [ lastUsedCard, setLastUsedCard ] = useState( gameModel.getLastUsedCard() );

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

    gameModel.on( 'lastUsedCardUpdate', () => {
      setLastUsedCard( gameModel.getLastUsedCard() );
    } );

    gameModel.on( 'gameStatusUpdate', () => {
      const gameIsOver = gameModel.getIsGameOver();

      if ( gameIsOver ) {
        openModal();
      }
    } );
  }, [ gameModel ] );

  const openModal = () => {
    setIsModalOpen( true );
  };

  const closeModal = () => {
    setIsModalOpen( false );
  };

  const restartGame = () => {
    const newGameModel = new GameModel( {} );
    setGameModel( newGameModel );
    setBoardData( newGameModel.cloneBoardData() );
    setDecks( newGameModel.getDecks() );
    setSelectedDeckType( newGameModel.getSelectedDeckType() );
    setScore( newGameModel.getScore() );
    setLastUsedCard( newGameModel.getLastUsedCard() );

    closeModal();
  };

  const onCellClick = ( rowIndex, colIndex ) => {
    if ( gameModel.getIsGameOver() || !gameModel.checkCellAvailability( rowIndex, colIndex ) ) {
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
    setSelectedDeckType( gameModel.getSelectedDeckType() );
  };

  const getLastUsedDeckType = () => {
    if ( lastUsedCard == null ) {
      return null;
    }

    return lastUsedCard.getDeckType();
  };

  const getLastUsedShapeDirection = () => {
    if ( lastUsedCard == null ) {
      return null;
    }

    return lastUsedCard.getShapeDirection();
  };

  const getLastUsedShapeLength = () => {
    if ( lastUsedCard == null ) {
      return null;
    }

    return lastUsedCard.getShapeLength();
  };

  return (
    <div>
      <GameOverModal isOpen={ modalIsOpen } restartGame={ restartGame } score={ score } hasWon= { gameModel.getHasWonTheGame() } />
      <div className="game">
        <GridContainer boardData={ boardData } onCellClick={ onCellClick } />
        <div className="leftBox">
          <Score score={ score } />
          <DecksContainer decks={ decks } selectedDeckType={ selectedDeckType } selectDeck={ selectDeck } />
          <Card deckType={ getLastUsedDeckType() } shapeDirection={ getLastUsedShapeDirection() } shapeLength={ getLastUsedShapeLength() } />
        </div>
      </div>
    </div>
  );
}

export default Game;
