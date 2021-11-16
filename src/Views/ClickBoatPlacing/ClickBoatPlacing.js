import '../../Components/Cell/Cell';
import '../../Components/RenderBoard/RenderBoard';
import { useState, useContext, useEffect } from 'react';
import {
	limitPosition,
	getReservedCells,
} from '../../helpers/shipPlacementHelper';
import { GameContext } from '../../Game/Game';

const ClickBoatPlacing = ({ player }) => {
	const { dispatch, setIsGameSetupDone } = useContext(GameContext);

	const [hovering, setHovering] = useState([]);
	const [ship, setShip] = useState(player.myShips[0]);
	const [axis, setAxis] = useState('x');

	let allCells = player.gameboard.board;

	const handleMouseEnter = (e) => {
		let index = Number(e.target.id);

		let n;
		axis === 'x' ? (n = 1) : (n = 10);

		let maxIndex = limitPosition(index, axis, ship.length);

		let placingArray = [];
		let boatHead;

		index <= maxIndex ? (boatHead = index) : (boatHead = maxIndex);

		for (let i = 0; i < ship.length; i++) {
			placingArray.push(boatHead + i * n);
		}

		let canBePlaced = true;
		let availableIndexes = player.gameboard
			.availableCellsForShips(player.gameboard.board)
			.map((cell) => cell.index);
		console.log(availableIndexes);

		placingArray.forEach((cellIndex) => {
			if (!availableIndexes.includes(cellIndex)) {
				canBePlaced = false;
			}
		});

		canBePlaced ? setHovering(() => placingArray) : setHovering(() => []);
	};

	const handleMouseLeave = () => {
		setHovering(() => []);
	};

	useEffect(() => {
		document.getElementById('set-up-grid').focus();
	});

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
			setIsGameSetupDone(() => true);
		}
	};

	let classes;

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
					cell.hasShip
						? (classes += ' ship-cell unclickable')
						: (classes = classes);
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

export default ClickBoatPlacing;
