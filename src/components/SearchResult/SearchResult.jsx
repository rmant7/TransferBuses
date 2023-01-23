import './SearchResult.css';
export default function SearchResult({ city, resultClick }) {
	return (
		<div
			className="SearchResult"
			onClick={() => {
				resultClick({
					geometry: city.geometry.coordinates,
					display_name: city.properties.display_name,
				});
			}}
		>
			<p className="name">{city.properties.display_name}</p>
			<p>
				<b>latitude</b>:{city.geometry.coordinates[1]}
			</p>
			<p>
				<b>longitude</b>:{city.geometry.coordinates[0]}
			</p>
		</div>
	);
}