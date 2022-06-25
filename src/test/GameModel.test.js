import GameModel from '../model/GameModel';
import { SHAPE_DIRECTIONS } from '../model/ShapeModel';
import _ from 'lodash';

test('test initial game status', () => {
  const game = new GameModel({});
  expect( game.getIsGameOver() ).toEqual( false );
});

test('test failure', () => {
  const game = new GameModel({});
  const padding = game.getBoardPadding();
  const innerWidth = game.getBoardInnerWidth();
  const innerHeight = game.getBoardInnerHeight();

  while ( true ) {
    const topCard = game.getTopFromSelectedDeck();
    const shape = topCard.getShape();
    const direction = shape.getDirection();
    const shapeLength = shape.getLength();

    if ( shapeLength == 4 && direction == SHAPE_DIRECTIONS.DOWN ) {
      let rowIndex = innerHeight + padding - 1;
      let colIndex = padding;

      game.locateTopFromSelectedDeck( rowIndex, colIndex );
      expect( game.getHasLostTheGame() ).toEqual( true );
      return;
    }
    else {
      game.popTopFromSelectedDeck();
    }
  }
});
