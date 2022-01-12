import './PlayButton.css';
import { GameContext } from '../../Views/NewGame/NewGame';
import { useContext } from 'react';

function PlayButton(props) {
	let { text, id } = props;
	let classes;
	let { setGameMode, gameMode } = useContext(GameContext);

	if (props.disable) {
		classes = 'disabled';
	}

	function handleClick(e) {
		setGameMode(() => e.target.id);
		console.log(gameMode);
	}

	return (
		<button className={classes} id={id} onClick={handleClick}>
			{text}
		</button>
	);
}

export default PlayButton;
