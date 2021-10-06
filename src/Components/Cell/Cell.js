import './cell.css';
import { useContext } from 'react';
import { GameContext } from '../../Game/Game';

function Cell({ info: { position, hasShip, beenHit }, player }) {
	const { handleClick, turn } = useContext(GameContext);
	let classes = 'cells';
	let showBoats = player === 'player1' ? true : false;

	if (turn === player) {
		//classname para cells nao clicaveis
		classes = classes + ' disabled';
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
