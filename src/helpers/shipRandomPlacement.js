import {
	randomPlacement,
	getReservedCells,
} from '../helpers/shipPlacementHelper';
import GameContext from '../Game/Game';
import useContext from 'react';

async function ShipRandomPlacement({ player }) {
	const { dispatch } = useContext(GameContext);

	for (let thisShip of player.myShips) {
		let [ship, axis] = randomPlacement(thisShip, player);

		let reserved = getReservedCells(ship.fullShip, axis);

		await dispatch({
			type: 'PLACE_BOAT',
			payload: [player, thisShip, ship.fullShip, reserved],
		});
	}
}

export default ShipRandomPlacement;
