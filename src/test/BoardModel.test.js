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

test('test locating left shape on board', () => {
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

test('test locating right shape on board', () => {
  const board = new BoardModel();
  const shapeLength = 3;
  const shapeDirection = SHAPE_DIRECTIONS.RIGHT;
  const deckType = DECK_TYPE.TYPE_1;
  const card = new CardModel( shapeDirection, shapeLength, deckType );
  const padding = board.getPadding();
  const innerWidth = board.getInnerWidth();
  const cellRowIndex = padding;
  const cellColIndex = padding + innerWidth - 2;
  const validLocation = board.locateShapeFromCard( cellRowIndex, cellColIndex, card );

  expect( validLocation ).toEqual( false );
  // console.log( board.getBoardData() )
  expect( board.getCellValue( padding, padding + innerWidth - 2 ) ).toEqual( deckType );
  expect( board.getCellValue( padding, padding + innerWidth - 1 ) ).toEqual( deckType );
  expect( board.getCellValue( padding, padding + innerWidth ) ).toEqual( CELL_STATUS.INTERSECTION );
});

test('test locating top shape on board', () => {
  const board = new BoardModel();
  const shapeLength = 3;
  const shapeDirection = SHAPE_DIRECTIONS.UP;
  const deckType = DECK_TYPE.TYPE_1;
  const card = new CardModel( shapeDirection, shapeLength, deckType );
  const padding = board.getPadding();
  const cellRowIndex = padding + 1;
  const cellColIndex = padding;
  const validLocation = board.locateShapeFromCard( cellRowIndex, cellColIndex, card );

  expect( validLocation ).toEqual( false );
  expect( board.getCellValue( padding - 1, padding ) ).toEqual( CELL_STATUS.INTERSECTION );
  expect( board.getCellValue( padding, padding ) ).toEqual( deckType );
  expect( board.getCellValue( padding + 1, padding ) ).toEqual( deckType );
});

test('test locating bottom shape on board', () => {
  const board = new BoardModel();
  const shapeLength = 3;
  const shapeDirection = SHAPE_DIRECTIONS.DOWN;
  const deckType = DECK_TYPE.TYPE_1;
  const card = new CardModel( shapeDirection, shapeLength, deckType );
  const innerHeight = board.getInnerHeight();
  const padding = board.getPadding();
  const cellRowIndex = padding + innerHeight - 2;
  const cellColIndex = padding;
  const validLocation = board.locateShapeFromCard( cellRowIndex, cellColIndex, card );

  expect( validLocation ).toEqual( false );
  expect( board.getCellValue( padding + innerHeight - 2, padding ) ).toEqual( deckType );
  expect( board.getCellValue( padding + innerHeight - 1, padding ) ).toEqual( deckType );
  expect( board.getCellValue( padding + innerHeight, padding ) ).toEqual( CELL_STATUS.INTERSECTION );
});

test('test locating bottom shape on board2', () => {
  const board = new BoardModel();
  const shapeLength = 4;
  const shapeDirection = SHAPE_DIRECTIONS.DOWN;
  const deckType = DECK_TYPE.TYPE_1;
  const card = new CardModel( shapeDirection, shapeLength, deckType );
  const innerHeight = board.getInnerHeight();
  const padding = board.getPadding();
  const cellRowIndex = padding + innerHeight - 1;
  const cellColIndex = padding;
  const validLocation = board.locateShapeFromCard( cellRowIndex, cellColIndex, card );

  expect( validLocation ).toEqual( false );
  expect( board.getCellValue( padding + innerHeight - 1, padding ) ).toEqual( deckType );
  expect( board.getCellValue( padding + innerHeight, padding ) ).toEqual( CELL_STATUS.INTERSECTION );
  expect( board.getCellValue( padding + innerHeight + 1, padding ) ).toEqual( CELL_STATUS.INTERSECTION );
});
