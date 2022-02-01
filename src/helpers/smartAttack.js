function makeRandomMove(enemyBoard) {
	let allCells = enemyBoard.board;

	let possibleMoves = allCells.filter((cell) => {
		return (cell.beenHit = false);
	});

	let randomMove = Math.floor(Math.random() * possibleMoves.length);
	return enemyBoard.board[randomMove];
}

export { makeRandomMove };
