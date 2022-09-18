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
