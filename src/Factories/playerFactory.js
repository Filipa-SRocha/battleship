import GameBoard from './gameBoardFactory';
import Ships from './shipFactory';

const Player = (name) => {
	const makeRandomMove = (enemyBoard) => {
		let availableCells = enemyBoard.reduce((cell) => {
			return (cell.beenHit = false);
		});

		let randomMove = Math.floor(Math.random() * availableCells.length);
		return enemyBoard[randomMove];
	};

	let myTurn = false;

	const changeTurn = () => {
		myTurn = !myTurn;
	};

	return { name, makeRandomMove, changeTurn, myTurn };
};
export default Player;
