import './DecksContainer.css';
import Deck from './Deck';

function DecksContainer( { decks, selectedDeckType, selectDeck } ) {
  return (
    <div className="decksContainer">
      {
        decks.map( deck => {
          const deckType = deck.getDeckType();
          const size = deck.getSize();
          const selected = selectedDeckType == deckType;
          const select = () => selectDeck( deckType );
          return (
            <Deck key={ deckType } deckType={ deckType } size={ size } selected={ selected } select={ select } />
          )
        } )
      }
    </div>
  );
}

export default DecksContainer;
