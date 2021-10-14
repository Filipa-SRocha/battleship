export default function reducer(state, action) {
	if (action.type === 'NEW_HIT') {
		const newBoard = action.payload[0];
		const player = action.payload[1];

		const newState = { ...state };
		state[`${player}`].gameboard.board = newBoard;

		return newState;
	}

	if (action.type === 'PLACE_BOAT') {
		const newBoard = action.payload[0];
		const newShips = action.payload[1];

		const newState = { ...state };
		state.player1.gameboard.board = newBoard;
		state.player1.myShips = newShips;

		return newState;
	}
}
