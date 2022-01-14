import styled from 'styled-components';

export const ModalContainer = styled.div`
	height: 40%;
	width: 40%;
	background-color: rgba(105, 2, 2, 0.466);
	position: absolute;
	backdrop-filter: blur(2px);
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	p {
		font-size: 2em;
	}

	h2 {
		font-size: 3em;
	}
`;
