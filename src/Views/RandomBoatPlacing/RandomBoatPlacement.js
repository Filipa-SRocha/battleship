import { useEffect } from 'react';
import RenderBoard from '../../Components/RenderBoard/RenderBoard';

function RandomBoatPlacement(player) {
	useEffect(() => {
		document.querySelectorAll('.cells').forEach((cell) => {
			cell.classList.add('light-up');
		});
	});

	return <RenderBoard player={player} />;
}

export default RandomBoatPlacement;
