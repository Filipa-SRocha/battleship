const Ships = () => {
	const carrier = Ship('Carrier', 5);
	const battleship = Ship('Battleship', 4);
	const cruiser = Ship('Cruiser', 3);
	const submarine = Ship('Submarine', 3);
	const destroyer = Ship('Destroyer', 2);

	return [carrier, battleship, cruiser, submarine, destroyer];
};

const Ship = (name, length) => {
	let hits = [];

	const gotHit = (position) => {
		hits.push(position);
	};

	const isSunk = () => hits.length >= length;

	const whereAmI = [];

	return { name, length, hits, gotHit, isSunk, whereAmI };
};

export default Ships;
