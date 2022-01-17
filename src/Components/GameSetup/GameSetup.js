import { useState, useContext } from 'react';
import { GameContext } from '../../Views/NewGame/index';

import ClickBoatPlacing from '../../Views/ClickBoatPlacing/ClickBoatPlacing';
import RandomBoatPlacement from '../../Views/RandomBoatPlacing/RandomBoatPlacement';
import { Game } from '../../Game/Game';

const GameSetup = ({ players }) => {
	const { setIsGameSetupDone, gameMode } = useContext(GameContext);

	//state
	const [isPlayer1Done, setIsPlayer1Done] = useState(false);
	const [isPlayer2Done, setIsPlayer2Done] = useState(false);

	if (!isPlayer1Done) {
		return (
			<ClickBoatPlacing
				player={players.player1}
				playerSetupDone={setIsPlayer1Done}
			/>
		);
	} else if (isPlayer1Done && !isPlayer2Done) {
		return (
			<RandomBoatPlacement
				player={players.player2}
				playerSetupDone={setIsPlayer2Done}
			/>
		);
	} else if (isPlayer1Done && isPlayer2Done) {
		setIsGameSetupDone(() => true);
		return <Game players={players} />;
	}

	return (
		<>
			<h1>Ups, something Went Wrong</h1>
		</>
	);
};

export { GameSetup };
