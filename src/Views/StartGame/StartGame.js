import PlayButton from '../../Components/PlayButton/PlayButton';
import './StartGame.css';

function NewGame() {
	return (
		<div className='new-game-container'>
			<h1>BATTLESHIP - THE GAME</h1>

			<p>Please Select Game Mode:</p>

			<div id='buttons-container'>
				<PlayButton text='1 Player (easy mode)' id='easy-mode' />
				<PlayButton text='1 Player (hard mode)' id='hard-mode' disable />
				<PlayButton text='2 Players' id='two-players' />
			</div>
		</div>
	);
}

export default NewGame;
