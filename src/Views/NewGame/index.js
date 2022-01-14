import PlayButton from '../../Components/PlayButton/index';
import { StyledContainer, StyledButtonsContainer } from './style';
import Player from '../../Factories/playerFactory';
import { useState, useReducer } from 'react';
import reducer from './reducer';
import React from 'react';
import { GameSetup } from '../../Components/GameSetup/GameSetup';

const GameContext = React.createContext();

function NewGame() {
	//Create Players
	const player1 = Player('player1', 'human');
	const player2 = Player('player2', 'computer');

	const [isGameSetupDone, setIsGameSetupDone] = useState(false);
	const [gameMode, setGameMode] = useState(false);
	const [turn, setTurn] = useState('player1');
	const [isGameOver, setIsGameOver] = useState(false);

	const [players, dispatch] = useReducer(reducer, {
		player1: player1,
		player2: player2,
	});

	const gameContextObject = {
		players,
		gameMode,
		setGameMode,
		isGameSetupDone,
		setIsGameSetupDone,
		dispatch,
		turn,
		setTurn,
		isGameOver,
		setIsGameOver,
	};

	return (
		<GameContext.Provider value={gameContextObject}>
			{gameMode ? (
				<GameSetup players={players} />
			) : (
				<body>
					<StyledContainer>
						<h1>BATTLESHIP - THE GAME</h1>

						<p>Please Select Game Mode:</p>

						<StyledButtonsContainer>
							{/* The playbutton component sets a game Mode */}
							<PlayButton text='1 Player (easy mode)' id='easy-mode' />
							<PlayButton text='1 Player (hard mode)' id='hard-mode' disable />
							<PlayButton text='2 Players' id='two-players' />
						</StyledButtonsContainer>
					</StyledContainer>
				</body>
			)}
		</GameContext.Provider>
	);
}

export { NewGame, GameContext };
