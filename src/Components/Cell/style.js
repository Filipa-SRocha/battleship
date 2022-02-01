import styled from 'styled-components';
import boatImg from '../../assets/barco.svg';
import wavesImg from '../../assets/whiteWaves.svg';
import target from '../../assets/target_icon.cur';

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
	width: ${(props) => (props.size === 'big' ? '30px' : '20px')};
	height: ${(props) => (props.size === 'big' ? '30px' : '20px')};
	background: #9ac0c1;
	pointer-events: ${(props) => (props.size === 'big' ? 'auto' : 'none')};
`;

export const CellContainer = styled(BasicCellContainer)`
	background-color: ${(props) => (props.shipCell ? 'chocolate' : '#9ac0c1')};
	background-image: ${(props) => handleBackGroungImg(props)};
`;

export const PlacingCellContainer = styled(BasicCellContainer)`
	background-color: ${(props) => handleBackgroundColor(props)};
	pointer-events: ${(props) => (props.unclickable ? 'none' : 'inherit')};
	cursor: ${(props) => (props.unclickable ? 'progress' : 'inherit')};
`;
