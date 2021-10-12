import { useState } from 'react';
import React from 'react';
import RenderBoard from '../Components/RenderBoard/RenderBoard';
import RenderShips from '../Components/RenderShips/RenderShips';
import GameBoard from '../Factories/gameBoardFactory';
import './game.css';

import Player from '../Factories/playerFactory';
import GameSetup from '../Components/GameSetup/GameSetup';

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
	const [ships_player1, setShips_player1] = useState(myShips);
	const [ships_player2, setShips_player2] = useState(computerShips);

	const receiveAttack = (
		coordinates,
		attackedBoard,
		attackedPlayer,
		attackedShips
	) => {
		let attackedCell = attackedBoard.find(
			(cell) => cell.position === coordinates
		);

		if (attackedCell.beenHit === true) {
			console.log("Don't fire twice on the same spot");
		}

		if (attackedCell.hasShip) {
			let wreck = attackedShips.find((ship) =>
				ship.whereAmI.includes(attackedCell.index)
			);
		} else {
			console.log('Water!');
		}

		let newCell = attackedCell;
		newCell.beenHit = true;

		let newArray = attackedBoard.slice(0, attackedCell.index);
		newArray.push(newCell);
		let newState = newArray.concat(attackedBoard.slice(attackedCell.index + 1));

		attackedPlayer === 'player1'
			? setPlayer1(newState)
			: setComputerBoard(newState);

		setTurn((prevTurn) => {
			console.log('chnging Turns');
			return prevTurn === 'player1' ? 'player2' : 'player1';
		});
		console.log(turn);
		checkVitory(attackedShips);
	};

	const checkVitory = (ships) => {
		if (ships.every((ship) => ship.isSunk)) {
			console.log('gameOver');
		}
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
		turn === 'player1'
			? receiveAttack(position, computerBoard, 'computer', ships_player2)
			: receiveAttack(position, player1, 'player1', ships_player1);
	};
	const gameContextObject = { handleClick, turn };
	let isGameSetupDone = true;

	return (
		<GameContext.Provider value={gameContextObject}>
			<main className='game'>
				{isGameSetupDone ? (
					<GameSetup />
				) : (
					<div className='board-container'>
						<RenderShips ships={myShips} />
						<RenderBoard board={player1} player={'player1'} />
						<RenderBoard board={computerBoard} player={'player2'} />
					</div>
				)}
			</main>
		</GameContext.Provider>
	);
}

export { Game, GameContext };
