import './PlayButton.css';
import { GameContext } from '../../Game/Game';
import { useContext } from 'react';

function PlayButton(props) {
	let { text, id } = props;
	let classes;
	let { setGameMode } = useContext(GameContext);

	if (props.disable) {
		classes = 'disabled';
	}

	function handleClick(e) {
		console.log(e.target.id);
		setGameMode(() => e.target.id);
	}

	return (
		<button className={classes} id={id} onClick={handleClick}>
			{text}
		</button>
	);
}

export default PlayButton;
