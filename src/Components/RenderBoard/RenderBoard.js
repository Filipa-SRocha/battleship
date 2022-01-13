import Cell from '../Cell/index';
import './RenderBoard.css';
import { GameContext } from '../../Views/NewGame/NewGame';
import { useContext } from 'react';

function RenderBoard({ player, handleClick }) {
	//player board, array of objects-cells

	let { turn } = useContext(GameContext);
	let allCells = player.gameboard.board;
	let classes = 'board-area';

	if (player.id === turn) {
		classes = classes + ' my-turn';
	}

	return (
		<div className={classes}>
			<h1>{player.id}</h1>
			<div className='letters'>
				{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char) => {
					return <span key={player.id + char}>{char}</span>;
				})}
			</div>
			<div className='numbers'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
					return <span key={player.id + n}>{n}</span>;
				})}
			</div>
			<div className='grid-container'>
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
			</div>
		</div>
	);
}

export default RenderBoard;
