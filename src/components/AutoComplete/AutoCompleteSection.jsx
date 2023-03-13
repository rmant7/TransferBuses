import { useState } from "react";
import AutoComplete from "./AutoComplete";
import "./AutoComplete.css";
import { findMyCities } from "./findMyCities";
import { sortingByString } from "./sortingByString";
// import { useDispatch } from 'react-redux';
import i18n from "../../i18n";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@material-ui/core";
import classes from "../SearchCheapTrip/SearchComponent.module.css";
import SearchResultView from "../SearchResult/SearchResultView";
import SearchFailResultView from "../SearchResult/SearchFailResultView";

import travelData from "../../cheapTripData/routes.json"; //----travel_data.json
import dataNew from "../../cheapTripData/locations.json";
import RoutesList  from "./RoutesList";

export const AutoCompleteSection = () => {
	const [cityName, setCityName] = useState(""); ///******data from input FROM******** */
	const [cityNameTo, setCityNameTo] = useState(""); ///******data from input TO******** */
	const [optionsFrom, setOptionsFrom] = useState([]); ///******matches between api and input FROM************* */
	const [optionsTo, setOptionsTo] = useState([]); ///******matches between api and input TO************* */
	const [jsonFrom, setJsonFrom] = useState(null); ///*******matches data before step 2 (input FROM)********** */
	const [jsonTo, setJsonTo] = useState(null); ///*******matches data before step 2 (input TO)********** */
	const [myJson, setMyJson] = useState(null); ////////***data after step2***************** */ */
	const [myJson2, setMyJson2] = useState(null); ////////***data after step2***************** */ */
	const [isResult, setIsResult] = useState(false); //------ for display layout of Search results after click
	const [isFailResult, setIsFailResult] = useState(false);
	const [resultOfSearch, setResultOfSearch] = useState(null);
	const [isActiveTo, setIsActiveTo] = useState(false);
	const [routesList, setRoutesList] = useState([]); ////////****data after click and secod input has value Anywhere***/

	const findCityData = (curCity) => {
		const result = Object.values(dataNew).filter((item) => {
			//   console.log(item);
			if (item.name === curCity[0].properties.display_name) return item;
			// return [];
		});

		return result[0];
	};

	const findRoutes = (cityFrom, cityTo) => {
		const result = [];
		Object.values(travelData).forEach((item) => {
			if (
				item.from === parseInt(cityFrom.id) &&
				item.to === parseInt(cityTo.id)
			)
				result.push(item);
		});
		return result;
	};

	const resultClick = ({ geometry, display_name }) => {
		///**active after click on step 2**************** */ */
		findMyCities(geometry, setMyJson);
	};

	const resultClick2 = ({ geometry, display_name }) => {
		///**active after click on step 2**************** */ */
		findMyCities(geometry, setMyJson2);
	};

	const findAutocomplete = async (cityName) => {
		///****active after change input********* */
		const url = `https://photon.komoot.io/api/?q=${cityName}&osm_tag=place:city`;
		const response = await fetch(url);
		let data = (await response.json()).features;
		/* const coordinates = data.map(city=> city.geometry.coordinates);
        console.log(coordinates); */
		return data;
	};

	const cityMatcher = async (text) => {
		///****active after change input********* */
		let matches = [];
		if (text.length > 0) {
			const data = await findAutocomplete(text);
			matches = data.map((feature) => feature.properties.name);
			matches = matches.filter((a, b) => matches.indexOf(a) === b);
			matches = await sortingByString(matches, text);
		}
		return matches;
	};

	const onChangeHandlerFrom = async (text) => {
		///****active after change input********* */
		setCityName(text);
		setOptionsFrom(await cityMatcher(text));
	};

	const onChangeHandlerTo = async (text) => {
		///****active after change input********* */
		setCityNameTo(text);
		setOptionsTo(await cityMatcher(text));
	};

	const findCities = async (cityName) => {
		///********active on step 1******** */
		const url = `https://nominatim.openstreetmap.org/search?city=${cityName}&format=geojson&limit=10`;
		return fetch(url).then((response) => response.json());
	};

	const sortCitiesByImportance = (data) => {
		return data.features.sort(
			(firstData, secondData) =>
				secondData.properties.importance - firstData.properties.importance
		);
	};

	const findCitiesFrom = async (cityName) => {
		///********active on step 1******** */
		findCities(cityName).then((data) => {
			const sortedData = sortCitiesByImportance(data);
			setJsonFrom(sortedData);
		});
	};
	const findCitiesTo = async (cityName) => {
		///********active on step 1******** */
		findCities(cityName).then((data) => {
			const sortedData = sortCitiesByImportance(data);
			/* const sortedDataByAlf = sortedData.sort((a, b) =>
              a.properties.display_name.localeCompare(b.properties.display_name)
            ); */
			setJsonTo(sortedData);
		});
	};

	// const dispatch = useDispatch();
	const handleClearFields = () => {
		// dispatch(onChangeHandlerFrom(''));
		// dispatch(onChangeHandlerTo(''));
		setCityNameTo("");
		setCityName("");
		setIsResult(false);
		setIsFailResult(false);
	};

	const handleClearInputFrom = () => {
		// dispatch(onChangeHandlerFrom(''));
		setCityName("");
		setIsResult(false);
		setIsFailResult(false);
	};

	const handleClearInputTo = () => {
		// dispatch(onChangeHandlerTo(''));
		setCityNameTo("");
		setIsResult(false);
		setIsFailResult(false);
	};
	const handleClickResults = () => {
		if(cityNameTo !== "Anywhere"){
			setRoutesList([]);
			const result = [];
			// console.log(myJson);
			// console.log(myJson2);
			const cityFromYouTravel = findCityData(myJson);
			const cityToYouTravel = findCityData(myJson2);
			// console.log(cityFromYouTravel);

			result.push(findRoutes(cityFromYouTravel, cityToYouTravel));
			console.log(result);
			if (
				result[0] === "We have not found such a route" ||
				result[0].length === 0
				// result[0] === []
			) {
				setIsResult(false);
				setIsFailResult(true);
			} else {
				setIsResult(true);
				setIsFailResult(false);
				setResultOfSearch(result);
			}
		}
		else if(cityNameTo === "Anywhere"){
			setIsResult(false);
			setResultOfSearch([]);
			onBtnClick();

		}

	};

	const getIdByCityFrom = (cityName) => {
		const values = Object.values(dataNew);
		const filtered = values.filter((item) => cityName === item.name);
		return filtered[0].id;
	};

	const getListRoutes = () => {

		const cityFromId = getIdByCityFrom(cityName);
		const values = Object.values(travelData);
		const filtered = values.filter((item) => cityFromId === item.from);
		getCitiesToListById(filtered);
		return filtered;
	};

	const getCitiesToListById = (filterArray) => {
		const values = Object.values(dataNew);
		let cache;
		const ln1 = values.length;
		const ln2 = routesList.length;
		for(let i=0;i<filterArray.length;i++){
			routesList[i] = filterArray[i]
		}
		for (let i = 0; i < ln1; ++i) {
			cache = values[i];
			setRoutesList(routesList.map((item)=>{
				if(cache.id === item.to){
					item.city = cache.name;
					item.country = cache.country_name;
					return routesList.push(item)

				}
				else{
					return item;
				}
			}))
		}
	};

	const onBtnClick = () => {
		const array = getListRoutes();
		const sorted = array.sort((a, b) => (a.euro_price > b.euro_price ? 1 : -1));
		setRoutesList(sorted);
	};
	//   import travelData from "../../cheapTripData/routes.json";
	// import dataNew from "../../cheapTripData/locations.json";

	return (
		<div>
			<div className="autoCompleteSection">
				<div className="autoComplete_item">
					<AutoComplete
						onChange={(e) => {
							onChangeHandlerFrom(e.target.value);
						}}
						placeholder="From"
						value={cityName}
						setValue={setCityName}
						options={optionsFrom}
						setOptions={setOptionsFrom}
						findCities={findCitiesFrom}
						resultClick={resultClick}
						json={jsonFrom}
						setJson={setJsonFrom}
					/>
					{
						<CloseIcon
							variant="outlined"
							onClick={handleClearInputFrom}
							style={{ cursor: "pointer" }}
						/>
					}
				</div>
				<DoubleArrowIcon className={classes.media_icon} />
				<div className="autoComplete_item">
					<AutoComplete
						onChange={(e) => {
							onChangeHandlerTo(e.target.value);
						}}
						placeholder="To"
						value={cityNameTo}
						setValue={setCityNameTo}
						options={optionsTo}
						setOptions={setOptionsTo}
						findCities={findCitiesTo}
						resultClick={resultClick2}
						json={jsonTo}
						setJson={setJsonTo}
						isActiveTo={isActiveTo}
						setIsActiveTo={setIsActiveTo}
					/>
					{
						<CloseIcon
							variant="outlined"
							onClick={handleClearInputTo}
							style={{ cursor: "pointer" }}
						/>
					}
				</div>
			</div>
			<div className={classes.filter_buttons}>
				<Button variant="outlined" onClick={handleClearFields} type="reset">
					{i18n.t("Clean")}
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClickResults}
					style={{ marginLeft: "10px" }}
					type="button"
				>
					{i18n.t("Let's Go")}
				</Button>
			</div>
			{routesList.length > 0 &&
				<RoutesList list={routesList.slice(0, 10)} cityFrom={myJson[0].properties.display_name || 'Loading'}/>}

			{isResult && (
				<SearchResultView
					data={resultOfSearch[0][0]}
					cityFrom={myJson[0].properties.display_name}
					cityTo={myJson2[0].properties.display_name}
				/>
			)}
			{isFailResult && <SearchFailResultView />}
		</div>
	);
};