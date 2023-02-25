import data from '../../utils/locations.json';

export const findMyCities = (geometry, setMyJson) => {
	///*****active on step 2********** */
	let lat1 = geometry[1];
	let lon1 = geometry[0];
	let distance = 20000;
	let resultCity = {};
	let lat2, lon2, a, d;
	let p = 0.017453292519943295;
	let c = Math.cos;
	Object.values(data).forEach((e) => {
		lat2 = e.latitude;
		lon2 = e.longitude;
		a =
			0.5 -
			c((lat2 - lat1) * p) / 2 +
			(c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

		d = 12742 * Math.asin(Math.sqrt(a));
		if (d <= distance) {
			distance = d;
			resultCity = {
				geometry: { coordinates: [lon2, lat2] },
				properties: { display_name: e.name },
			};
		}
	});

	let midData = [resultCity];
	setMyJson(midData);
	/* console.log(midData); */
};
