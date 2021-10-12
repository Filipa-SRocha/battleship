import './RenderShips.css';

function RenderShips(props) {
	let ships = props.ships;
	let cells = [];

	ships.forEach((ship) => {
		cells = [];
		for (let i = 0; i <= ship.length; i++) {
			cells.push(<div className='boat-cells' key={ship.name + i}></div>);
		}
		ship.cells = cells;
	});

	return (
		<div className='ships-container'>
			<p>Ships</p>
			{ships.map((ship) => {
				return (
					<div className='boat' key={' boatcontainer ' + ship.name}>
						<p key={' boatName ' + ship.name}>{ship.name}</p>
						<div
							id={'cellContainer' + ship.name}
							className='boat-cells-container'
							key={'cellContainer' + ship.name}
						>
							{ship.cells}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default RenderShips;
