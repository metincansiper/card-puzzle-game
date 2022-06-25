import { CELL_STATUS } from './CellModel';
import ShapeModel from './ShapeModel';
import CardModel from './CardModel';
import { BOARD_INNER_WIDTH, BOARD_INNER_HEIGHT, BOARD_PADDING } from '../config';

class BoardModel {
  constructor(width = BOARD_INNER_WIDTH, height = BOARD_INNER_HEIGHT, padding = BOARD_PADDING) {
    this.height = height;
    this.width = width;
    this.padding = padding;
    this.boardData = this.generateBoardData();
  }

  getCellValue( i, j ) {
    return this.boardData[ i ][ j ];
  }

  getInnerWidth() {
    return this.width;
  }

  getInnerHeight() {
    return this.height;
  }

  getPadding() {
    return this.padding;
  }

  getOuterWidth() {
    return this.width + 2 * this.padding;
  }

  getOuterHeight() {
    return this.height + 2 * this.padding;
  }

  generateBoardData() {
    const boardData = [];
    const extendedWidth = this.getOuterWidth();
    const extendedHeight = this.getOuterHeight();
    for ( let i = 0; i < extendedHeight; i++ ) {
      const row = [];
      const isRowOutside = i < this.padding || i >= this.height + this.padding;

      for ( let j = 0; j < extendedWidth; j++ ) {
        const isColumnOutside = j < this.padding || j >= this.width + this.padding;
        const isCellOutside = isRowOutside || isColumnOutside;
        const cellStatus = isCellOutside ? CELL_STATUS.OUTSIDE : CELL_STATUS.EMPTY;

        row.push( cellStatus );
      }

      boardData.push( row );
    }

    return boardData;
  }

  cloneBoardData() {
    const clonedData = this.boardData.map( row => row.slice( 0 ) );
    return clonedData;
  }

  getBoardData() {
    return this.boardData;
  }

  getIntersections( cellRowIndex, cellColIndex, shape ) {
    const coords = shape.getAbsoluteCoords( cellRowIndex, cellColIndex );
    const intersections = [];

    for ( coord of coords ) {
      const rowIndex = coord[ 0 ];
      const colIndex = coord[ 1 ];

      if ( !this.checkCellAvailability( rowIndex, colIndex ) ) {
        intersections.push( [ rowIndex, colIndex ] );
      }
    }

    return intersections;
  }

  // markIntersections( cellRowIndex, cellColIndex, shape ) {
  //   const intersections = this.getIntersections( cellRowIndex, cellColIndex, shape );
  //   intersections.forEach( intersection => this.boardData[ intersection[ 0 ] ][ intersection[ 1 ] ] = CELL_STATUS.INTERSECTION );
  // }

  locateShape( cellRowIndex, cellColIndex, shape, fillVal ) {
    let noIntersection = true;
    const coords = shape.getAbsoluteCoords( cellRowIndex, cellColIndex );

    for ( const coord of coords ) {
      const rowIndex = coord[ 0 ];
      const colIndex = coord[ 1 ];

      if ( !this.checkCellAvailability( rowIndex, colIndex ) ) {
        noIntersection = false;
        this.boardData[ rowIndex ][ colIndex ] = CELL_STATUS.INTERSECTION;
      }
      else {
        this.boardData[ rowIndex ][ colIndex ] = fillVal;
      }
    }

    return noIntersection;
  }

  locateShapeFromCard( cellRowIndex, cellColIndex, card ) {
    const fillVal = card.getDeckType();
    const shape = card.getShape();

    return this.locateShape( cellRowIndex, cellColIndex, shape, fillVal );
  }

  checkCellAvailability( rowIndex, colIndex ) {
    return this.boardData[ rowIndex ][ colIndex ] == CELL_STATUS.EMPTY;
  }
}

export default BoardModel;
