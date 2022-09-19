import { SHAPE_DIRECTIONS } from './enum/Shape';
import CardModel from './CardModel';
import { inplaceShuffle } from '../util';
import { MIN_SHAPE_LENGTH, MAX_SHAPE_LENGTH } from '../config';

class DeckModel {
  constructor( deckType, minShapeLength = MIN_SHAPE_LENGTH, maxShapeLength = MAX_SHAPE_LENGTH ) {
    this.deckType = deckType;
    this.minShapeLength = minShapeLength;
    this.maxShapeLength = maxShapeLength;
    this.cards = this.generateCards();
  }

  getMinShapeLength() {
    return this.minShapeLength;
  }

  getMaxShapeLength() {
    return this.maxShapeLength;
  }

  getDeckType() {
    return this.deckType;
  }

  generateCards(shuffle = true) {
    const cards = [];

    for ( let shapeLength = this.minShapeLength; shapeLength <= this.maxShapeLength; shapeLength++ ) {
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

  getSize() {
    return this.cards.length;
  }

  getTopCard() {
    return this.cards[ this.cards.length - 1 ];
  }

  popTopCard() {
    return this.cards.pop();
  }

  isEmpty() {
    return this.cards.length == 0;
  }
}


export default DeckModel;
