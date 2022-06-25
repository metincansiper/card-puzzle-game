import './GridRow.css';
import GridCell from './GridCell';

function GridRow( { rowData } ) {
  return (
    <div className="gridRow">
    {
      rowData.map( val => {
        return (
          <GridCell val={val} />
        )
      } )
    }
    </div>
  );
}

export default GridRow;
