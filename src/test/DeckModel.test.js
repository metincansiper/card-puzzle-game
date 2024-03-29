import DeckModel from '../model/DeckModel';
import { DECK_TYPE } from '../model/enum/Deck';
import { SHAPE_DIRECTIONS } from '../model/enum/Shape';
import _ from 'lodash';

test('test deck cards lengths', () => {
  const deckType = DECK_TYPE.TYPE_1;
  const deck = new DeckModel( deckType );
  const cards = deck.getCards();
  const expectedLength = deck.getMaxShapeLength() - deck.getMinShapeLength() + 1;
  const cardsByShapeDir = _.groupBy( cards, card => card.getShape().getDirection() );
  Object.values( SHAPE_DIRECTIONS ).forEach( dir => {
    expect( cardsByShapeDir[ dir ].length ).toEqual( expectedLength );
  } );
});
