import {
	StyledBoard,
	StyledGridContainer,
	StyledLetters,
	StyledNumbers,
} from './style';

import { useRef, useEffect } from 'react';

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

function GridContainer({ children, handleKeyDown }) {
	console.log('inside grid container');
	// to focus on the grid after rendering
	const setUpGrid = useRef(null);
	useEffect(() => {
		if (setUpGrid.current) {
			setUpGrid.current.focus();
		}
	}, [setUpGrid]);

	return (
		<StyledGridContainer
			ref={setUpGrid}
			onKeyDown={(e) => handleKeyDown(e)}
			tabIndex={0}
		>
			{children}
		</StyledGridContainer>
	);
}
export { Board, GridHorizontalLetters, GridVerticalNumbers, GridContainer };
