import { useEffect } from 'react';
import RenderBoard from '../../Components/RenderBoard/index';
import { useContext } from 'react';
import { GameContext } from '../NewGame/index';
import {
	randomPlacement,
	getReservedCells,
} from '../../helpers/shipPlacementHelper';

function RandomBoatPlacement({ player, playerSetupDone }) {
	// animation
	useEffect(() => {
		let delay = 200;
		document.querySelectorAll('.cells').forEach((cell) => {
			cell.classList.add('light-up');
			cell.style.animationDelay = `${delay}ms`;
			delay += 60;
		});
	});

	useEffect(() => {
		shipRandomPlacement({ player });
	}, []);

	//boat placement
	const { dispatch } = useContext(GameContext);

	async function shipRandomPlacement({ player }) {
		for (let thisShip of player.myShips) {
			let [ship, axis] = randomPlacement(thisShip, player);

			let reserved = getReservedCells(ship.fullShip, axis);

			await dispatch({
				type: 'PLACE_BOAT',
				payload: [player, thisShip, ship.fullShip, reserved],
			});
		}
	}

	setTimeout(() => {
		playerSetupDone(() => true);
	}, 8000);

	return <RenderBoard player={player} />;
}

export default RandomBoatPlacement;
