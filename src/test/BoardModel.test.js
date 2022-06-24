import BoardModel from '../model/BoardModel';
import CardModel from '../model/CardModel';
import { SHAPE_DIRECTIONS } from '../model/ShapeModel';
import { DECK_TYPE } from '../model/DeckModel';
import { CELL_STATUS } from '../model/CellModel';
import _ from 'lodash';

test('test board data', () => {
  const board = new BoardModel();
  const boardData = board.getBoardData();
  const outerHeight = board.getOuterHeight();
  const outerWidth = board.getOuterWidth();
  expect( boardData.length ).toEqual( outerHeight );
  expect( boardData[0].length ).toEqual( outerWidth );

  const padding = board.getPadding();

  for ( let i = 0; i < outerHeight; i++ ) {
    for ( let j = 0; j < outerWidth; j++ ) {
      if ( i < padding || i >= padding + board.getInnerHeight() || j < padding || j >= padding + board.getInnerWidth() ) {
        expect( board.getCellValue( i, j ) ).toEqual( CELL_STATUS.OUTSIDE );
      }
      else {
        expect( board.getCellValue( i, j ) ).toEqual( CELL_STATUS.EMPTY );
      }
    }
  }
});

test('test clone board data', () => {
  const board = new BoardModel();
  const clonedData = board.cloneBoardData();
  const originalData = board.getBoardData();

  expect( clonedData ).toEqual( originalData );
});

test('test locating shape on board', () => {
  const board = new BoardModel();
  const shapeLength = 3;
  const shapeDirection = SHAPE_DIRECTIONS.LEFT;
  const deckType = DECK_TYPE.TYPE_1;
  const card = new CardModel( shapeDirection, shapeLength, deckType );
  const padding = board.getPadding();
  const cellRowIndex = padding;
  const cellColIndex = padding + 1;
  const validLocation = board.locateShapeFromCard( cellRowIndex, cellColIndex, card );

  expect( validLocation ).toEqual( false );
  // console.log( board.getBoardData() )
  expect( board.getCellValue( padding, padding - 1 ) ).toEqual( CELL_STATUS.INTERSECTION );
  expect( board.getCellValue( padding, padding ) ).toEqual( deckType );
  expect( board.getCellValue( padding, padding + 1 ) ).toEqual( deckType );
});
