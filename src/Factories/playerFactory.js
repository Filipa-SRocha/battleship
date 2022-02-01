import Gameboard from './gameBoardFactory';

const Player = (id, name) => {
	const gameboard = Gameboard();

	const myShips = gameboard.placeShips();

	return { id, name, gameboard, myShips };
};
export default Player;
