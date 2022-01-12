import './cell.css';
import { useContext } from 'react';
import { GameContext } from '../../Views/NewGame/NewGame';
import { PlayingContext } from '../../Game/Game';

function Cell({
	info: { index, position, hasShip, beenHit },
	player,
	handleClick,
}) {
	const { isSetupDone, turn } = useContext(GameContext);

	console.log('yeeere');

	let classes = 'cells';
	let showBoats = player.id === 'player1' ? true : false;

	if (turn === player) {
		//classname for unclickable cells
		classes = classes + ' disabled';
	} else if (isSetupDone) {
		classes = classes + ' on-play';
	}

	if (hasShip && showBoats) {
		classes += ' ship-cell';
	}

	if (beenHit) {
		classes += hasShip ? ' boat-hit' : ' water';
	}

	return <div className={classes} onClick={() => handleClick(position)}></div>;
}

export default Cell;
