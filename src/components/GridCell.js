import './GridCell.css';
import { CELL_STATUS } from '../model/CellModel';

function GridCell({ val }) {
  return (
    <div className={ getClassNameFromVal( val ) + ' gridCell' }>

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
}

export default GridCell;
