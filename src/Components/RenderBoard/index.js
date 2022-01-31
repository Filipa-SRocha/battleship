import { Cell } from '../Cell/index';
import { GameContext } from '../../Views/NewGame/index';
import { useContext } from 'react';
import {
	Board,
	GridContainer,
	GridHorizontalLetters,
	GridVerticalNumbers,
} from '../BoardComponents';

function RenderBoard({ player, handleClick, size }) {
	//player board, array of objects-cells

	let { turn } = useContext(GameContext);
	let allCells = player.gameboard.board;
	// let size = 'small';

	return (
		<Board size={size}>
			<GridHorizontalLetters player={player} size={size} />
			<GridVerticalNumbers player={player} size={size} />

			<GridContainer size={size}>
				{allCells.map((cell) => {
					return (
						<Cell
							info={cell}
							key={player.id + cell.position}
							player={player}
							handleClick={handleClick}
							size={size}
						></Cell>
					);
				})}
			</GridContainer>
		</Board>
	);
}

export default RenderBoard;
