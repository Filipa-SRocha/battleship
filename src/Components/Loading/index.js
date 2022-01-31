import boat from '../../assets/barco.svg';
import { StyledLoader, StyledImg, BoatContainer } from './style';

function Loading() {
	return (
		<StyledLoader>
			<p>O computador está a posicionar os barcos.</p>
			<BoatContainer>
				<StyledImg src={boat} alt='Boat' />
				<StyledImg src={boat} alt='Boat' />
				<StyledImg src={boat} alt='Boat' />
			</BoatContainer>
		</StyledLoader>
	);
}

export default Loading;
