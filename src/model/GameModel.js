import DeckModel from './DeckModel';
import { DECK_TYPE } from './enum/Deck';
import BoardModel from './BoardModel';
import { MIN_SHAPE_LENGTH, MAX_SHAPE_LENGTH, BOARD_INNER_WIDTH, BOARD_INNER_HEIGHT, BOARD_PADDING } from '../config';
import EventEmitter from 'events';
import { GAME_STATUS } from './enum/Game';

class GameModel {
  constructor( opts ) {
    const {
      minShapeLength = MIN_SHAPE_LENGTH,
      maxShapeLength = MAX_SHAPE_LENGTH,
      defaultDeckType = DECK_TYPE.TYPE_1,
      boardWidth = BOARD_INNER_WIDTH,
      boardHeight = BOARD_INNER_HEIGHT,
      boardPadding = BOARD_PADDING
    } = opts;

    this.minShapeLength = minShapeLength;
    this.maxShapeLength = maxShapeLength;
    this.typeToDeck = this.generateTypeToDeck();
    this.selectedDeckType = defaultDeckType;

    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.boardPadding = boardPadding;
    this.board = this.generateBoard();

    this.gameStatus = GAME_STATUS.ON;
    this.score = 0;

    this.lastUsedCard = null;

    this.ee = new EventEmitter();
  }

  on( eventName, fcn ) {
    this.ee.on( eventName, fcn );
  }

  emit( eventName ) {
    this.ee.emit( eventName );
  }

  getGameStatus() {
    return this.gameStatus;
  }

  setGameStatus( gameStatus ) {
    this.gameStatus = gameStatus;
    this.emit( 'gameStatusUpdate' );
  }

  winGame() {
    this.setGameStatus( GAME_STATUS.WON );
  }

  looseGame() {
    this.setGameStatus( GAME_STATUS.LOST );
  }

  getIsGameOver() {
    return this.gameStatus != GAME_STATUS.ON;
  }

  getHasWonTheGame() {
    return this.gameStatus == GAME_STATUS.WON;
  }

  getHasLostTheGame() {
    return this.gameStatus == GAME_STATUS.LOST;
  }

  getTypeToDeck() {
    return this.typeToDeck;
  }

  getBoardInnerWidth() {
    return this.boardWidth;
  }

  getBoardInnerHeight() {
    return this.boardHeight;
  }

  getBoardPadding() {
    return this.boardPadding;
  }

  getBoardData() {
    return this.board.getBoardData();
  }

  generateBoard() {
    return new BoardModel( this.boardWidth, this.boardHeight, this.boardPadding );
  }

  generateTypeToDeck() {
    const deckTypes = Object.values( DECK_TYPE );
    const typeToDeck = {};

    deckTypes.forEach( deckType => {
      typeToDeck[ deckType ] = this.generateDeck( deckType );
    } );

    return typeToDeck;
  }

  getDeck( deckType ) {
    return deckType && this.typeToDeck[ deckType ];
  }

  getDecks() {
    return Object.values( this.typeToDeck );
  }

  generateDeck( deckType ) {
    return new DeckModel( deckType, this.minShapeLength, this.maxShapeLength );
  }

  selectDeck( deckType ) {
    const deck = this.getDeck( deckType );
    if ( deck == null || deck.isEmpty() ) {
      return;
    }
    
    this.selectedDeckType = deckType;
    this.emit( 'selectedDeckUpdate' );
  }

  selectNonEmptyDeck() {
    const deckTypes = Object.values( DECK_TYPE );
    this.selectDeck( deckTypes.find( deckType => !this.getDeck( deckType ).isEmpty() ) );
  }

  getSelectedDeck() {
    return this.getDeck( this.selectedDeckType );
  }

  getSelectedDeckType() {
    return this.selectedDeckType;
  }

  popTopFromSelectedDeck() {
    const selectedDeck = this.getDeck( this.selectedDeckType );
    const card = selectedDeck.popTopCard();
    this.setLastUsedCard( card );
    return card;
  }

  setLastUsedCard( card ) {
    this.lastUsedCard = card;
    this.emit( 'lastUsedCardUpdate' );
  }

  getLastUsedCard() {
    return this.lastUsedCard;
  }

  getTopFromSelectedDeck() {
    const selectedDeck = this.getDeck( this.selectedDeckType );
    return selectedDeck.getTopCard();
  }

  incrementScore( incrementBy ) {
    this.setScore( this.getScore() + incrementBy );
  }

  setScore( score ) {
    this.score = score;
    this.emit( 'scoreUpdate' );
  }

  getScore() {
    return this.score;
  }

  checkWin() {
    const decks = Object.values( this.typeToDeck );
    return decks.every( deck => deck.isEmpty() );
  }

  locateTopFromSelectedDeck( cellRowIndex, cellColIndex ) {
    const card = this.popTopFromSelectedDeck();
    const noIntersection = this.board.locateShapeFromCard( cellRowIndex, cellColIndex, card );

    if ( noIntersection ) {
      const incrementBy = card.getShapeLength();
      this.incrementScore( incrementBy );
      const won = this.checkWin();
      if ( won ) {
        this.winGame();
      }
    }
    else {
      this.looseGame();
    }

    this.emit( 'boardUpdate' );
    return noIntersection;
  }

  cloneBoardData() {
    return this.board.cloneBoardData();
  }

  checkCellAvailability( rowIndex, colIndex ) {
    return this.board.checkCellAvailability( rowIndex, colIndex );
  }
}

export default GameModel;
