import './GridContainer.css';
import GridRow from './GridRow';

function GridContainer( { boardData, onCellClick } ) {
  return (
    <div className="gridContainer">
    {
      boardData.map( ( rowData, rowIndex ) => {
        return (
          <GridRow key={rowIndex} rowData={rowData} rowIndex={rowIndex} onCellClick={ colIndex => onCellClick( rowIndex, colIndex ) } />
        )
      } )
    }
    </div>
  );
}

export default GridContainer;
