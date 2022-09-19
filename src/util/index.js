import binarySearch from "binary-search";

const sortedArrayInsert = (sortedArray, value, sortingDirection) => {
  const compareBy = (a, b) => a * sortingDirection - b * sortingDirection;
  let index = binarySearch(sortedArray, value, compareBy);

  // if the value is not in the array, then binarySearch library returns -(index + 1), 
  // where index is where the value should be inserted into the array to maintain sorted order
  // see https://github.com/darkskyapp/binary-search
  if (index < 0) {
    index = -index - 1
  }

  sortedArray.splice(index, 0, value);
  return index;
};

export const nonIncreasingArrayInsert = (sortedArray, value) => {
  // having sortingDirection equal to -1 means that the array must be maintained in 
  // non-increasing order
  const sortingDirection = -1;
  return sortedArrayInsert(sortedArray, value, sortingDirection);
};

// Implementation of https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export const inplaceShuffle = ( arr ) => {
  const len = arr.length;

  for ( let i = len - 1; i > 0; i-- ) {
    const j = generateRandomInteger( i, len - 1 );
    [ arr[ i ], arr[ j ] ] = [ arr[ j ], arr[ i ] ];
  }
};

export const generateRandomInteger = ( lowerLimit, upperLimit ) => {
  return Math.floor( Math.random() * ( upperLimit - lowerLimit + 1 ) ) + lowerLimit;
};

export const buildClassName = classList => {
  return classList.join(' ');
};

export const getTypeString = typeVal => {
  if ( typeVal == null ) {
    return null;
  }
  return 'type' + typeVal;
};
