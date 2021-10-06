function RenderShips(props) {
	let ships = props.ships;

	return (
		<div className='ships-container'>
			<p>Ships</p>
			{ships.map((ship) => {
				return (
					<p>
						{ship.name}({ship.length})
					</p>
				);
			})}
		</div>
	);
}

export default RenderShips;
