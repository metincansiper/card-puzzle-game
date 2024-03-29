import { SHAPE_DIRECTIONS } from './enum/Shape';

class ShapeModel {
  constructor( shapeDirection, shapeLength ) {
    this.shapeDirection = shapeDirection;
    this.shapeLength = shapeLength;
    this.relativeCoords = this.calcRelativeCoords();
  }

  calcRelativeCoords() {
    const coords = [];

    for ( let i = 0; i < this.shapeLength; i++ ) {
      if ( this.shapeDirection == SHAPE_DIRECTIONS.LEFT ) {
        coords.push( [ 0, -i ] );
      }
      else if ( this.shapeDirection == SHAPE_DIRECTIONS.RIGHT ) {
        coords.push( [ 0, i ] );
      }
      else if ( this.shapeDirection == SHAPE_DIRECTIONS.UP ) {
        coords.push( [ -i, 0 ] );
      }
      else if ( this.shapeDirection == SHAPE_DIRECTIONS.DOWN ) {
        coords.push( [ i, 0 ] );
      }
    }

    return coords;
  }

  getRelativeCoords() {
    return this.relativeCoords;
  }

  getAbsoluteCoords( cellRowIndex, cellColIndex ) {
    return this.relativeCoords.map( relCoord => [ cellRowIndex + relCoord[ 0 ], cellColIndex + relCoord[ 1 ] ] );
  }

  getLength() {
    return this.shapeLength;
  }

  getDirection() {
    return this.shapeDirection;
  }
}

export default ShapeModel;
