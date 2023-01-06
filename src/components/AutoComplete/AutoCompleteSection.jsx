import { useState } from "react";
import AutoComplete from "./AutoComplete";
import data from "./data.json";
import './AutoComplete.css';
import { HiChevronDoubleRight } from "react-icons/hi";
import { IconContext } from "react-icons";

export const AutoCompleteSection = () => {
  const [cityName, setCityName] = useState("");
  const [options, setOptions] = useState();
  const [json, setJson] = useState(null);
  const [myJson, setmyJson] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);
  const [map, setMap] = useState(null);

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

    // const url = `https://nominatim.openstreetmap.org/search?city=${cityName}&format=geojson`;
    // const response = await fetch(url);
    // let data = (await response.json()).features;
    return data;
  };

  const onChangeHandler = async (text) => {
    setCityName(text);
    let matches = [];
    if (text.length > 0) {
      const data = await findAutocomplete(text);
      matches = data.map((feature) => feature.properties.name);

      matches = matches.filter((a, b) => matches.indexOf(a) === b);
    }

    setOptions(matches);
  };

  const findCities = async (cityName) => {
    const url = `https://nominatim.openstreetmap.org/search?city=${cityName}&format=geojson`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setJson(data.features);
      });
  };
  ///******End of Anna`s code */

  return (
    <div className="autoCompleteSection">
      <AutoComplete
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
        placeholder="From"
        value={cityName}
        setValue={setCityName}
        options={options}
        setOptions={setOptions}
        findCities={findCities}
        resultClick={resultClick}
        json={json}
        setJson={setJson}
      />
      <HiChevronDoubleRight  color={'#ff5722'} size={'1.5rem'} />
      <AutoComplete
         /* onChange={(e) => {
          onChangeHandler(e.target.value);
        }} */
        placeholder="To"
        /*value={cityName}
        setValue={setCityName}
        options={options}*/
        /* setOptions={setOptions} */
        /* findCities={findCities} */
        /* resultClick={resultClick} */
        /* json={json} 
        setJson={setJson} */
      />
    </div>
  );
};
