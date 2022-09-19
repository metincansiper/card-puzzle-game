import { inplaceShuffle, nonIncreasingArrayInsert } from '../util';

test('test shuffle', () => {
  const arr = [ 1, 3, 2, 4, 5, 7, 6 ];
  const copyArr = arr.slice( 0 );

  inplaceShuffle( arr );

  expect( arr ).not.toEqual( copyArr );
});

test('test inserting non-existing element to non-increasing array ', () => {
  const arr = [4,2,1];
  const modifiedArr = [4,3,2,1];

  const index = nonIncreasingArrayInsert(arr, 3);
  expect( arr ).toEqual( modifiedArr );
  expect( index ).toEqual( 1 );
});

test('test inserting existing element to non-increasing array ', () => {
  const arr = [4,2,1];
  const modifiedArr = [4,2,2,1];

  const index = nonIncreasingArrayInsert(arr, 2);
  expect( arr ).toEqual( modifiedArr );
  expect( index ).toEqual( 1 );
});
