import ShapeModel from '../model/ShapeModel';
import { SHAPE_DIRECTIONS } from '../model/enum/Shape';

test('test left shape', () => {
  const shapeDirection = SHAPE_DIRECTIONS.LEFT;
  const shapeLength = 3;
  const shape = new ShapeModel( shapeDirection, shapeLength );
  const relCoords = shape.getRelativeCoords();
  const expectedCoords = [ [ 0, 0 ], [ 0, -1 ], [ 0, -2 ] ];
  // jest does not accept -0 and 0 as equal
  // as a temporary solution use JSON.stringify() here
  // see a similar discussion here (https://stackoverflow.com/questions/48405174/how-to-make-jest-not-distinguish-between-negative-zero-and-positive-zero)
  expect( JSON.stringify( relCoords ) ).toEqual( JSON.stringify( expectedCoords ) );
});

test('test right shape', () => {
  const shapeDirection = SHAPE_DIRECTIONS.RIGHT;
  const shapeLength = 3;
  const shape = new ShapeModel( shapeDirection, shapeLength );
  const relCoords = shape.getRelativeCoords();
  const expectedCoords = [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ];
  expect( relCoords ).toEqual( expectedCoords );
});

test('test top shape', () => {
  const shapeDirection = SHAPE_DIRECTIONS.UP;
  const shapeLength = 3;
  const shape = new ShapeModel( shapeDirection, shapeLength );
  const relCoords = shape.getRelativeCoords();
  const expectedCoords = [ [ 0, 0 ], [ -1, 0 ], [ -2, 0 ] ];
  expect( JSON.stringify( relCoords ) ).toEqual( JSON.stringify( expectedCoords ) );
});

test('test bottom shape', () => {
  const shapeDirection = SHAPE_DIRECTIONS.DOWN;
  const shapeLength = 3;
  const shape = new ShapeModel( shapeDirection, shapeLength );
  const relCoords = shape.getRelativeCoords();
  const expectedCoords = [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ];
  // jest does not accept -0 and 0 as equal
  // as a temporary solution use JSON.stringify() here
  // see a similar discussion here (https://stackoverflow.com/questions/48405174/how-to-make-jest-not-distinguish-between-negative-zero-and-positive-zero)
  expect( relCoords ).toEqual( expectedCoords );
});

test('test absolute coordinates of shape', () => {
  const shape = new ShapeModel();
  const relCoords = shape.getRelativeCoords();
  const rowIndex = 3;
  const colIndex = 4;
  const absCoords = shape.getAbsoluteCoords( rowIndex, colIndex );

  const expectedCoords = relCoords.map( coord => [ coord[ 0 ] + rowIndex, coord[ 1 ] + colIndex ] );
  expect( absCoords ).toEqual( expectedCoords );
});
