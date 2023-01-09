import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMapEvent,
} from "react-leaflet";
import { useState } from "react";
import data from "../data.json";
import * as Actions from "../../redux/reducers/AppStateReducer/ActionCreators";
import { connect } from "react-redux";

function CityArea({ name, loading, setLoading }) {
  console.log(name);
  let city = data.cities.find((c) => c.city === name);
  const [json, setJson] = useState(null);
  let url = `https://nominatim.openstreetmap.org/reverse?lat=${city.lat}&lon=${city.lon}&zoom=10&polygon_geojson=1&format=geojson`;
  // setLoading(true);
  fetch(url)
    .then((response) => {
      console.log("response recieved");
      return response.json();
    })
    .then((data) => {
      setJson(data);
     // setLoading(false);
    })
    .catch((error) => {
      console.log(error.message);
    });

  return <GeoJSON data={json} />;
}

const mapStateToProps = (state) => {
  return {
    loading: state.appState.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (state) => dispatch(Actions.setLoading(state)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CityArea);
