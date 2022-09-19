import Modal from 'react-modal';
import Leaderboard from './Leaderboard';

function GameOverModal(props) {
    const { hasWon, score, restartGame, isOpen } = props;
    
    const modalStyles = {
        content: {
            'top': '50%',
            'left': '50%',
            'right': 'auto',
            'bottom': 'auto',
            'marginRight': '-50%',
            'transform': 'translate(-50%, -50%)',
            'display': 'flex',
            'gap': '5px',
            'flexDirection': 'column'
        }
    };

    return (
        <Modal isOpen={ isOpen } contentLabel="Game Over" style={ modalStyles }>
          <div>
          {
            hasWon ? 'Congrats, you won the game! ' : 'Game is over! '
          }
          Your score is { score }
          </div>
          <button className="restartGameButton" onClick={ restartGame }>restart</button>
      </Modal>
    );
}

export default GameOverModal;