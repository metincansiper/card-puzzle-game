// TODO: rename?
import { SHAPE_DIRECTIONS } from './ShapeModel';
import CardModel from './CardModel';
import { inplaceShuffle } from '../util';

export const DECK_TYPE = {
  TYPE_1: 1,
  TYPE_2: 2,
  TYPE_3: 3,
  TYPE_4: 4
};

class DeckModel() {
  constructor( deckType, minShapeLength = 2, maxShapeLength = 4 ) {
    this.deckType = deckType;
    this.minShapeLength = minShapeLength;
    this.maxShapeLength = maxShapeLength;
    this.cards = this.generateCards();
  }

  getDeckType() {
    return this.deckType;
  }

  generateCards(shuffle = true) {
    const cards = [];

    for ( let shapeLength = minShapeLength; shapeLength <= maxShapeLength; shapeLength++ ) {
      Object.values( SHAPE_DIRECTIONS ).forEach( shapeDirection => {
        cards.push( new CardModel( shapeDirection, shapeLength, this.deckType ) );
      } );
    }

    if ( shuffle ) {
      inplaceShuffle( cards );
    }

    return cards;
  }

  getCards() {
    return this.cards;
  }

  getTopCard() {
    return this.cards[ this.cards.length - 1 ];
  }

  popTopCard() {
    return this.cards.pop();
  }

  isEmpty() {
    return this.cards.length != 0;
  }
}


export default DeckModel;
