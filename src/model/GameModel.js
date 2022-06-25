import DeckModel, { DECK_TYPE } from './DeckModel';
import BoardModel from './BoardModel';
import { MIN_SHAPE_LENGTH, MAX_SHAPE_LENGTH, BOARD_INNER_WIDTH, BOARD_INNER_HEIGHT, BOARD_PADDING } from '../config';

export const GAME_STATUS = {
  ON: 0,
  LOST: 1,
  WON: 2
};

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
  }

  getGameStatus() {
    return this.gameStatus;
  }

  setGameStatus( gameStatus ) {
    this.gameStatus = gameStatus;
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
    return this.typeToDeck[ deckType ];
  }

  generateDeck( deckType ) {
    return new DeckModel( deckType, this.minShapeLength, this.maxShapeLength );
  }

  selectDeck( deckType ) {
    this.selectedDeckType = deckType;
  }

  selectNonEmptyDeck() {
    const deckTypes = Object.values( DECK_TYPE );
    this.selectedDeckType = deckTypes.find( deckType => !this.getDeck( deckType ).isEmpty() );
  }

  getSelectedDeck() {
    return this.getDeck( this.selectedDeckType );
  }

  popTopFromSelectedDeck() {
    const selectDeck = this.getDeck( this.selectedDeckType );
    return selectDeck.popTopCard();
  }

  getTopFromSelectedDeck() {
    const selectDeck = this.getDeck( this.selectedDeckType );
    return selectDeck.getTopCard();
  }

  incrementScore( incrementBy ) {
    this.score += incrementBy;
  }

  checkWin() {
    const decks = Object.values( this.typeToDeck );
    return decks.some( deck => !deck.isEmpty() );
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

    return noIntersection;
  }

  cloneBoardData() {
    return this.board.cloneBoardData();
  }
}

export default GameModel;
