import { useState } from 'react';
import React from 'react';
import RenderBoard from './Components/RenderBoard/RenderBoard';
import GameBoard from './Factories/gameBoardFactory';

import Player from './Factories/playerFactory';

const CellContext = React.createContext();

function Game() {
	//Create Players
	let humanPlayer = GameBoard();
	const myShips = humanPlayer.placeShips();

	const [player1, setPlayer1] = useState(humanPlayer.board);
	console.log('ahoy ships');
	console.log(myShips);

	const receiveAttack = (coordinates) => {
		let attackedCell = player1.find((cell) => cell.position === coordinates);

		if (attackedCell.beenHit === true) {
			console.log("Don't fire twice on the same spot");
		}

		if (attackedCell.hasShip) {
			let atackedShip = myShips.find(
				(ship) => attackedCell.hasShip.name === ship.name
			);
			console.log('atttaacckeeddd ship');
			console.log(atackedShip);
			atackedShip.gotHit(attackedCell.position);
		} else {
			console.log('Water!');
		}

		attackedCell.beenHit = true;
	};

	//places a boat based on the position of the first coordinate, the axis and the ship object
	// const place = (axis, headPosition, ship) => {
	// 	console.log('inside place');
	// 	let headCell = 1; //findCellIndex(headPosition);
	// 	let changingCells = [];

	// 	for (let i = 0; i < player1.ships[2].length; i++) {
	// 		//if x axis, mark the following cells, if y axis mark the cells bellow
	// 		axis === 'x'
	// 			? changingCells.push(headCell + i)
	// 			: changingCells.push(headCell + i * 10);
	// 	}
	// };

	// place('x', 1);

	// function findCellIndex(coordinates, board) {
	// 	console.log('wee');
	// 	console.log('inside cell index');
	// 	let cellIndex = board.findIndex((cell) => cell.position === coordinates);

	// 	if (cellIndex < 0) {
	// 		console.log("cell index error, couldn't find a cell for that coordinate");
	// 	}
	// 	console.log(cellIndex);
	// 	return cellIndex;
	// }

	// findCellIndex

	const handleClick = (position) => {
		//gets the coordinate of the cell that was clicked
		console.log('cell was clicked');
		console.log(position);
		receiveAttack(position);
	};

	const data = [12, 34, 45];

	return (
		<CellContext.Provider value={handleClick}>
			<RenderBoard board={player1} />
		</CellContext.Provider>
	);
}

export { Game, CellContext };
