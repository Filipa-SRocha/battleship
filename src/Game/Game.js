import { useState } from 'react';
import React from 'react';
import RenderBoard from '../Components/RenderBoard/RenderBoard';
import GameBoard from '../Factories/gameBoardFactory';
import './game.css';

import Player from '../Factories/playerFactory';

const GameContext = React.createContext();

function Game() {
	//Create Players
	const humanPlayer = GameBoard();
	const myShips = humanPlayer.placeShips();

	const computer = GameBoard();
	const computerShips = computer.placeShips();

	//states
	const [player1, setPlayer1] = useState(humanPlayer.board);
	const [computerBoard, setComputerBoard] = useState(computer.board);
	const [turn, setTurn] = useState('player1');

	const receiveAttack = (coordinates, attackedBoard, attackedPlayer) => {
		let attackedCell = attackedBoard.find(
			(cell) => cell.position === coordinates
		);

		if (attackedCell.beenHit === true) {
			console.log("Don't fire twice on the same spot");
		}

		if (attackedCell.hasShip) {
			let atackedShip = myShips.find(
				(ship) => attackedCell.hasShip.name === ship.name
			);
			atackedShip.gotHit(attackedCell.position);
		} else {
			console.log('Water!');
		}

		let index = attackedBoard.findIndex(
			(cell) => cell.position === coordinates
		);
		let newCell = attackedCell;
		newCell.beenHit = true;

		let newArray = attackedBoard.slice(0, index);
		newArray.push(newCell);
		let newState = newArray.concat(attackedBoard.slice(index + 1));

		attackedPlayer === 'player1'
			? setPlayer1(newState)
			: setComputerBoard(newState);

		setTurn((prevTurn) => {
			console.log('chnging Turns');
			return prevTurn === 'player1' ? 'player2' : 'player1';
		});
		console.log(turn);
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
		console.log(position);
		let attacked = turn === 'player1' ? computerBoard : player1;
		let player = turn === 'player1' ? 'computer' : 'player1';

		receiveAttack(position, attacked, player);
	};

	const gameContextObject = { handleClick, turn };

	return (
		<GameContext.Provider value={gameContextObject}>
			<div className='board-container'>
				<RenderBoard board={player1} player={'player1'} />
				<RenderBoard board={computerBoard} player={'player2'} />
			</div>
		</GameContext.Provider>
	);
}

export { Game, GameContext };
