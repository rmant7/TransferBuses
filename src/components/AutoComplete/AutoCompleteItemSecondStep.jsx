import './AutoComplete.css';
export default function AutoCompleteItemSecondStep ({
	city,
	resultClick,
	setJson
}) {
	// const [region, setRegion] = useState(null)
	// console.log(city)
	// console.log(city.properties.display_name)
	
	// const nameOfCity = () => {
	// 	let nameCityArr;
	// 	if(city){
	// 		nameCityArr = city.properties.display_name.spit(',')
	// 	}

	// 	console.log(nameCityArr);
	// }
	return (
		<li
			className="item"
			onClick={() => {
				resultClick({
					geometry: city.geometry,
					display_name: city.city,
				});
				setJson([]);
			}}
		>
			<p className="itemCity">{city.city}</p>
			<div className="itemWrapCountry">

		{city.county && <p className="itemCountry">{city.county},</p>}	
			<p className="itemCountry">{city.country}</p>
			</div>
		</li>
	);
}
