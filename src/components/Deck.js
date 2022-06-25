import '../vars.css';
import './Deck.css';

function Deck({ deckType, size, selected, select }) {
  return (
    <div className={ getClassName( deckType, selected ) } onClick={ select }>
      { size }
    </div>
  );
}

const getClassName = ( deckType, selected ) => {
  let className = "deck type" + deckType;
  if ( selected ) {
    className += " selected";
  }

  return className;
}

export default Deck;
