import '../vars.css';
import './Deck.css';
import { buildClassName, getTypeString } from '../util';

function Deck({ deckType, size, selected, select }) {
  const className = buildClassName([
    'deck',
    getTypeString(deckType),
    selected ? 'selected' : null
  ]);
  
  return (
    <div className={ className } onClick={ select }>
      { size }
    </div>
  );
}


export default Deck;
