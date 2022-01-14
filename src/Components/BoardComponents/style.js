import styled from 'styled-components';

export const StyledBoard = styled.div`
	margin: 20px;
	width: 350px;
	height: 350px;
	display: grid;
	grid-template-rows: 3fr 5fr;
	grid-template-columns: 1fr 5fr;
	grid-template-areas:
		'letters | letters'
		'numbers | board';
`;

export const StyledLetters = styled.div`
	width: 330px;
	height: 20px;
	display: grid;
	grid-area: letters;
	grid-template-columns: repeat(10, 1fr);
	margin: -20px 20px;
	text-align: center;
`;

export const StyledNumbers = styled.div`
	width: 20px;
	height: 330px;
	display: grid;
	text-align: end;
	grid-area: numbers;
	margin: 5px -10px;
	grid-template-rows: repeat(10, 1fr);
`;

export const StyledGridContainer = styled.div`
	width: 330px;
	height: 330px;
	display: grid;
	grid-area: board;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(10, 1fr);
	border: 2px solid black;
	margin: 2px 20px;
`;
