import { inplaceShuffle } from '../util';

test('test shuffle', () => {
  const arr = [ 1, 3, 2, 4, 5, 7, 6 ];
  const copyArr = arr.slice( 0 );

  inplaceShuffle( arr );

  expect( arr ).not.toEqual( copyArr );
});
