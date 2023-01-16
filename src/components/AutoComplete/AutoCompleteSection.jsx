import { useState } from "react";
import AutoComplete from "./AutoComplete";
import "./AutoComplete.css";
import { HiChevronDoubleRight } from "react-icons/hi";
import { findMyCities } from "./findMyCities";
import SearchResult from "../SearchResult/SearchResult";

export const AutoCompleteSection = () => {
  const [cityName, setCityName] = useState(""); ///******data from input FROM******** */
  const [cityNameTo, setCityNameTo] = useState(""); ///******data from input TO******** */
  const [optionsFrom, setOptionsFrom] = useState(); ///******matches between api and input FROM************* */
  const [optionsTo, setOptionsTo] = useState(); ///******matches between api and input TO************* */
  const [jsonFrom, setJsonFrom] = useState(null); ///*******matches data before step 2 (input FROM)********** */
  const [jsonTo, setJsonTo] = useState(null); ///*******matches data before step 2 (input TO)********** */
  const [myJson, setmyJson] = useState(null); ////////***data after step2***************** */ */
  const [searchMarker, setSearchMarker] = useState(null); //////******data for marker****** */
  const [map /* setMap */] = useState(null);

  const resultClick = ({ geometry, display_name }) => {
    ///**active after click on step 2**************** */ */
    findMyCities(geometry, setmyJson);
    setSearchMarker({
      coordinates: {
        lat: geometry[1],
        lng: geometry[0],
      },
      name: display_name,
    });
    if (map) {
      map.flyTo({
        lat: geometry[1],
        lng: geometry[0],
      });
    }
  };

  const findAutocomplete = async (cityName) => {
    ///****active after change input********* */
    const url = `https://photon.komoot.io/api/?q=${cityName}&osm_tag=place:city`;
    const response = await fetch(url);
    let data = (await response.json()).features;
    /* const coordinates = data.map(city=> city.geometry.coordinates);
    console.log(coordinates); */
    /* const res=coordinates.map(city=>ress.cities.map(item=> findShortestRange(city,item)));
    console.log(res); */
    return data;
  };

  const cityMatcher = async (text) => {
    ///****active after change input********* */
    let matches = [];
    if (text.length > 0) {
      const data = await findAutocomplete(text);
      matches = data.map((feature) => feature.properties.name);
      matches = matches.filter((a, b) => matches.indexOf(a) === b);
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

  const findCitiesFrom = async (cityName) => {
    ///********active on step 1******** */
    findCities(cityName).then((data) => {
      setJsonFrom(data.features);
    });
  };
  const findCitiesTo = async (cityName) => {
    ///********active on step 1******** */
    findCities(cityName).then((data) => {
      setJsonTo(data.features);
    });
  };

  return (
    <>
      <div className="autoCompleteSection">
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
        <HiChevronDoubleRight color={"#ff5722"} size={"1.5rem"} />
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
          resultClick={resultClick}
          json={jsonTo}
          setJson={setJsonTo}
        />
      </div>
      <div className="myresults">
        {myJson &&
          myJson.map((city) => (
            <SearchResult
              key={city.properties.display_name}
              city={city}
              resultClick={resultClick}
            />
          ))}
      </div>
    </>
  );
};
