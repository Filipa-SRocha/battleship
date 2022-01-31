import '../../Components/Cell';
import { useState, useContext } from 'react';
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
import { StyledContainer, Pannels, InstructionsContainer } from './style.js';

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

	const handleMouseLeave = () => setHovering(() => []);

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

	return (
		<StyledContainer>
			<h2>Please place your ships wisely!</h2>
			<Pannels>
				<Board>
					<GridHorizontalLetters player={player} size='big' />
					<GridVerticalNumbers player={player} size='big' />
					<GridContainer handleKeyDown={handleKeyDown} size='big'>
						{allCells.map((cell) => {
							let hovered = hovering.includes(cell.index);
							return (
								<PlacingCell
									info={cell}
									key={cell.index + 'setup'}
									hovered={hovered}
									handleMouseLeave={handleMouseLeave}
									handleMouseEnter={handleMouseEnter}
									handleSetupClick={handleSetupClick}
									size='big'
								></PlacingCell>
							);
						})}
					</GridContainer>
				</Board>
				<InstructionsContainer>
					<h3>Instructions</h3>
					<p>
						Para mudar a direcção do barco (horizontal/vertical) carregue na
						tecla de espaço
					</p>
					<p>
						Por favor coloque o mouse em cima do tabuleiro do jogo e clique para
						posicionar o seu barco
					</p>
				</InstructionsContainer>
			</Pannels>
		</StyledContainer>
	);
};

export default ClickBoatPlacing;
