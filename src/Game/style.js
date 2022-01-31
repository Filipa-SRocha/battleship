import styled from 'styled-components';

export const EasyModeContainer = styled.div`
	display: grid;
	height: 100vh;
	grid-template-columns: 1fr 3fr 1fr;
`;

export const HumanPlayerBoard = styled.div`
	& p {
		text-align: center;
		font-size: 20px;
		font-weight: 800;
	}
	align-self: flex-start;
`;

export const ComputerBoard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StyledContainer = styled.div``;
