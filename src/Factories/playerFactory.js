import Gameboard from './gameBoardFactory';

const Player = (id, name) => {
	const gameboard = Gameboard();

	const myShips = gameboard.placeShips();

	// const makeRandomMove = (enemyBoard) => {
	// 	let availableCells = enemyBoard.reduce((cell) => {
	// 		return (cell.beenHit = false);
	// 	});

	// 	let randomMove = Math.floor(Math.random() * availableCells.length);
	// 	return enemyBoard[randomMove];
	// };

	return { id, name, gameboard, myShips };
};
export default Player;
