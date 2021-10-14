import Cell from '../Cell/Cell';
import '../RenderBoard/RenderBoard.css';
import { useState, useContext } from 'react';
import { GameContext } from '../../Game/Game';

const GameSetup = ({ player }) => {
	let allCells = player.gameboard.board;

	const { dispatch, setIsGameSetupDone } = useContext(GameContext);

	//state
	const [hovering, setHovering] = useState([]);
	const temp = player.myShips[0];
	const [ship, setShip] = useState(temp);

	const handleMouseEnter = (e, index) => {
		let placingArray = [];
		for (let i = 0; i < ship.length; i++) {
			placingArray.push(index + i);
		}
		setHovering(() => placingArray);
	};

	const handleMouseLeave = () => {
		setHovering(() => []);
	};

	const handleClick = () => {
		//new state boat
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

		//new state board
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

	return (
		<>
			<h2>Please place your ships wisely!</h2>

			<div className='grid-container'>
				{allCells.map((cell) => {
					return (
						<Cell
							info={cell}
							key={player.id + cell.position}
							player={player}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							onClick={handleClick}
							hover={hovering.includes(cell.index)}
						></Cell>
					);
				})}
			</div>
		</>
	);
};

export default GameSetup;
