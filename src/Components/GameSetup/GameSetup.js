import '../Cell/cell.css';
import '../RenderBoard/RenderBoard.css';
import { useState, useContext } from 'react';
import { GameContext } from '../../Game/Game';

import ClickBoatPlacing from '../../Views/ClickBoatPlacing/ClickBoatPlacing';
import RandomBoatPlacement from '../../Views/RandomBoatPlacing/RandomBoatPlacement';

const GameSetup = ({ players }) => {
	const { setIsGameSetupDone, gameMode } = useContext(GameContext);

	//state
	const [isPlayer1Done, setIsPlayer1Done] = useState(false);
	const [isPlayer2Done, setIsPlayer2Done] = useState(false);

	if (gameMode === 'easy-mode') {
		return <ClickBoatPlacing player={players.player1} />;
		// return <RandomBoatPlacement player={players.player2} />;
	}

	return (
		<>
			<h1>Ups, something Went Wrong</h1>
		</>
	);
};

export { GameSetup };
