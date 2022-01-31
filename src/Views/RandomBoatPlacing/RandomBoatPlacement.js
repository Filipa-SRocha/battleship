import { useEffect } from 'react';
import { useContext } from 'react';
import { GameContext } from '../NewGame/index';
import {
	randomPlacement,
	getReservedCells,
} from '../../helpers/shipPlacementHelper';
import Loading from '../../Components/Loading/index';

function RandomBoatPlacement({ player, playerSetupDone }) {
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
	}, 4000);

	return (
		<>
			<Loading />
		</>
	);
}

export default RandomBoatPlacement;
