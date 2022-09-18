import '../vars.css';
import './GridCell.css';
import { CELL_STATUS } from '../model/CellModel';
import { getTypeString } from '../util';

const CLASS_NAMES = {
  [CELL_STATUS.OUTSIDE]: 'outside',
  [CELL_STATUS.EMPTY]: 'empty',
  [CELL_STATUS.INTERSECTION]: 'intersection'
};

function GridCell({ val, cellIndex, onClick }) {
  return (
    <div className={ getClassName( val ) + ' gridCell' } onClick={ onClick } >

    </div>
  );
}

function getClassName( val ) {
  if ( val in CLASS_NAMES ) {
    return CLASS_NAMES[val];
  }

  if ( val > 0 ) {
    return getTypeString(val);
  }

  console.error("Invalid cell value!", val);
}

export default GridCell;
