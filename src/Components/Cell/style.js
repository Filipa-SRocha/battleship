import styled, { keyframes } from 'styled-components';
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

function handleBackgroundColor(props) {
	if (props.shipCell) {
		return 'blue';
	} else if (props.reserved) {
		return 'pink';
	} else if (props.hovered) {
		return 'black';
	} else {
		return '#9ac0c1';
	}
}

const BasicCellContainer = styled.div`
	border: 1px solid black;
	width: 30px;
	height: 30px;
	background: #9ac0c1;
`;

export const CellContainer = styled(BasicCellContainer)`
	cursor: ${(props) =>
		props.showGame
			? "url('../../assets/output-onlinepngtools.png') 8 10, auto"
			: 'pointer'};
	background-color: ${(props) => (props.shipCell ? 'chocolate' : '#9ac0c1')};
	background-image: ${(props) => handleBackGroungImg(props)};
`;

export const PlacingCellContainer = styled(BasicCellContainer)`
	background-color: ${(props) => handleBackgroundColor(props)};
	pointer-events: ${(props) => (props.unclickable ? 'none' : 'inherit')};
	cursor: ${(props) => (props.unclickable ? 'progress' : 'inherit')};
`;

const colorRun = keyframes`
	0% {
		background-color: #3c4a4b;
	}
`;

// .light-up {
// 	animation: color-run 900ms 1;
// }
