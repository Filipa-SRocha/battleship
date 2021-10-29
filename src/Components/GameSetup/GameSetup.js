import '../Cell/cell.css';
import '../RenderBoard/RenderBoard.css';
import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../Game/Game';
import {
	limitPosition,
	getReservedCells,
	randomPlacement,
} from '../../helpers/shipPlacement';

const GameSetup = ({ players }) => {
	let player = players.player1;
	let allCells = player.gameboard.board;

	const { dispatch, setIsGameSetupDone } = useContext(GameContext);

	//state
	const [hovering, setHovering] = useState([]);
	const temp = player.myShips[0];
	const [ship, setShip] = useState(temp);
	const [axis, setAxis] = useState('x');

	//setting player2-computer-board----move this function later++++
	async function setPlayer2() {
		console.log('going');
		for (let thisShip of players.player2.myShips) {
			let temp = randomPlacement(thisShip, players.player2);
			let shipOn = temp[0];
			let myAxis = temp[1];

			let reserved = getReservedCells(shipOn.fullShip, myAxis);

			await dispatch({
				type: 'PLACE_BOAT',
				payload: [players.player2, thisShip, shipOn.fullShip, reserved],
			});
			console.log('turn over');
		}
	}

	const handleMouseEnter = (e) => {
		let index = Number(e.target.id);

		let n;
		axis === 'x' ? (n = 1) : (n = 10);

		let maxIndex;

		axis === 'x'
			? (maxIndex = limitPosition(index, axis) - ship.length + 1)
			: (maxIndex = limitPosition(index, axis) - (ship.length - 1) * 10);

		let placingArray = [];
		let boatHead;

		index <= maxIndex ? (boatHead = index) : (boatHead = maxIndex);

		for (let i = 0; i < ship.length; i++) {
			placingArray.push(boatHead + i * n);
		}

		setHovering(() => placingArray);
	};

	useEffect(() => {
		document.getElementById('set-up-grid').focus();
	});

	const handleMouseLeave = () => {
		setHovering(() => []);
	};

	const handleKeyDown = (e) => {
		if (e.code === 'Space') {
			setAxis((prevState) => (prevState === 'x' ? 'y' : 'x'));
		}
	};

	const handleSetupClick = () => {
		let reserved = getReservedCells(hovering, axis);
		dispatch({
			type: 'PLACE_BOAT',
			payload: [player, ship, hovering, reserved],
		});

		checkPlacement();
	};

	const checkPlacement = () => {
		let nextShip = player.myShips.find((ship) => ship.whereAmI.length < 1);

		if (nextShip) {
			setShip(() => nextShip);
		} else {
			setPlayer2();
			setIsGameSetupDone(() => true);
		}
	};

	let classes = 'cells';

	return (
		<>
			<h2>Please place your ships wisely!</h2>

			<div
				className='grid-container'
				id='set-up-grid'
				onKeyDown={handleKeyDown}
				tabIndex={0}
			>
				{allCells.map((cell) => {
					classes = ' cells';
					cell.hasShip ? (classes += ' ship-cell') : (classes = classes);
					hovering.includes(cell.index)
						? (classes += ' placing-boat')
						: (classes = classes);
					cell.reserved ? (classes += ' reserved-cell') : (classes = classes);
					return (
						<div
							className={classes}
							key={cell.index + 'setup'}
							id={cell.index}
							onMouseEnter={(e) => handleMouseEnter(e)}
							onMouseLeave={() => handleMouseLeave()}
							onClick={() => handleSetupClick()}
						></div>
					);
				})}
			</div>
		</>
	);
};

export { GameSetup };
