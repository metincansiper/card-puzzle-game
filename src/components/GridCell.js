import '../vars.css';
import './GridCell.css';
import { CELL_STATUS } from '../model/CellModel';

function GridCell({ val, cellIndex, onClick }) {
  return (
    <div className={ getClassNameFromVal( val ) + ' gridCell' } onClick={ onClick } >

    </div>
  );
}

function getClassNameFromVal( val ) {
  if ( val == CELL_STATUS.OUTSIDE ) {
    return 'outside';
  }

  if ( val == CELL_STATUS.EMPTY ) {
    return 'empty';
  }

  if ( val == CELL_STATUS.INTERSECTION ) {
    return 'intersection';
  }

  if ( val > 0 ) {
    return 'type' + val;
  }
}

export default GridCell;
