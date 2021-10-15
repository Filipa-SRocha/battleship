import Ships from './shipFactory';

const GameBoard = () => {
	//Makes the board:
	let board = [];
	let n = 0;
	for (let a = 65; a <= 74; a++) {
		for (let i = 1; i <= 10; i++, n++) {
			board.push({
				position: `${String.fromCharCode(a)}-${i}`,
				hasShip: false,
				beenHit: false,
				index: n,
			});
		}
	}

	const placeShips = () => {
		const placedShips = Ships();
		// const headCells = [1, 3, 7, 71, 91];
		// const axis = ['y', 'y', 'y', 'x', 'x'];
		// let placedShips = [];

		// for (let i = 0; i < 5; i++) {
		// 	placedShips.push(place(ships[i], headCells[i], axis[i]));
		// }
		return placedShips;
	};

	return { board, placeShips };
};

export default GameBoard;
