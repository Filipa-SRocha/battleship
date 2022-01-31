import { GameContext } from '../../Views/NewGame/index';
import { useContext } from 'react';
import { StyledButton } from './style';

function PlayButton(props) {
	let { text, id } = props;
	let disabledButton = false;
	let { setGameMode } = useContext(GameContext);

	if (props.disable) {
		disabledButton = true;
	}

	function handleClick(e) {
		setGameMode(() => e.target.id);
	}

	return (
		<StyledButton disabledButton={disabledButton} id={id} onClick={handleClick}>
			{text}
		</StyledButton>
	);
}

export default PlayButton;
