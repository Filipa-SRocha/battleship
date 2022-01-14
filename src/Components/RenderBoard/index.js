import { Cell } from '../Cell/index';
import { GameContext } from '../../Views/NewGame/index';
import { useContext } from 'react';
import {
	Board,
	GridContainer,
	GridHorizontalLetters,
	GridVerticalNumbers,
} from '../BoardComponents';

function RenderBoard({ player, handleClick }) {
	//player board, array of objects-cells

	let { turn } = useContext(GameContext);
	let allCells = player.gameboard.board;
	let classes = 'board-area';

	if (player.id === turn) {
		classes = classes + ' my-turn';
	}

	return (
		<Board>
			<h1>{player.id}</h1>

			<GridHorizontalLetters player={player} />
			<GridVerticalNumbers player={player} />

			<GridContainer>
				{allCells.map((cell) => {
					return (
						<Cell
							info={cell}
							key={player.id + cell.position}
							player={player}
							handleClick={handleClick}
						></Cell>
					);
				})}
			</GridContainer>
		</Board>
	);
}

export default RenderBoard;
