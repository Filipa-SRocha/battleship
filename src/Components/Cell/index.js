import './cell.css';
import { useContext } from 'react';
import { GameContext } from '../../Views/NewGame/NewGame';
import { CellContainer } from './style';

function Cell({
	info: { index, position, hasShip, beenHit },
	player,
	handleClick,
}) {
	const { isSetupDone, turn } = useContext(GameContext);

	let showGame = player.id === 'player1' ? true : false;

	return (
		<CellContainer
			showGame={showGame}
			shipCell={hasShip && showGame}
			onPlay={isSetupDone}
			water={beenHit && !hasShip}
			boatGotHit={beenHit && hasShip}
			onClick={() => handleClick(position)}
		></CellContainer>
	);
}

export default Cell;
