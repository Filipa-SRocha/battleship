import './cell.css';
import { useContext } from 'react';
import { CellContext } from '../../Game';

function Cell({ info: { position, hasShip, beenHit } }) {
	const handleClick = useContext(CellContext);

	if (hasShip) {
		return (
			<div className='cells ship-cell' onClick={() => handleClick(position)}>
				<p>{position}</p>
			</div>
		);
	}
	return (
		<div className='cells'>
			<p>{position}</p>
		</div>
	);
}

export default Cell;
