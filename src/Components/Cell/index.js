import { useContext } from 'react';
import { GameContext } from '../../Views/NewGame/index';
import { CellContainer, PlacingCellContainer } from './style';

function Cell({
	info: { index, position, hasShip, beenHit },
	player,
	handleClick,
	size,
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
			size={size}
		></CellContainer>
	);
}

function PlacingCell({
	info: { index, position, hasShip, beenHit, reserved },
	hovered,
	handleMouseEnter,
	handleMouseLeave,
	handleSetupClick,
	size,
}) {
	return (
		<PlacingCellContainer
			id={index}
			onMouseEnter={(e) => handleMouseEnter(e)}
			onMouseLeave={() => handleMouseLeave()}
			onClick={() => handleSetupClick()}
			shipCell={hasShip}
			unclickable={hasShip}
			hovered={hovered}
			reserved={reserved}
			size={size}
		></PlacingCellContainer>
	);
}

export { Cell, PlacingCell };
