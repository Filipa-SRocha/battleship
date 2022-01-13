import styled from 'styled-components';
import boatImg from '../../assets/barco.svg';
import wavesImg from '../../assets/whiteWaves.svg';

function handleBackGroungImg(props) {
	if (props.boatGotHit) {
		return `url(${boatImg})`;
	} else if (props.water) {
		return `url(${wavesImg})`;
	} else {
		return 'none';
	}
}

export const CellContainer = styled.div`
	border: 1px solid black;
	width: 30px;
	height: 30px;
	background: #9ac0c1;
	cursor: ${(props) =>
		props.showGame
			? "url('../../assets/output-onlinepngtools.png') 8 10, auto"
			: 'pointer'};
	background-color: ${(props) => (props.shipCell ? 'chocolate' : '#9ac0c1')};
	background-image: ${(props) => handleBackGroungImg(props)};
`;
