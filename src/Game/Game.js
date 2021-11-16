import { useState, useReducer } from 'react';
import React from 'react';
import RenderBoard from '../Components/RenderBoard/RenderBoard';
import GameOver from '../Components/GameOver/GameOver';
import NewGame from '../Views/StartGame/StartGame';

import './game.css';
import reducer from './reducer';

import Player from '../Factories/playerFactory';
import { GameSetup } from '../Components/GameSetup/GameSetup';

const GameContext = React.createContext();

function Game() {
	//Create Players
	const player1 = Player('player1', 'human');
	const player2 = Player('player2', 'computer');

	//states
	const [turn, setTurn] = useState('player1');
	const [isGameSetupDone, setIsGameSetupDone] = useState(false);
	const [gameMode, setGameMode] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);

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

	const gameContextObject = {
		handleClick,
		turn,
		setGameMode,
		isGameSetupDone,
		setIsGameSetupDone,
		dispatch,
		gameMode,
	};

	return (
		<GameContext.Provider value={gameContextObject}>
			<main className='game'>
				<div className='board-container'>
					{!gameMode ? (
						<NewGame />
					) : (
						<>
							{isGameOver ? (
								<GameOver winner={players.player1.id} />
							) : (
								<>
									{isGameSetupDone ? (
										<>
											<RenderBoard player={players.player1} />
											<RenderBoard player={players.player2} />
										</>
									) : (
										<GameSetup players={players} />
									)}
								</>
							)}
						</>
					)}
				</div>
			</main>
		</GameContext.Provider>
	);
}

export { Game, GameContext };
