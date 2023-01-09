import { useState } from "react";
import AutoComplete from "./AutoComplete";
import data from "../data.json";
import "./AutoComplete.css";
import { HiChevronDoubleRight } from "react-icons/hi";

export const AutoCompleteSection = () => {
  const [cityName, setCityName] = useState("");
  const [cityNameTo, setCityNameTo] = useState("");
  const [optionsFrom, setOptionsFrom] = useState();
  const [optionsTo, setOptionsTo] = useState();
  const [jsonFrom, setJsonFrom] = useState(null);
  const [jsonTo, setJsonTo] = useState(null);
  const [ myJson, setmyJson] = useState(null);
  const [, /* searchMarker */ setSearchMarker] = useState(null);
  const [map /* setMap */] = useState(null);

  const findMyCities = (geometry) => {
    let lat1 = geometry[1];
    let lon1 = geometry[0];
    let distance = 20000;
    let rescity = {};
    let lat2, lon2, a, d;
    let p = 0.017453292519943295;
    let c = Math.cos;
    data.cities.forEach((e) => {
      lat2 = e.lat;
      lon2 = e.lon;
      a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
      d = 12742 * Math.asin(Math.sqrt(a));
      if (d <= distance) {
        distance = d;
        rescity = {
          geometry: { coordinates: [lon2, lat2] },
          properties: { display_name: e.city },
        };
      }
    });
    let midata = [rescity];
    setmyJson(midata);
    
  };

  const resultClick = ({ geometry, display_name }) => {
    findMyCities(geometry);
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
    const url = `https://photon.komoot.io/api/?q=${cityName}&osm_tag=place:city`;
    const response = await fetch(url);
    let data = (await response.json()).features;
    const coordinates = data.map(city=> city.geometry.coordinates);
    console.log(coordinates);
    return data;
  };

  const cityMatcher = async (text) => {
    let matches = [];
    if (text.length > 0) {
      const data = await findAutocomplete(text);
      matches = data.map((feature) => feature.properties.name);
      matches = matches.filter((a, b) => matches.indexOf(a) === b);
    }
    console.log(matches);
    return matches;
  };

  const onChangeHandlerFrom = async (text) => {
    setCityName(text);
    setOptionsFrom(await cityMatcher(text));
  };

  const onChangeHandlerTo = async (text) => {
    setCityNameTo(text);
    setOptionsTo(await cityMatcher(text));
  };

  const findCities = async (cityName) => {
    const url = `https://nominatim.openstreetmap.org/search?city=${cityName}&format=geojson`;
    return fetch(url).then((response) => response.json());
  };

  const findCitiesFrom = async (cityName) => {
    findCities(cityName).then((data) => {
      setJsonFrom(data.features);
    });
  };
  const findCitiesTo = async (cityName) => {
    findCities(cityName).then((data) => {
      setJsonTo(data.features);
    });
  };

  return (
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
  );
};
