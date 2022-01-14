import '../../Components/Cell';
import { useState, useContext, useEffect, useRef } from 'react';
import {
	limitPosition,
	getReservedCells,
} from '../../helpers/shipPlacementHelper';
import { GameContext } from '../NewGame/index';
import {
	Board,
	GridContainer,
	GridHorizontalLetters,
	GridVerticalNumbers,
} from '../../Components/BoardComponents';
import { PlacingCell } from '../../Components/Cell';

const ClickBoatPlacing = ({ player, playerSetupDone }) => {
	const { dispatch } = useContext(GameContext);

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

		placingArray.forEach((cellIndex) => {
			if (!availableIndexes.includes(cellIndex)) {
				canBePlaced = false;
			}
		});

		canBePlaced ? setHovering(() => placingArray) : setHovering(() => []);
	};

	const handleMouseLeave = () => {
		setHovering(() => []);
		console.log('Hovering', hovering);
	};

	// to focus on the grid after rendering
	const setUpGrid = useRef(null);
	useEffect(() => {
		if (setUpGrid.current) {
			setUpGrid.current.focus();
		}
	}, [setUpGrid]);

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
			playerSetupDone(() => true);
		}
	};

	let hovered;

	return (
		<Board>
			<h2>Please place your ships wisely!</h2>

			<GridHorizontalLetters player={player} />
			<GridVerticalNumbers player={player} />
			<GridContainer
				className='grid-container'
				ref={setUpGrid}
				onKeyDown={handleKeyDown}
				tabIndex={0}
			>
				{allCells.map((cell) => {
					hovered = hovering.includes(cell.index);
					return (
						<PlacingCell
							info={cell}
							key={cell.index + 'setup'}
							hovered={hovered}
							handleMouseLeave={handleMouseLeave}
							handleMouseEnter={handleMouseEnter}
							handleSetupClick={handleSetupClick}
						></PlacingCell>
					);
				})}
			</GridContainer>
		</Board>
	);
};

export default ClickBoatPlacing;
