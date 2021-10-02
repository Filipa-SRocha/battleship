import Cell from '../Cell/Cell';
import './RenderBoard.css';

function RenderBoard(props) {
	//player board, array of objects-cells

	let allCells = props.board;

	return (
		<>
			<div className='board'>
				<p>This is the board component talking as</p>

				<div className='grid-container'>
					{allCells.map(function (cell) {
						return <Cell info={cell} key={cell.position}></Cell>;
					})}
				</div>
			</div>
		</>
	);
}

export default RenderBoard;
