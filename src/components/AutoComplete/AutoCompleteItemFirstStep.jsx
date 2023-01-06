import './AutoComplete.css';
export default function AutoCompleteItemFirstStep({
	option,
	setValue,
	setOptions,
	findCities,
}) {
	return (
		<li
			className="item"
			onClick={() => {
				setValue(option);
				setOptions([]);
				findCities(option);
			}}
		>
			<p className="itemCity">{option}</p>
		</li>
	);
}
