import { useState, useReducer } from 'react';
import React from 'react';
import RenderBoard from '../Components/RenderBoard/RenderBoard';

import './game.css';
import reducer from './reducer';

import Player from '../Factories/playerFactory';
import GameSetup from '../Components/GameSetup/GameSetup';

const GameContext = React.createContext();

function Game() {
	//Create Players
	const player1 = Player('player1', 'human');
	const player2 = Player('player2', 'computer');

	//states
	const [turn, setTurn] = useState('player1');
	const [isGameSetupDone, setIsGameSetupDone] = useState(false);

	const [players, dispatch] = useReducer(reducer, {
		player1: player1,
		player2: player2,
	});

	const receiveAttack = (coordinates, attackedPlayer) => {
		let attackedCell = attackedPlayer.gameboard.board.find(
			(cell) => cell.position === coordinates
		);
		if (attackedCell.beenHit === true) {
			console.log("Don't fire twice on the same spot");
		}
		if (attackedCell.hasShip) {
			let wreck = attackedPlayer.myShips.find((ship) =>
				ship.whereAmI.includes(attackedCell.index)
			);
		} else {
			console.log('Water!');
		}

		let newCell = { ...attackedCell };
		newCell.beenHit = true;

		let newArray = attackedPlayer.gameboard.board.slice(0, attackedCell.index);
		newArray.push(newCell);
		let newBoard = newArray.concat(
			attackedPlayer.gameboard.board.slice(attackedCell.index + 1)
		);

		dispatch({ type: 'NEW_HIT', payload: [newBoard, attackedPlayer.id] });

		setTurn((prevTurn) => {
			console.log('chnging Turns');
			return prevTurn === 'player1' ? 'player2' : 'player1';
		});
		// 	checkVitory(attackedShips);
		// };
	};
	// const checkVitory = (ships) => {
	// 	if (ships.every((ship) => ship.isSunk)) {
	// 		console.log('gameOver');
	// 	}
	// };

	// //places a boat based on the position of the first coordinate, the axis and the ship object
	// // const place = (axis, headPosition, ship) => {
	// // 	console.log('inside place');
	// // 	let headCell = 1; //findCellIndex(headPosition);
	// // 	let changingCells = [];

	// // 	for (let i = 0; i < player1.ships[2].length; i++) {
	// // 		//if x axis, mark the following cells, if y axis mark the cells bellow
	// // 		axis === 'x'
	// // 			? changingCells.push(headCell + i)
	// // 			: changingCells.push(headCell + i * 10);
	// // 	}
	// // };

	// // place('x', 1);

	// // function findCellIndex(coordinates, board) {
	// // 	console.log('wee');
	// // 	console.log('inside cell index');
	// // 	let cellIndex = board.findIndex((cell) => cell.position === coordinates);

	// // 	if (cellIndex < 0) {
	// // 		console.log("cell index error, couldn't find a cell for that coordinate");
	// // 	}
	// // 	console.log(cellIndex);
	// // 	return cellIndex;
	// // }

	// // findCellIndex

	const handleClick = (position) => {
		console.log(turn);
		//gets the coordinate of the cell that was clicked
		turn === 'player1'
			? receiveAttack(position, players.player2)
			: receiveAttack(position, players.player1);
	};

	const gameContextObject = {
		handleClick,
		turn,
		isGameSetupDone,
		setIsGameSetupDone,
		dispatch,
	};

	return (
		<GameContext.Provider value={gameContextObject}>
			<main className='game'>
				<div className='board-container'>
					{isGameSetupDone ? (
						<>
							<RenderBoard player={players.player1} />
							<RenderBoard player={players.player1} />
						</>
					) : (
						<GameSetup player={players.player1} />
					)}
				</div>
			</main>
		</GameContext.Provider>
	);
}

export { Game, GameContext };
