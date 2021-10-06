import Cell from '../Cell/Cell';
import './RenderBoard.css';
import { Game, GameContext } from '../../Game/Game';
import { useContext } from 'react';

function RenderBoard(props) {
	//player board, array of objects-cells

	let { turn } = useContext(GameContext);
	let allCells = props.board;
	let classes = 'board-area';

	if (props.player === turn) {
		classes = classes + ' my-turn';
	}

	return (
		<div className={classes}>
			<div className='letters'>
				{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char) => {
					return <span>{char}</span>;
				})}
			</div>
			<div className='numbers'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
					return <span>{n}</span>;
				})}
			</div>
			<div className='grid-container'>
				{allCells.map((cell) => {
					return (
						<Cell info={cell} key={cell.position} player={props.player}></Cell>
					);
				})}
			</div>
		</div>
	);
}

export default RenderBoard;
