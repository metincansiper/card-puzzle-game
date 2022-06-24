import DeckModel, { DECK_TYPE } from './DeckModel';

export const GAME_STATUS = {
  ON: 0,
  LOST: 1,
  WON: 2
};

class GameModel {
  constructor( opts ) {
    const {
      minShapeLength,
      maxShapeLength,
      defaultDeckType = DECK_TYPE.TYPE_1,
      boardWidth,
      boardHeight,
      boardPadding
    } = opts;

    this.minShapeLength = minShapeLength;
    this.maxShapeLength = maxShapeLength;
    this.typeToDeck = generateTypeToDeck();
    this.selectedDeckType = defaultDeckType;

    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.boardPadding = boardPadding;
    this.board = generateBoard();

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
    setGameStatus( GAME_STATUS.WON );
  }

  looseGame() {
    setGameStatus( GAME_STATUS.LOST );
  }

  getIsGameOver() {
    return this.gameStatus != GAME_STATUS.WON;
  }

  getTypeToDeck() {
    return this.typeToDeck;
  }

  generateBoard() {
    return new BoardModel( boardWidth, boardHeight, boardPadding );
  }

  generateTypeToDeck() {
    const deckTypes = Object.values( DECK_TYPE );
    const typeToDeck = {};

    deckTypes.forEach( deckType => {
      typeToDeck[ deckType ] = generateDeck( deckType );
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
    this.selectedDeckType = deckTypes.find( deckType => !isEmpty( getDeck( deckType ) ) );
  }

  getSelectedDeck() {
    return getDeck( selectedDeckType );
  }

  popTopFromSelectedDeck() {
    const selectDeck = getDeck( selectedDeckType );
    return selectDeck.popTopCard();
  }

  getTopFromSelectedDeck() {
    const selectDeck = getDeck( selectedDeckType );
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
    const card = popTopFromSelectedDeck();
    const noIntersection = board.locateShapeFromCard( cellRowIndex, cellColIndex, card );

    if ( noIntersection ) {
      const incrementBy = card.getShapeLength();
      incrementScore( incrementBy );
      const won = checkWin();
      if ( won ) {
        winGame();
      }
    }
    else {
      looseGame();
    }

    return noIntersection;
  }
}

export default GameModel;
