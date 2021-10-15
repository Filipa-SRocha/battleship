import '../Cell/cell.css';
import '../RenderBoard/RenderBoard.css';
import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../Game/Game';

const GameSetup = ({ player }) => {
	let allCells = player.gameboard.board;

	const { dispatch, setIsGameSetupDone } = useContext(GameContext);

	//state
	const [hovering, setHovering] = useState([]);
	const temp = player.myShips[0];
	const [ship, setShip] = useState(temp);
	const [axis, setAxis] = useState('x');

	const handleMouseEnter = (e) => {
		let index = Number(e.target.id);

		let n;
		axis === 'x' ? (n = 1) : (n = 10);

		let maxIndex;

		axis === 'x'
			? (maxIndex = limitPosition(index) - ship.length + 1)
			: (maxIndex = limitPosition(index) - (ship.length - 1) * 10);

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
		//new state (boat)
		let newShips = [];
		let updatedShip = {};
		player.myShips.forEach((myShip) => {
			let newShip = { ...myShip };
			if (myShip === ship) {
				newShip.whereAmI = hovering;
				updatedShip = { ...newShip };
				newShips.push(newShip);
			} else {
				newShips.push(myShip);
			}
		});

		//new state (board)
		let newBoard = [];
		player.gameboard.board.forEach((cell) => {
			let newCell = { ...cell };
			if (hovering.includes(cell.index)) {
				newCell.hasShip = updatedShip;
			}
			newBoard.push(newCell);
		});

		dispatch({ type: 'PLACE_BOAT', payload: [newBoard, newShips] });

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

	const limitPosition = (index_start) => {
		let max;
		if (axis === 'x') {
			max =
				String(index_start).length >= 2 ? String(index_start)[0] + '9' : '9';
		} else {
			max =
				String(index_start).length >= 2
					? '9' + String(index_start)[1]
					: '9' + String(index_start)[0];
		}

		return Number(max);
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
