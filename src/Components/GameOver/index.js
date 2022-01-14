import PlayButton from '../PlayButton/index';
import { GameContext } from '../../Views/NewGame/index';
import { useContext } from 'react';
import { ModalContainer } from './style';

function GameOver({ winner }) {
	const { isGameOver, turn } = useContext(GameContext);

	return isGameOver ? (
		<ModalContainer>
			<h2>GAME OVER</h2>
			<p>{turn} is the winner!!!!</p>

			<div>
				<PlayButton text='New Game' />
			</div>
		</ModalContainer>
	) : (
		''
	);
}

export default GameOver;
