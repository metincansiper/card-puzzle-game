import '../vars.css';
import './Card.css';
import { SHAPE_DIRECTIONS } from '../model/ShapeModel';

function Card({ deckType, shapeDirection, shapeLength }) {
  return (
    <div className={ getClassName( deckType ) }>
      <div class={ getDirectionClassName( shapeDirection ) } />
      <div>
        { shapeLength }
      </div>
    </div>
  );
}

const getClassName = ( deckType ) => {
  let className = "card type" + deckType;

  return className;
}

const getDirectionClassName = ( shapeDirection ) => {
  if ( shapeDirection == SHAPE_DIRECTIONS.LEFT ) {
    return 'left';
  }
  else if ( shapeDirection == SHAPE_DIRECTIONS.RIGHT ) {
    return 'right';
  }
  else if ( shapeDirection == SHAPE_DIRECTIONS.UP ) {
    return 'up';
  }
  else if ( shapeDirection == SHAPE_DIRECTIONS.DOWN ) {
    return 'down';
  }
};

export default Card;
