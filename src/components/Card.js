import '../vars.css';
import './Card.css';
import { SHAPE_DIRECTIONS } from '../model/enum/Shape';
import { getTypeString, buildClassName } from '../util';

const DIRECTION_CLASS_NAMES = {
  [SHAPE_DIRECTIONS.LEFT]: 'left',
  [SHAPE_DIRECTIONS.RIGHT]: 'right',
  [SHAPE_DIRECTIONS.UP]: 'up',
  [SHAPE_DIRECTIONS.DOWN]: 'down'
};

function Card({ deckType, shapeDirection, shapeLength }) {
  const className = buildClassName([
    'card', 
    getTypeString(deckType)
  ]);

  return (
    <div className={ className }>
      <div className={ getDirectionClassName( shapeDirection ) } />
      <div>
        { shapeLength }
      </div>
    </div>
  );
}

const getDirectionClassName = ( shapeDirection ) => {
  if ( shapeDirection in DIRECTION_CLASS_NAMES ) {
    return DIRECTION_CLASS_NAMES[shapeDirection];
  }

  if ( shapeDirection == null ) {
    return null;
  }
  
  console.error("Invalid shape direction!", shapeDirection);
};

export default Card;
