import {
	StyledBoard,
	StyledGridContainer,
	StyledLetters,
	StyledNumbers,
} from './style';

function Board({ children }) {
	return <StyledBoard>{children}</StyledBoard>;
}

function GridHorizontalLetters({ player }) {
	return (
		<StyledLetters>
			{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char) => {
				return <span key={player.id + char}>{char}</span>;
			})}
		</StyledLetters>
	);
}

function GridVerticalNumbers(player) {
	return (
		<StyledNumbers>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
				return <span key={player.id + n}>{n}</span>;
			})}
		</StyledNumbers>
	);
}

function GridContainer({ children }) {
	return <StyledGridContainer> {children}</StyledGridContainer>;
}
export { Board, GridHorizontalLetters, GridVerticalNumbers, GridContainer };
