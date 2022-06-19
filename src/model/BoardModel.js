import { CELL_STATUS } from './CellModel';
import ShapeModel from './ShapeModel';
import CardModel from './CardModel';

class BoardModel {
  constructor(width = 8, height = 20, padding = 3) {
    this.height = height;
    this.width = width;
    this.padding = padding;
    this.boardData = generateBoardData();
  }

  generateBoardData() {
    const boardData = [];
    const extendedWidth = this.width + 2 * padding;
    const extendedHeight = this.height + 2 * padding;
    for ( let i = 0; i < extendedHeight; i++ ) {
      const row = [];
      const isRowOutside = i < padding || i >= this.width + padding;

      for ( let j = 0; j < extendedWidth; j++ ) {
        const isColumnOutside = j < padding || j >= this.width + padding;
        const isCellOutside = isRowOutside || isColumnOutside;
        const cellStatus = isCellOutside ? CELL_STATUS.OUTSIDE : CELL_STATUS.EMPTY;

        row.push( cellStatus );
      }

      boardData.push( row );
    }

    return boardData;
  }

  generateBoardData() {
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

  locateShape( cellRowIndex, cellColIndex, shape, fillVal ) {
    const noIntersection = true;
    const coords = shape.getAbsoluteCoords( cellRowIndex, cellColIndex );

    for ( coord of coords ) {
      const rowIndex = coord[ 0 ];
      const colIndex = coord[ 1 ];

      if ( !this.checkCellAvailability( rowIndex, colIndex ) ) {
        this.boardData[ rowIndex ][ colIndex ] = fillVal;
        noIntersection = false;
      }
    }

    return noIntersection;
  }

  locateShapeFromCard( cellRowIndex, cellColIndex, card ) {
    const fillVal = card.getDeckType();
    const shape = card.getShape();

    return locateShape( cellRowIndex, cellColIndex, shape, fillVal );
  }

  checkCellAvailability( rowIndex, colIndex ) {
    return this.boardData[ rowIndex ][ colIndex ] == 0
  }
}

export default BoardModel;
