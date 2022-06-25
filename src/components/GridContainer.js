import './GridContainer.css';
import GridRow from './GridRow';

function GridContainer( { rowData } ) {
  return (
    <div className="gridContainer">
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

export default GridContainer;
