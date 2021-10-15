import './cell.css';
import { useContext } from 'react';
import { GameContext } from '../../Game/Game';

function Cell({ info: { index, position, hasShip, beenHit }, player, setup }) {
	const { handleClick, turn, isSetupDone } = useContext(GameContext);

	let classes = 'cells';
	let showBoats = player.id === 'player1' ? true : false;

	if (turn === player) {
		//classname para cells nao clicaveis
		classes = classes + ' disabled';
	} else if (isSetupDone) {
		classes = classes + ' on-play';
	}

	if (hasShip && showBoats) {
		classes += ' ship-cell';
	}

	if (beenHit) {
		classes += hasShip ? ' boat-hit' : ' water';
		console.log('hiittteed cell');
	}

	return <div className={classes} onClick={() => handleClick(position)}></div>;
}

export default Cell;
