import ShapeModel from './ShapeModel';

class CardModel {
  constructor( shapeDirection, shapeLength, deckType ) {
    this.shapeDirection = shapeDirection;
    this.shapeLength = shapeLength;
    this.deckType = deckType;
    this.shape = this.generateShape();
  }

  generateShape() {
    return new ShapeModel( this.shapeDirection, this.shapeLength );
  }

  getShape() {
    return this.shape;
  }

  getShapeLength() {
    return this.shapeLength;
  }

  getShapeDirection() {
    return this.shapeDirection;
  }

  getDeckType() {
    return this.deckType;
  }
}

export default CardModel;
