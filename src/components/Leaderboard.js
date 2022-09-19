import React, { useState } from 'react';
import useLocalStorage from '../hooks/UseLocalStorage';
import LeaderboardRow from './LeaderboardRow';
import './Leaderboard.css'
import { nonIncreasingArrayInsert } from '../util';
import { MAX_LEADERBOARD_SIZE } from '../config';

function Leaderboard({ score }) {
    const [leaderboard, updateLeaderboard] = useLocalStorage('leaderboard', []);
    const [scoreIndex] = useState(() => {
        const len = leaderboard.length;
        if ( len === MAX_LEADERBOARD_SIZE && score <= leaderboard[len-1] ) {
            return -1;
        }

        const index = nonIncreasingArrayInsert(leaderboard, score);

        // len represents the length before the insertion so we must check for equality here
        if ( len === MAX_LEADERBOARD_SIZE ) {
            leaderboard.pop();
        }

        updateLeaderboard(leaderboard);

        return index;
    });

    return (
        <div className="leaderboard">
            <div>
                <b>Leaderboard</b>
            </div>
            {
                leaderboard.map((currScore, currIndex) => {
                    return (
                        <LeaderboardRow key={ currIndex } score={ currScore } selected={ currIndex === scoreIndex }/>
                    )
                })
            }
        </div>
    );
}

export default Leaderboard;