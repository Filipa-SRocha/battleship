import GameBoard from '../Factories/gameBoardFactory';

//retuns the last Cell of a row or column
function _lastCell(index, axis) {
	let max;
	if (axis === 'x') {
		max = String(index).length >= 2 ? String(index)[0] + '9' : '9';
	} else {
		max =
			String(index).length >= 2
				? '9' + String(index)[1]
				: '9' + String(index)[0];
	}

	return Number(max);
}

const limitPosition = (index, axis, shipLength) => {
	let maxIndex;
	axis === 'x'
		? (maxIndex = _lastCell(index, axis) - shipLength + 1)
		: (maxIndex = _lastCell(index, axis) - (shipLength - 1) * 10);

	return maxIndex;
};

//returns true if the cell is a wall
const isWall = (index) => {
	let workingBoard = GameBoard();

	let left = workingBoard.walls.left.includes(index);
	let rigth = workingBoard.walls.right.includes(index);
	let top = workingBoard.walls.top.includes(index);
	let bottom = workingBoard.walls.bottom.includes(index);
	return {
		left,
		rigth,
		top,
		bottom,
	};
};

//returns an array of the cells index located around a ship
const getReservedCells = (shipLocation, axis) => {
	let ship = [...shipLocation];
	let reservedCells = [];
	let n;

	n = axis === 'x' ? 1 : 10;
	let firstCellWall = axis === 'x' ? isWall(ship[0]).left : isWall(ship[0]).top;
	let lastCellWall =
		axis === 'x'
			? isWall(ship[ship.length - 1]).rigth
			: isWall(ship[ship.length - 1]).bottom;

	if (!firstCellWall) {
		ship.unshift(ship[0] - n);
		reservedCells.push(ship[0]);
	}

	if (!lastCellWall) {
		ship.push(ship[ship.length - 1] + n);
		reservedCells.push(ship[ship.length - 1]);
	}

	n = axis === 'x' ? 10 : 1;

	let yRight, yLeft;
	if (axis === 'y') {
		yLeft = isWall(ship[0]).left;
		yRight = isWall(ship[0]).rigth;
	}

	ship.forEach((shipCellIndex) => {
		if (axis === 'x' || (axis === 'y' && !yRight)) {
			reservedCells.push(shipCellIndex + n);
		}
		if (axis === 'x' || (axis === 'y' && !yLeft)) {
			reservedCells.push(shipCellIndex - n);
		}
	});

	return reservedCells;
};

//return a random int; min<=random<max
function getRandom(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getAvailablePlacements(shipLength, availableCells, axis) {
	let headCells = [];
	let possiblePlay = [];

	if (axis === 'x') {
		for (let i = 0; i < availableCells.length - shipLength; i++) {
			possiblePlay =
				availableCells[i].index + shipLength - 1 ===
				availableCells[i + shipLength - 1].index
					? availableCells.slice(i, i + shipLength)
					: [];

			if (possiblePlay.length >= 2) {
				let isPossible = possiblePlay
					.slice(0, possiblePlay.length - 1)
					.every((cell) => !isWall(cell.index).rigth);

				if (isPossible) {
					headCells.push(possiblePlay[0]);
				}
			}
		}
	}
	if (axis === 'y') {
		for (let i = 0; i < availableCells.length - shipLength; i++) {
			possiblePlay = [];
			for (let j = 0; j < shipLength; j++) {
				possiblePlay.push(availableCells[i].index + j * 10);
			}

			let exists = possiblePlay.every((cellIndex) =>
				availableCells.find((cell) => cell.index === cellIndex)
			);

			let possible;
			if (exists) {
				possible = possiblePlay
					.slice(0, possiblePlay.length - 1)
					.every((cellIndex) => !isWall(cellIndex).bottom);
			}
			if (possible) {
				let cell = availableCells.find(
					(cell) => cell.index === possiblePlay[0]
				);
				headCells.push(cell);
			}
		}
	}
	console.log('-----headcellllllllss----', headCells);
	return headCells;
}

//returns an array of indexes for a boat
const getFullBoat = (headCell, shipLength, axis) => {
	let boat = [headCell.index];

	let n = axis === 'x' ? 1 : 10;

	for (let i = 1; i < shipLength; i++) {
		boat.push(headCell.index + i * n);
	}

	return boat;
};

const randomPlacement = (ship, player) => {
	let availableCells = player.gameboard.availableCellsForShips(
		player.gameboard.board
	);

	let axis = getRandom(0, 2) === 0 ? 'x' : 'y';

	let possiblePlays = getAvailablePlacements(ship.length, availableCells, axis);

	let headCell = possiblePlays[getRandom(0, possiblePlays.length)];

	let fullShip = getFullBoat(headCell, ship.length, axis);
	return [{ fullShip }, axis];
};

export { limitPosition, getReservedCells, randomPlacement };
