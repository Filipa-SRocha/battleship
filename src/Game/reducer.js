export default function reducer(state, action) {
	if (action.type === 'NEW_HIT') {
		const newBoard = action.payload[0];
		const player = action.payload[1];

		const newState = { ...state };
		state[`${player}`].gameboard.board = newBoard;

		return newState;
	}

	if (action.type === 'PLACE_BOAT') {
		const player = action.payload[0];
		const ship = action.payload[1];
		const shipLocation = action.payload[2];
		const reservedCells = action.payload[3];

		//new state (boat)
		let newShips = [];
		let updatedShip = {};
		player.myShips.forEach((myShip) => {
			let newShip = { ...myShip };
			if (myShip === ship) {
				newShip.whereAmI = shipLocation;
				updatedShip = { ...newShip };
				newShips.push(newShip);
			} else {
				newShips.push(myShip);
			}
		});

		//new state (board)
		let newBoard = [];
		console.log('updated ship', updatedShip);
		player.gameboard.board.forEach((cell) => {
			let newCell = { ...cell };
			if (shipLocation.includes(cell.index)) {
				newCell.hasShip = updatedShip;
			} else if (reservedCells.includes(cell.index)) {
				newCell.reserved = true;
			}
			newBoard.push(newCell);
		});

		const newState = { ...state };
		console.log(player.id);
		newState[`${player.id}`].gameboard.board = newBoard;
		newState[`${player.id}`].myShips = newShips;
		console.log(newState);
		return newState;
	}
}
