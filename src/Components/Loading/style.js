import styled, { keyframes } from 'styled-components';

const upAndDown = keyframes`
  0% {
    transform: translateY(0em) rotate(0);;
    
  }

  25%{
		transform: rotate(-8deg);
	}


  50% {
    transform: translateY(-1em) rotate(0deg);

  }
  
  75%{
        transform: rotate(8deg);
    }

  100%{
      transform: translateY(0em) rotate(0); 
  }
`;

export const StyledLoader = styled.div`
	position: absolute;
	width: 100%;
	padding: 1rem 1rem;
	background-color: rgb(50, 75, 94, 0.8);
	display: flex;
	flex-direction: column;

	align-items: center;
`;

export const StyledImg = styled.img`
	max-width: 35px;
	display: inline-block;
	margin: 2px;
`;

export const BoatContainer = styled.div`
	display: inline-block;
	${StyledImg}:nth-child(1) {
		animation: ${upAndDown} 2s linear 1;
	}

	${StyledImg}:nth-child(2) {
		animation: ${upAndDown} 2s linear 1;
		animation-delay: 1s;
	}
	${StyledImg}:nth-child(3) {
		animation: ${upAndDown} 2s linear 1;
		animation-delay: 2s;
	}
`;
