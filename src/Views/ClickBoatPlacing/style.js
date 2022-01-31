import styled from 'styled-components';

export const StyledContainer = styled.div`
	margin: auto;
	width: 100%;
	background-color: rgb(89, 135, 171, 0.7);
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		margin: 20px;
	}
`;

export const Pannels = styled.div`
	height: 80%;
	display: flex;
	align-items: baseline;
	justify-content: space-around;
`;

export const InstructionsContainer = styled.div`
	/* background-color: rgb(50, 75, 94, 0.8); */
	width: 45%;
	height: fit-content;
	padding: 0 2%;
	h3 {
		text-align: center;
		margin: 10px;
	}
	p {
		margin-bottom: 10px;
	}
`;
