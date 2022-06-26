import './Game.css';
import GameModel from '../model/GameModel';
import { useState, useEffect } from 'react';
import GridContainer from './GridContainer';
import DecksContainer from './DecksContainer';
import Score from './Score';
import Card from './Card';
import Modal from 'react-modal';

function Game() {
  const [ gameModel, setGameModel ] = useState( new GameModel({}) );
  const [ boardData, setBoardData ] = useState( gameModel.cloneBoardData() );
  const [ decks, setDecks ] = useState( gameModel.getDecks() );
  const [ selectedDeckType, setSelectedDeckType ] = useState( gameModel.getSelectedDeckType() );
  const [ score, setScore ] = useState( gameModel.getScore() );
  const [ gameIsOver, setGameIsOver ] = useState( gameModel.getIsGameOver() );
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
      setGameIsOver( gameIsOver );

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
    setGameIsOver( newGameModel.getIsGameOver() );
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

  const modalStyles = {
    content: {
      'top': '50%',
      'left': '50%',
      'right': 'auto',
      'bottom': 'auto',
      'marginRight': '-50%',
      'transform': 'translate(-50%, -50%)',
      'display': 'flex',
      'gap': '5px',
      'flex-direction': 'column'
    }
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
      <Modal isOpen={ modalIsOpen } contentLabel="Game Over" style={ modalStyles }>
          <div>
          {
            gameModel.getHasWonTheGame() ? 'Congrats, you won the game! ' : 'Game is over! '
          }
          Your score is { score }
          </div>
          <button className="restartGameButton" onClick={ restartGame }>restart</button>
      </Modal>
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
