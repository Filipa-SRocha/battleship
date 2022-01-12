import React, { useContext } from 'react';
import RenderBoard from '../Components/RenderBoard/RenderBoard';

import { GameContext } from '../Views/NewGame/NewGame';

import './game.css';

function Game({ players }) {
	const { dispatch, setIsGameOver, turn, setTurn } = useContext(GameContext);

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
			wreck.gotHit(attackedCell.index);
		} else {
			console.log('Water!');
		}

		dispatch({ type: 'NEW_HIT', payload: [attackedPlayer, attackedCell] });

		setTurn((prevTurn) => {
			return prevTurn === 'player1' ? 'player2' : 'player1';
		});

		let victory = checkVictory(attackedPlayer.myShips);
		console.log(victory);
		if (victory) {
			endGame();
		}
	};

	const endGame = () => {
		setIsGameOver(() => true);
		console.log(`${turn} won!!! ---------------------`);
	};

	const checkVictory = (atkShips) => atkShips.every((ship) => ship.isSunk());

	const handleClick = (position) => {
		//gets the coordinate of the cell that was clicked
		turn === 'player1'
			? receiveAttack(position, players.player2)
			: receiveAttack(position, players.player1);
	};

	return (
		<>
			<RenderBoard player={players.player1} handleClick={handleClick} />
			<RenderBoard player={players.player2} handleClick={handleClick} />
		</>
	);
}

export { Game };
