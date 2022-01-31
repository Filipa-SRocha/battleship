import styled from 'styled-components';

export const StyledBoard = styled.div`
	width: ${(props) => (props.size === 'big' ? '360px' : '240px')};
	height: ${(props) => (props.size === 'big' ? '360px' : '240px')};
	display: grid;
	grid-template-rows: 3fr 5fr;
	grid-template-columns: 1fr 5fr;
	grid-template-areas:
		'letters letters'
		'numbers board';
	margin: 20px;
`;

export const StyledDiv = styled.div`
	border: 1px solid transparent;
	width: ${(props) => (props.size === 'big' ? '30px' : '20px')};
	height: ${(props) => (props.size === 'big' ? '30px' : '20px')};
`;

export const StyledLetters = styled.div`
	width: ${(props) => (props.size === 'big' ? '330px' : '220px')};
	height: ${(props) => (props.size === 'big' ? '30px' : '20px')};
	display: grid;
	grid-area: letters;
	grid-template-columns: repeat(10, 1fr);
	font-size: ${(props) => (props.size === 'big' ? '18px' : '12px')};
	text-align: center;
	border: 2px solid transparent;
	margin: 0 30px;
	margin: ${(props) => (props.size === 'big' ? '0 30px' : '0 20px')};
`;

export const StyledNumbers = styled.div`
	width: ${(props) => (props.size === 'big' ? '30px' : '20px')};
	height: ${(props) => (props.size === 'big' ? '330px' : '220px')};
	display: grid;
	grid-area: numbers;
	grid-template-rows: repeat(10, 1fr);
	border: 2px solid transparent;
	text-align: center;
	font-size: ${(props) => (props.size === 'big' ? '18px' : '12px')};
`;

export const StyledGridContainer = styled.div`
	width: ${(props) => (props.size === 'big' ? '330px' : '220px')};
	height: ${(props) => (props.size === 'big' ? '330px' : '220px')};
	display: grid;
	grid-area: board;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(10, 1fr);
	border: 2px solid black;
`;
