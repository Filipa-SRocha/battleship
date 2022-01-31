import {
	StyledBoard,
	StyledGridContainer,
	StyledLetters,
	StyledNumbers,
	StyledDiv,
} from './style';

import { useRef, useEffect } from 'react';

function Board({ children, size }) {
	return <StyledBoard size={size}>{children}</StyledBoard>;
}

function GridHorizontalLetters({ player, size }) {
	return (
		<StyledLetters size={size}>
			{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((char) => {
				return (
					<StyledDiv key={player.id + char} size={size}>
						{char}
					</StyledDiv>
				);
			})}
		</StyledLetters>
	);
}

function GridVerticalNumbers({ player, size }) {
	return (
		<StyledNumbers size={size}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
				return (
					<StyledDiv key={player.id + n} size={size}>
						{n}
					</StyledDiv>
				);
			})}
		</StyledNumbers>
	);
}

function GridContainer({ children, handleKeyDown, size }) {
	// to focus on the grid after rendering
	const setUpGrid = useRef(null);
	useEffect(() => {
		if (setUpGrid.current) {
			setUpGrid.current.focus();
		}
	}, [setUpGrid]);

	return (
		<StyledGridContainer
			size={size}
			ref={setUpGrid}
			onKeyDown={(e) => handleKeyDown(e)}
			tabIndex={0}
		>
			{children}
		</StyledGridContainer>
	);
}
export { Board, GridHorizontalLetters, GridVerticalNumbers, GridContainer };
