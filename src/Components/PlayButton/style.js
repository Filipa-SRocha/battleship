import styled from 'styled-components';

export const StyledButton = styled.button`
	border-radius: 10px;
	border: 2px solid;
	border-color: ${(props) =>
		props.disabledButton ? 'grey' : 'rgb(23, 61, 110)'};
	background-color: ${(props) =>
		props.disabledButton ? 'grey' : 'rgb(39, 127, 199)'};
	color: ${(props) => (props.disabledButton ? 'rgb(88, 88, 88)' : 'black')};
	text-align: center;
	padding: 8px 12px;
	margin: 5px;

	pointer-events: ${(props) => (props.disabledButton ? 'none' : 'inherit')};
	&:hover {
		background-color: rgb(23, 61, 110);
	}
`;
