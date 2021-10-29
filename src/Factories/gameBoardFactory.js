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
				reserved: false,
			});
		}
	}

	const placeShips = () => {
		const placedShips = Ships();

		return placedShips;
	};

	const walls = {
		left: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
		right: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],
		top: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		bottom: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
	};
	const availableCellsForShips = (board) => {
		let availableCells = board.filter(
			(cell) => !cell.hasShip && !cell.reserved
		);
		return availableCells;
	};

	return {
		board,
		placeShips,
		availableCellsForShips,
		walls,
	};
};

export default GameBoard;
