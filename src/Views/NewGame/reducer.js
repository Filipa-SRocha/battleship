export default function reducer(state, action) {
	if (action.type === 'NEW_HIT') {
		const player = action.payload[0];
		const cell = action.payload[1];

		// board state
		let newCell = { ...cell };
		newCell.beenHit = true;

		let newArray = player.gameboard.board.slice(0, cell.index);
		newArray.push(newCell);
		let newBoard = newArray.concat(
			player.gameboard.board.slice(cell.index + 1)
		);

		//ships state
		let newShips = [];
		player.myShips.forEach((ship) => newShips.push({ ...ship }));

		const newState = { ...state };
		newState[`${player.id}`].gameboard.board = newBoard;
		newState[`${player.id}`].myShips = newShips;

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
		newState[`${player.id}`].gameboard.board = newBoard;
		newState[`${player.id}`].myShips = newShips;
		return newState;
	}
}
