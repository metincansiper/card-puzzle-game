import './GridRow.css';
import GridCell from './GridCell';

function GridRow( { rowData, onCellClick } ) {
  return (
    <div className="gridRow">
    {
      rowData.map( ( val, cellIndex ) => {
        return (
          <GridCell key={cellIndex} val={val} onClick={ () => onCellClick( cellIndex ) }/>
        )
      } )
    }
    </div>
  );
}

export default GridRow;
