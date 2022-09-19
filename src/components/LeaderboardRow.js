import { buildClassName } from '../util';
import './LeaderboardRow.css'
function LeaderboardRow(props) {
    const { score, selected } = props;
    const className = buildClassName([
        'leaderboardRow',
        selected ? 'selectedRow' : null
    ]);
    return (
        <div className={ className }>{ score }</div>
    );
}

export default LeaderboardRow;