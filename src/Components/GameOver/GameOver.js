import './GameOver.css';
import PlayButton from '../PlayButton/PlayButton';

function GameOver({ winner }) {
	return (
		<div id='modal-container'>
			<h2 className='title'>GAME OVER</h2>
			<p>{winner} is the winner!!!!</p>

			<div>
				<PlayButton text='New Game' />
			</div>
		</div>
	);
}

export default GameOver;
